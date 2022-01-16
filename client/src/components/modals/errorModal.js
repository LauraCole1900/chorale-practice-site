import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import "./style.css";

const ErrorModal = (props) => {


  return (
    <>
      <Modal show={props.show} onHide={props.hide} backdrop="static" keyboard={false} centered={true} className="modal">
        <Modal.Header className="modalHead">
          <Modal.Title className="modalTitle"><h2>We're sorry.</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">
          <h3>Gremlins appear to have gotten into our system. Please copy the error message below and send it to us to help us find and banish these gremlins as quickly as we can.</h3>

          {/* New Concert form */}
          {props.urlid === "new_event" &&
            <h4>{props.errmsg}. Your event was not created.</h4>}

          {/* Edit Concert form */}
          {props.urltype === "edit_concert" &&
            <h4>{props.errmsg}. Your event was not updated.</h4>}

          {/* Delete Concert confirm (modal) */}
          {props.urlid === "admin_portal" &&
            props.btnName === "concertDelete" &&
            <h4>{props.errmsg}. Your event was not deleted.</h4>}

          {/* Add User form */}
          {props.urlid === "new_member" &&
            <h4>{props.errmsg}. The new member was not created.</h4>}

          {/* Admin Edit User form */}
          {props.urltype === "edit_user" &&
            <h4>{props.errmsg}. The member's information was not updated.</h4>}

          {/* Delete Member confirm (modal) */}
          {props.urlid === "admin_portal" &&
            props.btnName === "memberDelete" &&
            <h4>{props.errmsg}. This member was not deleted.</h4>}

          {/* Edit Me form */}
          {props.urltype === "edit_me" &&
            <h4>{props.errmsg}. Your information was not updated.</h4>}

          {/* Add Post form */}
          {props.urlid === "new_post" &&
            <h4>{props.errmsg}. Your post was not created.</h4>}

          {/* Edit Post form */}
          {props.urltype === "edit_post" &&
            <h4>{props.errmsg}. Your post was not updated.</h4>}

          {/* Delete Post confirm (modal) */}
          {props.urlid === "admin_portal" &&
            props.btnName === "postDelete" &&
            <h4>{props.errmsg}. Your post was not deleted.</h4>}

          {/* Add Repertoire form */}
          {props.urltype === "repertoire" &&
            props.params.length === 1 &&
            <h4>{props.errmsg}. Repertoire was not added.</h4>}

          {/* Edit Repertoire form */}
          {props.urltype === "repertoire" &&
            props.params.length === 2 &&
            <h4>{props.errmsg}. This repertoire was not updated.</h4>}

          {/* Delete Repertoire form (modal) */}
          {props.urltype === "admin_portal" &&
            props.btnName === "songsDelete" &&
            <h4>{props.errmsg}. Repertoire was not deleted.</h4>}

          {/* Navigation buttons */}
          <Modal.Footer className="modalFooter">

            {/* Close modal and return to Admin Portal */}
            {props.urlid === "admin_portal" &&
              <Button data-toggle="popover" title="Admin Portal" type="button" className="button" onClick={props.click}>Return to Admin Portal</Button>}

            {/* Close modal and return to Profile */}
            {props.urlid === "profile" &&
              <Button data-toggle="popover" title="Profile" type="button" className="button" onClick={props.click}>Return to Profile</Button>}

            {/* Link to Admin Portal */}
            {props.urlid !== "/admin_portal" &&
              props.user.isAdmin === false &&
              <Link to={"/admin_portal"}>
                <Button data-toggle="popover" title="Admin Portal" type="button" className="button">Return to Admin Portal</Button>
              </Link>}

            {/* Link to Members page */}
            {props.urlid !== "members" &&
              <Link to={"/members"}>
                <Button data-toggle="popover" title="Members" type="button" className="button">Return to Members page</Button>
              </Link>}

            {/* Link to Profile */}
            {props.urlid !== "/profile" &&
              <Link to={"/profile"}>
                <Button data-toggle="popover" title="Profile" type="button" className="button">Return to Profile</Button>
              </Link>}

          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ErrorModal;