import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import "./style.css";

const SelectModal = (props) => {


  return (
    <>
      <Modal show={props.show} onHide={props.hide} backdrop="static" keyboard={false} centered={true} className="modal">

        <Modal.Header className="modalHead">
          <Modal.Title className="modalTitle"><h2>Select action</h2></Modal.Title>
        </Modal.Header>

        <Modal.Body className="modalBody">
          <h3>What do you want to do?</h3>

          {/* Navigation buttons */}
          <Modal.Footer className="modalFooter">

            {/* Edit Event */}
            {props.type === "event" &&
              <Link to={`/edit_event/${props.concert._id}`}>
                <Button data-toggle="popover" title="Edit Event" className="button" type="button">Edit Event Information</Button>
              </Link>}

            {/* Add Repertoire */}
            {props.type === "event" &&
              <Link to={`/repertoire/${props.concert._id}`}>
                <Button data-toggle="popover" title="Add Repertoire" className="button" type="button">Add Repertoire</Button>
              </Link>}

            {/* Edit Repertoire */}
            {props.type === "event" &&
              <Button data-toggle="popover" title="Select Repertoire" className="button" type="button" data-btnname="songsEdit" onClick={props.showSelectSongs}>Select Repertoire to Edit</Button>}

            {/* Delete Repertoire */}
            {props.type === "repertoire" &&
              <Button data-toggle="popover" title="Delete Repertoire" className="button" type="button" data-btnname="songsDelete" onClick={props.showSelectSongs}>Select Repertoire to Delete</Button>}

            {/* Delete Event */}
            {props.type === "event" &&
              <Button data-toggle="popover" title="Delete Event" className="button" type="button" data-btnname="concertDelete" onClick={props.confirm}>Delete This Event</Button>}

            {/* Edit Member */}
            {props.type === "member" &&
              <Link to={`/edit_member/${props.member._id}`}>
                <Button data-toggle="popover" title="Edit Member" className="button" type="button">Edit Member Information</Button>
              </Link>}

            {/* Delete Member */}
            {props.type === "member" &&
              <Button data-toggle="popover" title="Delete Event" className="button" type="button" data-btnname="memberDelete" onClick={props.confirm}>Delete This Member</Button>}

            {/* Edit Post */}
            {props.type === "post" &&
              <Link to={`/edit_post/${props.post._id}`}>
                <Button data-toggle="popover" title="Edit Post" className="button" type="button">Edit Post</Button>
              </Link>}

            {/* Delete Post */}
            {props.type === "post" &&
              <Button data-toggle="popover" title="Delete Post" className="button" type="button" data-btnname="postDelete" onClick={props.confirm}>Delete This Post</Button>}

            {/* Take no action button */}
            <Button data-toggle="popover" title="No" className="button" type="button" onClick={props.hide}>Take me back</Button>

          </Modal.Footer>

        </Modal.Body>
      </Modal>
    </>
  )
}

export default SelectModal;