/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import dayjs from "dayjs";
import { useMutation, useQuery } from "@apollo/client";
import { EDIT_PASSWORD, EDIT_USER_SELF, QUERY_ME_PROFILE } from "../utils/gql";
import { userValidate } from "../utils/validation";
import Auth from "../utils/auth";
import { ChangePasswordModal, ErrorModal, SuccessModal } from "../components/modals";
import { Sidenav } from "../components/navbar";
import "./style.css";

const ProfilePage = () => {

  //=====================//
  //   Global Variables  //
  //=====================//

  // Auth
  const currentUserId = Auth.getProfile().data?._id;

  // State variables
  const [editMode, setEditMode] = useState(false);
  const [errThrown, setErrThrown] = useState();
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({
    fullName: "",
    firstName: "",
    lastName: "",
    preferredName: "",
    birthday: "",
    email1: "",
    email2: "",
    phone1: "",
    phone1Type: "",
    phone2: "",
    phone2Type: "",
    phone3: "",
    phone3Type: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: ""
  });

  // Modal states
  const [showErr, setShowErr] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPword, setShowPword] = useState(false);


  //=====================//
  //    URL Variables    //
  //=====================//

  // Determines which page user is on, specifically for use with modals & sidenav
  const urlArray = window.location.href.split("/")
  const urlId = urlArray[urlArray.length - 1]
  const urlType = urlArray[urlArray.length - 2]


  //=====================//
  //       Queries       //
  //=====================//

  const { loading: meLoading, data: meData, error: meError } = useQuery(QUERY_ME_PROFILE,
    {
      variables: { id: currentUserId }
    });

  const me = useMemo(() => { return meData?.meProfile || {} }, [meData?.meProfile]);


  //=====================//
  //      Mutations      //
  //=====================//

  const [editUserSelf, { editUserError, editUserData }] = useMutation(EDIT_USER_SELF);
  const [editPassword, { editPasswordError, editPasswordData }] = useMutation(EDIT_PASSWORD);


  //=====================//
  //       Methods       //
  //=====================//

  // Sets boolean to show or hide relevant modal
  const handleShowSuccess = () => setShowSuccess(true);
  const handleHideSuccess = () => setShowSuccess(false);
  const handleShowErr = () => setShowErr(true);
  const handleHideErr = () => setShowErr(false);
  const handleShowPword = () => setShowPword(true);
  const handleHidePword = () => setShowPword(false);

  // Formats the provided date object
  const formatDate = (date) => {
    return dayjs(date, "MM-DD").format("MMMM D")
  };

  // Gets first & last name from full name
  const splitName = (memberName) => {
    const nameArr = memberName.split(" ");
    const fName = nameArr[0];
    let lName;
    if (["Sr", "Snr", "Sr.", "Snr.", "Senior", "Jr", "Jnr", "Jr.", "Jnr.", "Junior", "II", "III", "IV", "V", "VI"].includes(nameArr.at(-1))) {
      lName = nameArr.at(-2)
    } else {
      lName = nameArr.at(-1)
    }
    setUserData({ ...userData, firstName: fName, lastName: lName });
  };

  // Toggles edit mode on click
  const handleClick = (e) => {
    setEditMode(true);
  }

  // Handles input changes to form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handles password update from password modal
  const handlePasswordUpdate = async (e) => {
    handleHidePword();
    e.preventDefault();
    try {
      const { data } = await editPassword({
        variables: { id: userData._id, ...userData }
      });
      if (data.editPassword) {
        handleShowSuccess();
      } else {
        setErrThrown("Incorrect data sent");
        handleShowErr();
      }
      setUserData({ ...userData, password: "", newPassword: "", oldPassword: "" });
    } catch (error) {
      console.error(JSON.stringify(error));
      setErrThrown(error.message);
      handleShowErr();
      setUserData({ ...userData, password: "", newPassword: "", oldPassword: "" });
    }
  }

  // Handles click on "Update" button
  const handleFormUpdate = async (e) => {
    e.preventDefault();
    // Validates required inputs
    const validationErrors = userValidate(userData);
    console.error({ validationErrors });
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);
    if (noErrors) {
      try {
        const { data } = await editUserSelf({
          variables: { id: userData._id, ...userData }
        });
        handleShowSuccess();
      } catch (error) {
        console.error(JSON.stringify(error));
        setErrThrown(error.message);
        handleShowErr();
      }
      setEditMode(false);
    } else {
      console.error({ validationErrors });
    }
  };


  //=====================//
  //   Run on page load  //
  //=====================//

  useEffect(() => {
    setUserData(me)
  }, [me]);


  //=====================//
  //    Conditionals     //
  //=====================//

  if (meLoading) {
    return <h1>Loading....</h1>
  };

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />
  };

  if (me.position === "guest") {
    return <Navigate to="/members" />
  }


  return (
    <>
      <Container fluid>
        <Row>
          <Col sm={2}>
            <Sidenav user={me} urlId={urlId} />
          </Col>
          <Col sm={8}>
            <Card className="profileCard">
              <Card.Header className="cardTitle">
                <h1>My Profile</h1>
              </Card.Header>
              <Card.Body className="cardBody">
                {editMode === false
                  ? <>
                    <div className="between">
                      <p className="editMode" onClick={handleClick}>Edit my info</p><p className="editMode" onClick={handleShowPword}>Change my password</p>
                    </div>
                    <p>Full name: {me.fullName}</p>
                    <p>Prefer to be called: {me.preferredName}</p>
                    <p>Section: {me.section}</p>
                    <p>Birthday: {formatDate(me.birthday)}</p>
                    <p>Primary email: {me.email1}</p>
                    {me.email2 &&
                      <p>Secondary email: {me.email2}</p>}
                    <p>Primary phone: {me.phone1} ({me.phone1Type})</p>
                    {me.phone2 &&
                      <p>Secondary phone: {me.phone2} ({me.phone2Type})</p>}
                    {me.phone3 &&
                      <p>Tertiary phone: {me.phone3} ({me.phone3Type})</p>}
                    <p>Street address: {me.streetAddress}</p>
                    <p>City: {me.city}</p>
                    <p>State: {me.state}</p>
                    <p>ZIP Code: {me.zipCode}</p>
                  </>
                  : <>
                    <Form className="profileForm">

                      <Form.Group controlId="formProfileName">
                        <Row>
                          <Col sm={6}>
                            <Form.Label>Full name:</Form.Label>
                            <Form.Control type="input" name="fullName" placeholder="Martha Jones" value={userData.fullName} className="formInput" onChange={handleInputChange} onBlur={() => splitName(userData.fullName)} />
                          </Col>

                          <Col sm={6}>
                            <Form.Label>Prefer to be called:</Form.Label>
                            <Form.Control type="input" name="preferredName" placeholder="Martha" value={userData.preferredName} className="formInput" onChange={handleInputChange} />
                          </Col>
                        </Row>
                      </Form.Group>

                      <Form.Group controlId="formProfileBday">
                        <Row>
                          <Col sm={4}>
                            <Form.Label>Birthday month-day:</Form.Label><br />
                            <Form.Text className="subtitle" muted>Please use the format MM-DD</Form.Text>
                            <Form.Control type="input" name="birthday" placeholder="10-13" value={userData.birthday} className="formInput" onChange={handleInputChange} />
                          </Col>
                        </Row>
                      </Form.Group>

                      <Form.Group controlId="formProfileEmail">
                        <Row>
                          <Col sm={6}>
                            <Form.Label>Primary email:</Form.Label>
                            <Form.Control type="input" name="email1" placeholder="martha.jones@email.com" value={userData.email1} className="formInput" onChange={handleInputChange} />
                          </Col>

                          <Col sm={6}>
                            <Form.Label>Secondary email:</Form.Label>
                            <Form.Control type="input" name="email2" placeholder="martha@tardis.com" value={userData.email2} className="formInput" onChange={handleInputChange} />
                          </Col>
                        </Row>
                      </Form.Group>

                      <Form.Group controlId="formProfilePhone">
                        <Row>
                          <Col sm={4}>
                            <Form.Label>Primary phone:</Form.Label>
                            <Form.Control type="input" name="phone1" placeholder="555-555-5555" value={userData.phone1} className="formInput" onChange={handleInputChange} />
                          </Col>

                          <Col sm={2}>
                            <Form.Label>Type:</Form.Label>
                            <Form.Select name="phone1Type" value={userData.phone1Type} className="formSelect" aria-label="Primary phone type" onChange={handleInputChange}>
                              <option>Select</option>
                              <option value="H">Home</option>
                              <option value="M">Mobile</option>
                              <option value="W">Work</option>
                            </Form.Select>
                          </Col>
                        </Row>

                        <Row>
                          <Col sm={4}>
                            <Form.Label>Secondary phone:</Form.Label>
                            <Form.Control type="input" name="phone2" placeholder="555-555-5555" value={userData.phone2} className="formInput" onChange={handleInputChange} />
                          </Col>

                          <Col sm={2}>
                            <Form.Label>Type:</Form.Label>
                            <Form.Select name="phone2Type" value={userData.phone2Type} className="formSelect" aria-label="Secondary phone type" onChange={handleInputChange}>
                              <option>Select</option>
                              <option value="H">Home</option>
                              <option value="M">Mobile</option>
                              <option value="W">Work</option>
                            </Form.Select>
                          </Col>
                        </Row>

                        <Row>
                          <Col sm={4}>
                            <Form.Label>Tertiary phone:</Form.Label>
                            <Form.Control type="input" name="phone3" placeholder="555-555-5555" value={userData.phone3} className="formInput" onChange={handleInputChange} />
                          </Col>

                          <Col sm={2}>
                            <Form.Label>Type:</Form.Label>
                            <Form.Select name="phone3Type" value={userData.phone3Type} className="formSelect" aria-label="Tertiary phone type" onChange={handleInputChange}>
                              <option>Select</option>
                              <option value="H">Home</option>
                              <option value="M">Mobile</option>
                              <option value="W">Work</option>
                            </Form.Select>
                          </Col>
                        </Row>
                      </Form.Group>

                      <Form.Group controlId="formProfileAddress">
                        <Row>
                          <Col sm={8}>
                            <Form.Label>Street Address:</Form.Label>
                            <Form.Control type="input" name="streetAddress" placeholder="123 Main St." value={userData.streetAddress} className="formInput" onChange={handleInputChange} />
                          </Col>

                          <Col sm={4}>
                            <Form.Label>City:</Form.Label>
                            <Form.Control type="input" name="city" placeholder="Greeley" value={userData.city} className="formInput" onChange={handleInputChange} />
                          </Col>
                        </Row>

                        <Row>
                          <Col sm={2}>
                            <Form.Label>State:</Form.Label>
                            <Form.Control type="input" name="state" placeholder="CO" value={userData.state} className="formInput" onChange={handleInputChange} />
                          </Col>

                          <Col sm={3}>
                            <Form.Label>ZIP Code:</Form.Label>
                            <Form.Control type="input" name="zipCode" placeholder="80634" value={userData.zipCode} className="formInput" onChange={handleInputChange} />
                          </Col>
                        </Row>
                      </Form.Group>

                      <Row>
                        <Col sm={3}>
                          <Button data-toggle="popover" title="Update" disabled={!(userData.fullName && userData.birthday && userData.phone1 && userData.phone1Type && userData.section && userData.streetAddress && userData.city && userData.state && userData.zipCode)} className="button formBtn" onClick={handleFormUpdate} type="submit">Update My Info</Button>
                        </Col>
                      </Row>

                    </Form>
                  </>}

              </Card.Body>
            </Card>
          </Col>
        </Row>

        <ChangePasswordModal
          user={me}
          userData={userData}
          setUserData={setUserData}
          urlid={urlId}
          urltype={urlType}
          params={[]}
          show={showPword === true}
          hide={() => handleHidePword()}
          update={(e) => handlePasswordUpdate(e)}
        />

        <SuccessModal
          user={me}
          urlid={urlId}
          urltype={urlType}
          params={[]}
          show={showSuccess === true}
          hide={() => handleHideSuccess()}
        />

        <ErrorModal
          user={me}
          urlid={urlId}
          urltype={urlType}
          errmsg={errThrown}
          show={showErr === true}
          hide={() => handleHideErr()}
        />

      </Container>
    </>
  )
}

export default ProfilePage;