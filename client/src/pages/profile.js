import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import dayjs from "dayjs";
import { useMutation, useQuery } from "@apollo/client";
import { EDIT_USER_SELF, QUERY_ME_PROFILE } from "../utils/gql";
import { userValidate } from "../utils/validation";
import Auth from "../utils/auth";
import { ErrorModal, SuccessModal } from "../components/modals";
import { Sidenav } from "../components/navbar";
import "./style.css";

const ProfilePage = () => {
  const currentUserId = Auth.getProfile().data?._id;
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

  const { loading: meLoading, data: meData, error: meError } = useQuery(QUERY_ME_PROFILE,
    {
      variables: { id: currentUserId }
    });

  const me = meData?.meProfile || {};

  const [editUserSelf, { editUserError, editUserData }] = useMutation(EDIT_USER_SELF);
  // , {
  //   update(cache, { data: { editUserSelf } }) {
  //     console.log({ editUserSelf });
  //     try {
  //       // Retrieve existing user data that is stored in the cache
  //       const data = cache.readQuery({ query: QUERY_ALL_USERS, variables: { id: userId } });
  //       const currentUsers = data.allUsers;
  //       console.log({ currentUsers });
  //       // Update the cache by combining existing user data with the newly created data returned from the mutation
  //       cache.writeQuery({
  //         query: QUERY_ALL_USERS,
  //         // variables: { id: userId },
  //         // If we want new data to show up before or after existing data, adjust the order of this array
  //         data: { allUsers: [...currentUsers, editUserSelf] }
  //       });
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  // });

  // Determines which page user is on, specifically for use with modals
  const urlArray = window.location.href.split("/")
  const urlId = urlArray[urlArray.length - 1]
  const urlType = urlArray[urlArray.length - 2]

  // Modal variables
  const [showErr, setShowErr] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Sets boolean to show or hide relevant modal
  const handleShowSuccess = () => setShowSuccess(true);
  const handleHideSuccess = () => setShowSuccess(false);
  const handleShowErr = () => setShowErr(true);
  const handleHideErr = () => setShowErr(false);

  const formatDate = (date) => {
    return dayjs(date, "MM-DD").format("MMMM D")
  };

  // Gets first & last name from full name
  const splitName = (memberName) => {
    const nameArr = memberName.split(" ");
    const fName = nameArr[0];
    let lName;
    if (["Sr", "Snr", "Sr.", "Snr.", "Senior", "Jr", "Jnr", "Jr.", "Jnr.", "Junior", "II", "III", "IV", "V", "VI"].includes(nameArr[nameArr.length - 1])) {
      lName = nameArr[nameArr.length - 2]
    } else {
      lName = nameArr[nameArr.length - 1]
    }
    setUserData({ ...userData, firstName: fName, lastName: lName });
  };

  const handleClick = (e) => {
    setEditMode(true);
  }

  // Handles input changes to form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handles click on "Update" button
  const handleFormUpdate = async (e) => {
    e.preventDefault();
    // Validates required inputs
    const validationErrors = userValidate(userData);
    console.log({ validationErrors });
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);
    if (noErrors) {
      try {
        const { data } = await editUserSelf({
          variables: { id: userData._id, ...userData }
        });
        handleShowSuccess();
      } catch (error) {
        console.log(JSON.stringify(error));
        setErrThrown(error.message);
        handleShowErr();
      }
      setEditMode(false);
    } else {
      console.log({ validationErrors });
    }
  };

  useEffect(() => {
    setUserData(me)
  }, []);

  if (meLoading) {
    return <h1>Loading....</h1>
  };

  if (meError) {
    console.log(JSON.stringify(meError));
  };

  if (!Auth.loggedIn()) {
    <Navigate to="/login" />
  };

  if (me.position === "guest") {
    <Navigate to="/members" />
  }


  return (
    <>
      <Container>
        <Row>
          <Col sm={2}>
            <Sidenav user={me} />
          </Col>
          <Col sm={8}>
            <Card className="profileCard">
              <Card.Header className="cardTitle">
                <h1>My Profile</h1>
              </Card.Header>
              <Card.Body className="cardBody">
                {editMode === false
                  ? <>
                    <p className="editMode" onClick={handleClick}>Edit my info</p>
                    <p>Full name: {me.fullName}</p>
                    <p>Prefer to be called: {me.preferredName}</p>
                    <p>Section: {me.section}</p>
                    <p>Birthday: {formatDate(me.birthday)}</p>
                    <p>Primary email: {me.email1}</p>
                    <p>Secondary email: {me.email2}</p>
                    <p>Primary phone: {me.phone1} ({me.phone1Type})</p>
                    <p>Secondary phone: {me.phone2} ({me.phone2Type})</p>
                    <p>Tertiary phone: {me.phone3} ({me.phone3Type})</p>
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
                            <Form.Select name="phone1Type" value={userData.phone2Type} className="formSelect" aria-label="Secondary phone type" onChange={handleInputChange}>
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