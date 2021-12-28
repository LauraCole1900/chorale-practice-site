import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Card, Form, Row } from "react-bootstrap";
import "./style.css";

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Handles input changes to form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value })
  };

  // Handles form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    navigate("/members");
  }


  return (
    <>
      <Card>
        <Card.Header className="cardTitle">
          <h1>Log in</h1>
        </Card.Header>
        <Card.Body className="cardBody">
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>Email: <span className="red">*</span></Form.Label>
                  <Form.Control type="email" name="email" placeholder="name@email.com" value={userData.email} className="formInput" onChange={e => handleInputChange(e)} required />
                  <Form.Control.Feedback type="invalid">Please enter your email</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>Password: <span className="red">*</span></Form.Label>
                  <Form.Control type="password" name="password" placeholder="Enter password here" value={userData.password} className="formInput" onChange={e => handleInputChange(e)} required />
                  <Form.Control.Feedback type="invalid">Please enter your password</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Button disabled={!(userData.email && userData.password)} type="submit" className="formBtn">
                Login
              </Button>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}

export default Login;