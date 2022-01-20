import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
// import { userValidate } from "../../utils/validation";
import { ADD_POST, EDIT_POST, QUERY_ME, QUERY_ONE_POST } from "../../utils/gql";
import "./style.css";

const PostForm = () => {
  const [postData, setPostData] = useState({
    postType: "",
    postExpire: "",
    postTitle: "",
    postBody: ""
  });
  const [errors, setErrors] = useState({});

  // Handles input changes to form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  // Handles click on "Submit" button
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log({ postData })
    // Validates required inputs
    // const validationErrors = postValidate(postData);
    // const noErrors = Object.keys(validationErrors).length === 0;
    // setErrors(validationErrors);
    // if (noErrors) {
    console.log("Post submit", postData)
    // POST call to create concert document
    // ExhibitorAPI.registerExhibitor({ ...exhibitor })
    //   .then(resp => {
    //     // If no errors thrown, show Success modal
    //     if (!resp.err) {
    //       handleShowSuccess();
    //     }
    //   })
    // If yes errors thrown, setState(err.message) and show Error modal
    // .catch(err => {
    //   console.log(err)
    //   setErrThrown(err.message);
    //   handleShowErr();
    // })
    // } else {
    //   console.log({ validationErrors });
    // }
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
                <Form.Select name="postType" value={postData.postType} className="formSelect" aria-label="Type of post" onChange={handleInputChange}>
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
                <Form.Control type="input" name="postTitle" placeHolder="Title of your post" value={postData.postTitle} className="formInput" onChange={handleInputChange} />
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
        </Form>
      </Container>
    </>
  )
}

export default PostForm;