import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { postValidate } from "../../utils/validation";
import { ADD_POST, EDIT_POST, QUERY_ME, QUERY_ALL_POSTS, QUERY_ONE_POST } from "../../utils/gql";
import Auth from "../../utils/auth";
import { ErrorModal, SuccessModal } from "../modals";
import "./style.css";

const PostForm = () => {
  const params = useParams();

  const [errors, setErrors] = useState({});
  const [errThrown, setErrThrown] = useState();
  const [btnName, setBtnName] = useState();

  // Determines which page user is on, specifically for use with modals
  const urlArray = window.location.href.split("/")
  const urlId = urlArray[urlArray.length - 2]
  const urlType = urlArray[urlArray.length - 3]

  // Modal variables
  const [showErr, setShowErr] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Sets boolean to show or hide relevant modal
  const handleShowSuccess = () => setShowSuccess(true);
  const handleHideSuccess = () => setShowSuccess(false);
  const handleShowErr = () => setShowErr(true);
  const handleHideErr = () => setShowErr(false);

  const { loading: meLoading, data: meData, error: meError } = useQuery(QUERY_ME);
  const { loading: noteLoading, data: noteData, error: noteError } = useQuery(QUERY_ONE_POST,
    {
      variables: { id: params.postId }
    });

  const [addPost, { addPostError, addPostData }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      try {
        // Retrieve existing post data that is stored in the cache
        const data = cache.readQuery({ query: QUERY_ALL_POSTS });
        const currentPosts = data.allPosts;
        // Update the cache by combining existing post data with the newly created data returned from the mutation
        cache.writeQuery({
          query: QUERY_ALL_POSTS,
          // If we want new data to show up before or after existing data, adjust the order of this array
          data: { allPosts: [...currentPosts, addPost] },
        });
      } catch (err) {
        console.error(err);
      }
    }
  });

  const [editRepertoire, { editRepertoireError, editRepertoireData }] = useMutation(EDIT_POST);

  const me = meData?.me || meData?.currentId || {};
  const post = noteData?.onePost || {};

  const [postData, setPostData] = useState({
    postType: "section leader",
    postSection: me.section,
    postExpire: "",
    postTitle: "",
    postBody: ""
  });

  // Handles input changes to form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  // Handles click on "Submit" button
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log({ postData });
    // Validates required inputs
    const validationErrors = postValidate(postData);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);
    if (noErrors) {
      console.log("Post submit", postData);
      try {
        const { data } = await addPost({
          variables: { ...postData }
        });
        console.log({ data });
        handleShowSuccess();
      } catch (error) {
        console.error(JSON.stringify(error));
        setErrThrown(error.message);
        handleShowErr();
      }
      setPostData({
        postType: "",
        postSection: "",
        postExpire: "",
        postTitle: "",
        postBody: ""
      });
    } else {
      console.error({ validationErrors });
    }
  };

  // Handles click on "Update" button
  const handleFormUpdate = async (e) => {
    e.preventDefault();
    // Validates required inputs
    const validationErrors = postValidate(postData);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);
    if (noErrors) {
      try {
        const { data } = await editRepertoire({
          variables: { id: params.postId, ...postData }
        });
        console.log({ data });
        handleShowSuccess();
      } catch (error) {
        console.error(JSON.stringify(error));
        setErrThrown(error.message);
        handleShowErr();
      }
      setPostData({
        postType: "",
        postSection: "",
        postExpire: "",
        postTitle: "",
        postBody: ""
      });
    } else {
      console.error({ validationErrors });
    }
  };

  useEffect(() => {
    if (params) {
      setPostData(post);
    }
  }, [post]);

  if (meLoading || noteLoading) {
    return <h1>Loading....</h1>
  };

  if (meError || noteError) {
    console.error(JSON.stringify(meError, noteError))
  };

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />
  };

  if (!["administrator", "assistant music director", "music director", "webdev", "section leader"].includes(me.position)) {
    return <Navigate to="/members" />
  };

  return (
    <>
      <Container>
        <Row>
          <Col sm={12} className="formHeader">
            <h1>Create new post</h1>
          </Col>
        </Row>

        <Form className="postForm">

          <Form.Group controlId="formPostType">
            <Row>
              <Col sm={{ span: 4, offset: 2 }}>
                <Form.Label>Select type of post: <span className="red">*</span></Form.Label>
                <Form.Select name="postType" value={postData.postType} className="formSelect" aria-label="Type of post" disabled={me.position === "section leader"} onChange={handleInputChange}>
                  <option>Select</option>
                  <option value="emergency">Emergency Announcement</option>
                  <option value="singers note">Singer's Notes</option>
                  <option value="director">Director's Corner</option>
                  <option value="section leader">Section Leader Announcement</option>
                  <option value="general">General Announcement</option>
                </Form.Select>
              </Col>

              {postData.postType === "emergency" &&
                <Col sm={4}>
                  <Form.Label>Post expires: <span className="red">*</span></Form.Label>
                  <Form.Control type="date" name="postExpire" placeholder="04-05-2063" value={postData.postExpire} className="formDate" onChange={handleInputChange} />
                </Col>}
            </Row>
          </Form.Group>

          <Form.Group controlId="formPostTitle">
            <Row>
              <Col sm={{ span: 8, offset: 2 }}>
                <Form.Label>Post title:</Form.Label>
                <Form.Control type="input" name="postTitle" placeholder="Title of your post" value={postData.postTitle} className="formInput" onChange={handleInputChange} />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="formPostBody">
            <Row>
              <Col sm={{ span: 8, offset: 2 }}>
                <Form.Label>Post body: <span className="red">*</span></Form.Label>
                <Form.Control required as="textarea" rows={10} type="input" name="postBody" placeholder="Enter post here" value={postData.postBody} className="formText" onChange={handleInputChange} />
              </Col>
            </Row>
          </Form.Group>

          <Row>
            <Col sm={{ span: 3, offset: 2 }}>
              {!Object.keys(params).length
                ? <Button data-toggle="popover" title="Submit" disabled={!(postData.postType && postData.postBody)} className="button formBtn" onClick={handleFormSubmit} type="submit">Submit</Button>
                : <Button data-toggle="popover" title="Update" disabled={!(postData.postType && postData.postBody)} className="button formBtn" onClick={handleFormUpdate} type="submit">Update</Button>
              }
            </Col>
          </Row>

        </Form>

        <SuccessModal
          user={me}
          urlid={urlId}
          urltype={urlType}
          btnname={btnName}
          params={[]}
          show={showSuccess === true}
          hide={() => handleHideSuccess()}
        />

        <ErrorModal
          user={me}
          urlid={urlId}
          urltype={urlType}
          errmsg={errThrown}
          btnname={btnName}
          show={showErr === true}
          hide={() => handleHideErr()}
        />

      </Container>
    </>
  )
}

export default PostForm;