import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
// import { userValidate } from "../../utils/validation";
import { EDIT_USER_SELF, QUERY_ONE_USER } from "../../utils/gql";
import "./style.css";

const UserForm = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    preferredName: "",
    phone: "",
    password: ""
  });
  const [errors, setErrors] = useState({});

  // Handles input changes to form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handles click on "Submit" button
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log({ userData })
    // Validates required inputs
    // const validationErrors = userValidate(userData);
    // const noErrors = Object.keys(validationErrors).length === 0;
    // setErrors(validationErrors);
    // if (noErrors) {
      console.log("User submit", userData)
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
            <h1>Edit your information</h1>
          </Col>
        </Row>

        <Form className="userForm">

        </Form>
      </Container>
    </>
  )
}

export default UserForm;