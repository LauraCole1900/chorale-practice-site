import { Button, Modal } from "react-bootstrap";
import "./style.css";

const ConfirmModal = (props) => {


  return (
    <>
      <Modal show={props.show} onHide={props.hide} backdrop="static" keyboard={false} centered={true} className="modal">
        <Modal.Header className="modalHeadConf">
          <Modal.Title className="modalTitle"><h2>Please confirm</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">
          <h3>Are you sure?</h3>

          {/* Delete Event button */}
          {props.btnname === "concertDelete" &&
            <h4>Are you sure you want to delete {props.concert.name}? This action can't be undone.</h4>}

          {/* Delete Member button */}
          {props.btnname === "memberDelete" &&
            <h4>Are you sure you want to delete {props.member.fullName}? This action can't be undone.</h4>}

          {/* Delete Post button */}
          {props.btnname === "postDelete" &&
            <h4>Are you sure you want to delete {props.post.title} from {props.post.date}? This action can't be undone.</h4>}

          {/* Delete Repertoire button */}
          {props.btnname === "songsDelete" &&
            <h4>Are you sure you want to delete the selected repertoire? This action can't be undone.</h4>}

          {/* Navigation buttons */}
          <Modal.Footer className="modalFooter">

            {/* Confirm Delete Concert button */}
            {props.btnname === "concertDelete" &&
              <Button data-toggle="popover" title="Confirm Delete" className="button" type="button" onClick={props.eventDelete}>Yes, Cancel {props.concert.name}</Button>}

            {/* Confirm Delete Member button */}
            {props.btnname === "memberDelete" &&
              <Button data-toggle="popover" title="Confirm Delete" className="button" type="button" onClick={props.memberDelete}>Yes, Delete {props.member.fullName}</Button>}

            {/* Confirm Delete Post button */}
            {props.btnname === "postDelete" &&
              <Button data-toggle="popover" title="Confirm Delete" className="button" type="button" onClick={props.postDelete}>Yes, Delete {props.post.title} from {props.post.date}</Button>}

            {/* Confirm Delete Repertoire button */}
            {props.btnname === "songsDelete" &&
              <Button data-toggle="popover" title="Confirm Delete" className="button" type="button" onClick={props.songsDelete}>Yes, Delete Repertoire</Button>}

            {/* No, take no action button */}
            <Button data-toggle="popover" title="No" className="button" type="button" onClick={props.hide}>No, take me back</Button>

          </Modal.Footer>

        </Modal.Body>
      </Modal>
    </>
  )
}

export default ConfirmModal;