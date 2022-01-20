import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
// import { userValidate } from "../../utils/validation";
import { EDIT_USER_SELF, QUERY_ONE_USER } from "../../utils/gql";
import "./style.css";

const PostForm = () => {
  const [postData, setPostData] = useState({
    fullName: "",
    preferredName: "",
    phone: "",
    password: ""
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

        </Form>
      </Container>
    </>
  )
}

export default PostForm;