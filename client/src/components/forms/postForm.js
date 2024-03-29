/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import dayjs from "dayjs";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { postValidate } from "../../utils/validation";
import { ADD_POST, EDIT_POST, QUERY_ME, QUERY_ALL_POSTS, QUERY_ONE_POST, QUERY_ONE_SECT_POST } from "../../utils/gql";
import Auth from "../../utils/auth";
import { ErrorModal, SuccessModal } from "../modals";
import EditorContainer from "../richTextEditor";
import "./style.css";


const PostForm = () => {

  //=====================//
  //   Global Variables  //
  //=====================//

  // Params
  const params = useParams();

  // State variables
  const [pageReady, setPageReady] = useState(false);
  const [postId, setPostId] = useState(params.postId);
  const [errors, setErrors] = useState({});
  const [thisSection, setThisSection] = useState();
  const [postData, setPostData] = useState({
    postType: "section leader",
    postSection: "",
    postExpire: "",
    postTitle: "",
    postBody: ""
  });
  const currentPostData = useRef(postData);

  // States passed to modals
  const [errThrown, setErrThrown] = useState();
  const [btnName, setBtnName] = useState();

  // Modal states
  const [showErr, setShowErr] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);


  //=====================//
  //    URL Variables    //
  //=====================//

  // Determines which page user is on, specifically for use with modals
  const urlArray = window.location.href.split("/");
  const urlId = urlArray.at(-2);
  const urlType = urlArray.at(-3);


  //=====================//
  //       Queries       //
  //=====================//

  const { loading: meLoading, data: meData, error: meError } = useQuery(QUERY_ME);

  const { loading: noteLoading, data: noteData, error: noteError } = useQuery(QUERY_ONE_POST,
    {
      variables: { id: postId }
    });

  const me = meData?.me || meData?.currentId || {};
  const postToEdit = useMemo(() => { return noteData?.onePost || {} }, [noteData?.onePost]);


  //=====================//
  //      Mutations      //
  //=====================//

  const [addPost, { addPostError, addPostData }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      try {
        // Retrieve existing post data that is stored in the cache
        const allData = cache.readQuery({ query: QUERY_ALL_POSTS });
        const currentPosts = allData.allPosts;
        // Update the cache by combining existing post data with the newly created data returned from the mutation
        cache.writeQuery({
          query: QUERY_ALL_POSTS,
          // If we want new data to show up before or after existing data, adjust the order of this array
          data: { allPosts: [...currentPosts, addPost] },
        });
        // Retrieve existing post data that is stored in the cache
        const oneData = cache.readQuery({ query: QUERY_ONE_SECT_POST });
        const currentPost = oneData.oneSectPost;
        // Update the cache by combining existing post data with the newly created data returned from the mutation
        cache.writeQuery({
          query: QUERY_ONE_SECT_POST,
          // If we want new data to show up before or after existing data, adjust the order of this array
          data: { oneSectPost: addPost },
        });
      } catch (err) {
        console.error(err);
      }
    }
  });

  const [editPost, { editPostError, editPostData }] = useMutation(EDIT_POST);


  //=====================//
  //       Methods       //
  //=====================//

  // Sets boolean to show or hide relevant modal
  const handleToggleSuccess = () => setShowSuccess(showSuccess => !showSuccess);
  const handleToggleErr = () => setShowErr(showErr => !showErr);

  // Handles input changes to form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData(prev => {
      currentPostData.current = { ...prev, [name]: value };
      return { ...prev, [name]: value };
    });
  };

  // Handles input changes to editor
  const handleEditorChange = (name, value) => {
    setPostData(prev => {
      currentPostData.current = { ...prev, [name]: value };
      return { ...prev, [name]: value };
    });
  };

  // Handles click on "Submit" button
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Validates required inputs
    const validationErrors = postValidate(postData);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);
    if (noErrors) {
      try {
        const { data } = await addPost({
          variables: { ...postData, postSection: thisSection, postBody: draftToHtml(convertToRaw(postData.postBody.getCurrentContent())).replaceAll('<p></p>', '<hr />') }
        });
        handleToggleSuccess();
      } catch (error) {
        console.error(JSON.stringify(error));
        setErrThrown(error.message);
        handleToggleErr();
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
        const { data } = await editPost({
          variables: { id: postId, ...postData, postBody: draftToHtml(convertToRaw(postData.postBody.getCurrentContent())).replaceAll('<p></p>', '<hr />') }
        });
        handleToggleSuccess();
      } catch (error) {
        console.error(JSON.stringify(error));
        setErrThrown(error.message);
        handleToggleErr();
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


  //=====================//
  //   Run on page load  //
  //=====================//

  useEffect(() => {
    if (Object.keys(params).length > 0 && Object.keys(postToEdit).length > 0) {
      const convertedPostToEdit = { ...postToEdit, postBody: postToEdit.postBody.replaceAll('<hr />', '<p></p>') }
      postToEdit?.postExpire ? setPostData({ ...convertedPostToEdit, postExpire: dayjs(JSON.parse(convertedPostToEdit.postExpire)).add(1, "day").format("YYYY-MM-DD") }) : setPostData(convertedPostToEdit);
      setPageReady(true);
    }
    if (["Soprano I", "Soprano II"].includes(me.section)) {
      setThisSection("soprano")
    } else if (["Alto I", "Alto II"].includes(me.section)) {
      setThisSection("alto")
    } else if (["Tenor I", "Tenor II"].includes(me.section)) {
      setThisSection("tenor")
    } else if (["Bass I", "Bass II"].includes(me.section)) {
      setThisSection("bass")
    } else {
      setThisSection(me.section)
    }

    if (!Object.keys(params).length) {
      setPageReady(true);
    }
  }, [postToEdit, me.section, params]);


  //=====================//
  //    Conditionals     //
  //=====================//

  if (meLoading || noteLoading) {
    return <h1>Loading....</h1>
  };

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />
  };

  if (!["administrator", "assistant music director", "music director", "webdev", "section leader"].includes(me.position)) {
    return <Navigate to="/members" />
  };


  return (
    <>
      {pageReady === true &&
        <Container>
          <Row>
            <Col sm={12} className="formHeader">
              {Object.keys(params).length > 0
                ? <h1>Edit this post</h1>
                : <h1>Create new post</h1>}
            </Col>
          </Row>

          <Form className="postForm">

            <Form.Group controlId="formPostType">
              <Row>
                <Col sm={{ span: 4, offset: 2 }}>
                  <Form.Label>Select type of post: <span className="red">*</span></Form.Label>
                  {errors.postType &&
                    <div className="error"><p>{errors.postType}</p></div>}
                  <Form.Select name="postType" value={postData.postType} className="formSelect" aria-label="Type of post" disabled={me.position === "section leader"} onChange={handleInputChange}>
                    <option>Select</option>
                    <option value="emergency">Emergency Announcement</option>
                    <option value="singers note">Singer's Notes</option>
                    <option value="director">Director's Corner</option>
                    <option value="section leader">Section Leader Announcement</option>
                    <option value="travel">Travel Committee Announcement</option>
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
                  <Form.Label>Post title: (optional)</Form.Label>
                  <Form.Control type="input" name="postTitle" placeholder="Title of your post" value={postData.postTitle} className="formInput" onChange={handleInputChange} />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="formPostBody">
              <Row>
                <Col sm={{ span: 8, offset: 2 }}>
                  <Form.Label>Post body: <span className="red">*</span></Form.Label>
                  {errors.postBody &&
                    <div className="error"><p>{errors.postBody}</p></div>}
                  <EditorContainer value={postData.postBody} name="postBody" onChange={handleEditorChange} />
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
            hide={() => handleToggleSuccess()}
          />

          <ErrorModal
            user={me}
            urlid={urlId}
            urltype={urlType}
            errmsg={errThrown}
            btnname={btnName}
            show={showErr === true}
            hide={() => handleToggleErr()}
          />

        </Container>
      }
    </>
  )
}

export default PostForm;