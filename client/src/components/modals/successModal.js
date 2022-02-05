import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import "./style.css";


const SuccessModal = (props) => {


  return (
    <>
      <Modal show={props.show} onHide={props.hide} backdrop="static" keyboard={false} centered={true} className="modal">
        <Modal.Header className="modalHead">
          <Modal.Title className="modalTitle"><h2>Success!</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">

          {/* New Concert form */}
          {props.urlid === "new_event" &&
            <h4>Your event was created.</h4>}

          {/* Edit Concert form */}
          {props.urltype === "edit_concert" &&
            <h4>Your event was updated.</h4>}

          {/* Delete Concert confirm (modal) */}
          {props.urlid === "admin_portal" &&
            props.btnname === "concertDelete" &&
            <h4>Your event was deleted.</h4>}

          {/* Add User form */}
          {props.urlid === "new_member" &&
            <h4>New member was created.</h4>}

          {/* Admin Edit User form */}
          {props.urltype === "edit_user" &&
            <h4>The member's information was updated.</h4>}

          {/* Delete Member confirm (modal) */}
          {props.urlid === "admin_portal" &&
            props.btnname === "memberDelete" &&
            <h4>This member was deleted.</h4>}

          {/* Edit Me form */}
          {props.urltype === "edit_me" &&
            <h4>Your information was updated.</h4>}

          {/* Add Post form */}
          {props.urlid === "new_post" &&
            <h4>Your post was created.</h4>}

          {/* Edit Post form */}
          {props.urltype === "edit_post" &&
            <h4>Your post was updated.</h4>}

          {/* Delete Post confirm (modal) */}
          {props.urlid === "admin_portal" &&
            props.btnname === "postDelete" &&
            <h4>Your post was deleted.</h4>}

          {/* Add Repertoire form */}
          {props.urlid === "repertoire" &&
            <h4>Repertoire was added.</h4>}

          {/* Edit Repertoire form */}
          {props.urltype === "edit_repertoire" &&
            <h4>This repertoire was updated.</h4>}

          {/* Delete Repertoire form (modal) */}
          {props.urltype === "admin_portal" &&
            props.btnname === "songsDelete" &&
            <h4>Repertoire was deleted.</h4>}

          {/* Navigation buttons */}
          <Modal.Footer className="modalFooter">

            {/* Close modal and return to Admin Portal */}
            {props.urlid === "admin_portal" &&
              <Button data-toggle="popover" title="Admin Portal" type="button" className="button" onClick={props.hide}>Return to Admin Portal</Button>}

            {/* Close modal and return to Profile */}
            {props.urlid === "profile" &&
              <Button data-toggle="popover" title="Profile" type="button" className="button" onClick={props.hide}>Return to Profile</Button>}

            {/* Link to Admin Portal */}
            {props.urlid !== "admin_portal" &&
              props.user.isAdmin === true &&
              <Link to={"/admin_portal"}>
                <Button data-toggle="popover" title="Admin Portal" type="button" className="button">Return to Admin Portal</Button>
              </Link>}

            {/* Link to Members page */}
            {props.urlid !== "members" &&
              <Link to={"/members"}>
                <Button data-toggle="popover" title="Members" type="button" className="button">Return to Members page</Button>
              </Link>}

            {/* Link to Profile */}
            {props.urlid !== "profile" &&
              <Link to={"/profile"}>
                <Button data-toggle="popover" title="Profile" type="button" className="button">Return to Profile</Button>
              </Link>}

            {/* Link to Add Repertoire form */}
            {props.urlid === "new_event" &&
              <Link to={`/repertoire/${props.concertid}`}>
                <Button data-toggle="popover" title="Profile" type="button" className="button">Add Repertoire</Button>
              </Link>}

            {/* Close and return to Add Repertoire form to add more repertoire */}
            {props.urlid === "repertoire" &&
              <Button data-toggle="popover" title="Add Repertoire" type="button" className="button" onClick={props.hide}>Add More Repertoire</Button>}

          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default SuccessModal;