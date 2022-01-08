import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/gql";
import { adminUserValidate } from "../../utils/validation";
import Auth from "../../utils/auth";
import "./style.css";

const AdminUserForm = () => {
  const params = useParams();
  console.log(params);

  const [userData, setUserData] = useState({
    fullName: "",
    firstName: "",
    lastName: "",
    preferredName: "",
    birthday: "",
    email1: "",
    email2: "",
    password: "",
    phone1: "",
    phone1Type: "",
    phone2: "",
    phone2Type: "",
    phone3: "",
    phone3Type: "",
    section: "",
    position: "singer",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    isAdmin: false,
    isActive: true
  });
  const [errors, setErrors] = useState({});
  const [addUser, { error, data }] = useMutation(ADD_USER);

  // Handles input changes to form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleCheckbox = (e) => {
    const { name, value } = e.target;
    JSON.parse(value) ? setUserData({ ...userData, [name]: false }) : setUserData({ ...userData, [name]: true });
  }

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
    setUserData({ ...userData, firstName: fName, lastName: lName, preferredName: fName });
  };

  // Handles click on "Submit" button
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log({ userData })
    // Validates required inputs
    const validationErrors = adminUserValidate(userData);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);
    if (noErrors) {
      console.log("User submit", userData)
      try {
        const { data } = await addUser({
          variables: { ...userData }
        });
        console.log({ data });
      } catch (err) {
        console.log(err);
      }
      setUserData({
        fullName: "",
        firstName: "",
        lastName: "",
        preferredName: "",
        birthday: "",
        email1: "",
        email2: "",
        password: "",
        phone1: "",
        phone1Type: "",
        phone2: "",
        phone2Type: "",
        phone3: "",
        phone3Type: "",
        section: "",
        position: "singer",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        isAdmin: false,
        isActive: true
      })
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
    } else {
      console.log({ validationErrors });
    }
  };

  return (
    <>
      {!Auth.loggedIn()
        ? <Navigate to="/login" />
        : <Container>
          <Row>
            <Col lg={12} className="formHeader">
              <h1>Add a new member</h1>
            </Col>
          </Row>

          <Form className="adminUserForm">

            <Form.Group controlId="formAdminUserFullName">
              <Row>
                <Col lg={{ span: 8, offset: 2 }} className="bottom">
                  <Form.Label>Member's full name: <span className="red">*</span></Form.Label>
                  {errors.fullName &&
                    <div className="error"><p>{errors.fullName}</p></div>}
                  <Form.Control type="input" name="fullName" placeholder="Donna Noble" value={userData.fullName} className="formInput" onChange={handleInputChange} onBlur={() => splitName(userData.fullName)} />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="formAdminUserFirstLast">
              <Row>
                <Col lg={{ span: 4, offset: 2 }} className="bottom">
                  <Form.Label>Member's first name: <span className="red">*</span></Form.Label>
                  {errors.firstName &&
                    <div className="error"><p>{errors.firstName}</p></div>}
                  <Form.Control type="input" name="firstName" placeholder={"Donna"} value={userData.firstName} className="formInput" onChange={handleInputChange} />
                </Col>
                <Col lg={4} className="bottom">
                  <Form.Label>Member's last name: <span className="red">*</span></Form.Label>
                  {errors.lastName &&
                    <div className="error"><p>{errors.lastName}</p></div>}
                  <Form.Control type="input" name="lastName" placeholder={"Noble"} value={userData.lastName} className="formInput" onChange={handleInputChange} />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="formAdminUserPrefBday">
              <Row>
                <Col lg={{ span: 4, offset: 2 }} className="bottom">
                  <Form.Label>Member prefers to be called: <span className="red">*</span></Form.Label>
                  {errors.preferredName &&
                    <div className="error"><p>{errors.preferredName}</p></div>}
                  <Form.Control type="input" name="preferredName" placeholder={"Donna"} value={userData.preferredName} className="formInput" onChange={handleInputChange} />
                </Col>
                <Col lg={4} className="bottom">
                  <Form.Label>Member's birthday: <span className="red">*</span></Form.Label>
                  {errors.birthday &&
                    <div className="error"><p>{errors.birthday}</p></div>}
                  <Form.Control type="input" name="birthday" placeholder={"10-13"} value={userData.birthday} className="subtitleInput" onChange={handleInputChange} />
                  <Form.Text className="subtitle" muted>Please use the format MM-DD</Form.Text>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="formAdminUserEmail">
              <Row>
                <Col lg={{ span: 4, offset: 2 }} className="bottom">
                  <Form.Label>Member's primary email: <span className="red">*</span></Form.Label>
                  {errors.email1 &&
                    <div className="error"><p>{errors.email1}</p></div>}
                  <Form.Control type="email" name="email1" placeholder={"donna.noble@email.com"} value={userData.email1} className="formEmail" onChange={handleInputChange} />
                </Col>
                <Col lg={4} className="bottom">
                  <Form.Label>Member's alternate email:</Form.Label>
                  {errors.email2 &&
                    <div className="error"><p>{errors.email2}</p></div>}
                  <Form.Control type="email" name="email2" placeholder={"donna@tardis.com"} value={userData.email2} className="formEmail" onChange={handleInputChange} />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Row>
                <Col lg={{ span: 8, offset: 2 }} className="bottom">
                  <Form.Label>Member's temporary password: <span className="red">*</span></Form.Label>
                  {errors.password &&
                    <div className="error"><p>{errors.password}</p></div>}
                  <Form.Control type="password" name="password" placeholder={"password"} value={userData.password} className="formInput" onChange={handleInputChange} />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="formAdminUserPhone">
              <Row>
                <Col lg={{ span: 2, offset: 2 }} className="bottom">
                  <Form.Label>Primary phone: <span className="red">*</span></Form.Label>
                  {errors.phone1 &&
                    <div className="error"><p>{errors.phone1}</p></div>}
                  <Form.Control type="email" name="phone1" placeholder={"555-555-5555"} value={userData.phone1} className="formInput" onChange={handleInputChange} />
                </Col>
                <Col lg={1} className="bottom">
                  <Form.Label>Type: <span className="red">*</span></Form.Label>
                  {errors.phone1Type &&
                    <div className="error"><p>{errors.phone1Type}</p></div>}
                  <Form.Select name="phone1Type" value={userData.phone1Type} className="formSelect" aria-label="Primary phone type" onChange={handleInputChange}>
                    <option>Select</option>
                    <option value="H">Home</option>
                    <option value="M">Mobile</option>
                    <option value="W">Work</option>
                  </Form.Select>
                </Col>
                <Col lg={{ span: 2, offset: 1 }} className="bottom">
                  <Form.Label>Secondary phone:</Form.Label>
                  <Form.Control type="email" name="phone2" placeholder={"555-555-5555"} value={userData.phone2} className="formInput" onChange={handleInputChange} />
                </Col>
                <Col lg={1} className="bottom">
                  <Form.Label>Type:</Form.Label>
                  {errors.phone2Type &&
                    <div className="error"><p>{errors.phone2Type}</p></div>}
                  <Form.Select name="phone2Type" value={userData.phone2Type} className="formSelect" aria-label="Second phone type" onChange={handleInputChange}>
                    <option>Select</option>
                    <option value="H">Home</option>
                    <option value="M">Mobile</option>
                    <option value="W">Work</option>
                  </Form.Select>
                </Col>
              </Row>
              <Row>
                <Col lg={{ span: 2, offset: 2 }} className="bottom">
                  <Form.Label>Third phone:</Form.Label>
                  <Form.Control type="email" name="phone3" placeholder={"555-555-5555"} value={userData.phone3} className="formInput" onChange={handleInputChange} />
                </Col>
                <Col lg={1} className="bottom">
                  <Form.Label>Type:</Form.Label>
                  {errors.phone3Type &&
                    <div className="error"><p>{errors.phone3Type}</p></div>}
                  <Form.Select name="phone3Type" value={userData.phone3Type} className="formSelect" aria-label="Third phone type" onChange={handleInputChange}>
                    <option>Select</option>
                    <option value="H">Home</option>
                    <option value="M">Mobile</option>
                    <option value="W">Work</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="formAdminUserSectPos">
              <Row>
                <Col lg={{ span: 4, offset: 2 }} className="bottom">
                  <Form.Label>Section: <span className="red">*</span></Form.Label>
                  <Form.Select name="section" value={userData.section} className="formSelect" aria-label="Section" onChange={handleInputChange}>
                    <option>Select</option>
                    <option value="Soprano I">Soprano I</option>
                    <option value="Soprano II">Soprano II</option>
                    <option value="Alto I">Alto I</option>
                    <option value="Alto II">Alto II</option>
                    <option value="Tenor I">Tenor I</option>
                    <option value="Tenor II">Tenor II</option>
                    <option value="Bass I">Bass I</option>
                    <option value="Bass II">Bass II</option>
                    <option value="Staff">Staff</option>
                    <option value="Board">Board</option>
                  </Form.Select>
                </Col>
                <Col lg={4} className="bottom">
                  <Form.Label>Position: <span className="red">*</span></Form.Label>
                  <Form.Select name="position" value={userData.position} className="formSelect" aria-label="Section" onChange={handleInputChange}>
                    <option value="singer">Singer</option>
                    <option value="accompanist">Accompanist</option>
                    <option value="administrator">Administrator</option>
                    <option value="assistant music director">Assistant Music Director</option>
                    <option value="board member">Board Member</option>
                    <option value="board president">Board President</option>
                    <option value="board secretary">Board Secretary</option>
                    <option value="board treasurer">Board Treasurer</option>
                    <option value="board vice-president">Board Vice-President</option>
                    <option value="digital media specialist">Digital Media Specialist</option>
                    <option value="graphic artist">Graphic Artist</option>
                    <option value="librarian">Librarian</option>
                    <option value="marketing director">Marketing Director</option>
                    <option value="music director">Music Director</option>
                    <option value="section leader">Section Leader</option>
                    <option value="webdev">Webdev</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="formAdminAddress">
              <Row>
                <Col lg={{ span: 4, offset: 2 }} className="bottom">
                  <Form.Label>Street address: <span className="red">*</span></Form.Label>
                  <Form.Control type="input" name="streetAddress" placeholder={"123 Main St."} value={userData.streetAddress} className="formInput" onChange={handleInputChange} />
                </Col>
                <Col lg={2} className="bottom">
                  <Form.Label>City: <span className="red">*</span></Form.Label>
                  <Form.Control type="input" name="city" placeholder={"Greeley"} value={userData.city} className="formInput" onChange={handleInputChange} />
                </Col>
                <Col lg={1} className="bottom">
                  <Form.Label>State: <span className="red">*</span></Form.Label>
                  <Form.Control type="input" name="state" placeholder={"CO"} value={userData.state} className="formInput" onChange={handleInputChange} />
                </Col>
                <Col lg={2} className="bottom">
                  <Form.Label>Zip: <span className="red">*</span></Form.Label>
                  <Form.Control type="input" name="zipCode" placeholder={"80631"} value={userData.zipCode} maxLength="5" className="formInput" onChange={handleInputChange} />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="formAdminChecks">
              <Row>
                <Col lg={{ span: 8, offset: 2 }}>
                  <Form.Check type="checkbox" inline label="Active?" name="isActive" value={userData.isActive} checked={userData.isActive === true} className="formCheck" onChange={handleCheckbox} />
                  <Form.Check type="checkbox" inline label="Admin privileges?" name="isAdmin" value={userData.isAdmin} checked={userData.isAdmin === true} className="formCheck" onChange={handleCheckbox} />
                </Col>
              </Row>
            </Form.Group>

            {Object.keys(errors).length !== 0 &&
              <Row>
                <Col sm={{ span: 8, offset: 2 }} className="bottom">
                  <div className="error"><p>The nanobots have detected an error or omission in one or more required fields. Please review this form.</p></div>
                </Col>
              </Row>}

            <Row>
              <Col sm={{ span: 3, offset: 2 }}>
                <Button data-toggle="popover" title="Submit" disabled={!(userData.fullName && userData.birthday && userData.email1 && userData.password && userData.phone1 && userData.phone1Type && userData.section && userData.streetAddress && userData.city && userData.state && userData.zipCode)} className="button formBtn" onClick={handleFormSubmit} type="submit">Submit</Button>
              </Col>
            </Row>
          </Form>
        </Container>
      }
    </>
  )
}

export default AdminUserForm;