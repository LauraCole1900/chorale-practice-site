import { Button, Col, Modal, Row } from "react-bootstrap";
import "./style.css";


const setConcertOrderModal = (props) => {

  // Handles drag-n-drop
  const handleInputChange = (e) => {
    // const { value } = e.currentTarget;
    // const songs = props.songsToDelete;
    // let songArr;
    // // If the existing array includes the ID of the song clicked on, remove it
    // // Otherwise, add it to the array
    // songs.includes(value) ? songArr = songs.filter(song => song !== value) : songArr = [...songs, value];
    // // Set the array of song IDs in state
    // props.setSongsToDelete(songArr);

    // sets concert order as i + 1
  };

  // Handles click on 'Set Concert Order' button
  const setConcertOrder = (e) => {
    e.preventDefault();


  };


  return (
    <>
      <Modal show={props.show} onHide={props.hide} backdrop="static" keyboard={false} centered={true} className="modal">

        {/* Renders draggable list of songs to order */}
        {props.btnname === "songsOrder" &&
          <>
            <Modal.Header className="modalHead">
              <Modal.Title className="modalTitle">Drag repertoire into concert order</Modal.Title>
            </Modal.Header>

            <Modal.Body className="modalBody">
              {props.songs.map(song => (
                <Row key={song._id}>
                  <Col sm={{ span: 10, offset: 1 }}>
                    <p>{song.title}</p>
                  </Col>
                </Row>))}
              <Modal.Footer className="modalFooter">
                <Button data-toggle="popover" title="Take me back" className="button" type="button" onClick={props.hide}>Take me back</Button>
                <Button data-toggle="popover" title="Set concert order" className="button" type="button" onClick={setConcertOrder}>Set concert order</Button>
              </Modal.Footer>
            </Modal.Body>
          </>}

      </Modal>
    </>
  )
};

export default setConcertOrderModal