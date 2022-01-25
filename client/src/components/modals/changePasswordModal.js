import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import "./style.css";

const ChangePasswordModal = (props) => {
  const [pwordMatch, setPwordMatch] = useState(false);

  const checkMatch = (pword1, pword2) => {
    const match = pword1 === pword2;
    setPwordMatch(match);
  }

  // Handles input changes to form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    props.setUserData({ ...props.userData, [name]: value })
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.update(e);
  }


  return (
    <>
      <Modal show={props.show} onHide={props.hide} backdrop="static" keyboard={false} centered={true} className="modal">
        <Modal.Header className="modalHead">
          <Modal.Title className="modalTitle">Change Your Password</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modalBody">
          <Form onSubmit={handleFormSubmit}>

            <Row>
              <Col lg={12}>
                <Form.Group controlId="formOldPword">
                  <Form.Label>Confirm current password: <span className="red">*</span></Form.Label>
                  <Form.Control type="password" name="oldPassword" placeholder="Current password" value={props.userData.oldPassword} className="formInput" onChange={e => handleInputChange(e)} required />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col lg={12}>
                <Form.Group controlId="formNewPword">
                  <Form.Label>New password: <span className="red">*</span></Form.Label>
                  <Form.Control type="password" name="newPassword" placeholder="New password" value={props.userData.newPassword} className="formInput" onChange={e => handleInputChange(e)} required />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col lg={12}>
                <Form.Group controlId="formNewPwordConfirm">
                  <Form.Label>Confirm new password: <span className="red">*</span></Form.Label>
                  <Form.Control type="password" name="password" placeholder="Confirm new password" value={props.userData.password} className="formInput" onChange={e => handleInputChange(e)} onBlur={() => checkMatch(props.userData.newPassword, props.userData.password)} required />
                  {pwordMatch === false &&
                    <Form.Text className="red">New password & Confirm new password must match!</Form.Text>}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col sm={6}>
                <Button data-toggle="popover" title="Update Password" disabled={!(props.userData.oldPassword && props.userData.newPassword && props.userData.password && (props.userData.newPassword === props.userData.password))} className="button formBtn" onClick={handleFormSubmit} type="submit">Update Password</Button>
              </Col>
              <Col sm={6}>
                <Button data-toggle="popover" title="Cancel" className="button formBtn" onClick={props.hide} type="button">Cancel</Button>
              </Col>
            </Row>

          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ChangePasswordModal;