import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import "./style.css";

const SelectSongModal = (props) => {
  console.log(props.songs);
  const [songsToDelete, setSongsToDelete] = useState([]);


  const handleInputChange = (e) => {
    // if checked, push song._id to songsToDelete array
    // if unchecked, filter song._id from songsToDelete array
    const { checked, value } = e.currentTarget;
    setSongsToDelete(songs => checked
      ? [...songs, value]
      : songs.filter(song => song !== song._id)
    )
  };

  // const handleInputChange = async (e) => {
  //   const { dataset, name, value } = e.target;
  //   console.log("Attendee table", value, dataset.id);
  //   let adminConf;
  //   // Define data to be changed based on existing checkbox value
  //   switch (value) {
  //     case "yes":
  //       adminConf = "no";
  //       break;
  //     default:
  //       adminConf = "yes";
  //   }

  const handleFormSubmit = () => {

  };


  return (
    <>
      <Modal show={props.show} onHide={props.hide} backdrop="static" keyboard={false} centered={true} className="modal">
        {props.btnname === "songsEdit" &&
          <>
            <Modal.Header className="modalHead">
              <Modal.Title className="modalTitle">Click on a song title to edit</Modal.Title>
            </Modal.Header>

            <Modal.Body className="modalBody">
              {props.songs.map(song => (
                <Row key={song._id}>
                  <Col sm={{ span: 10, offset: 1 }}>
                    <Link to={`/edit_repertoire/${props.concertId}/${song._id}`}>{song.title}</Link>
                  </Col>
                </Row>))}
              <Modal.Footer className="modalFooter">
                <Button data-toggle="popover" title="Take me back" className="button" type="button" onClick={props.hide}>Take me back</Button>
              </Modal.Footer>
            </Modal.Body>
          </>}

        {props.btnname === "songsDelete" &&
          <>
            <Modal.Header className="modalHead">
              <Modal.Title className="modalTitle">Choose repertoire to delete</Modal.Title>
            </Modal.Header>

            <Modal.Body className="modalBody">
              <Form className="checkboxForm">
                <Form.Group controlId="formDeleteSongs">
                  {props.songs.map(song => (
                    <Form.Check key={song._id} type="checkbox" name="deleteThis" value={song._id} label={song.title} checked={songsToDelete.some(song => song === song._id)} onChange={handleInputChange} />
                  ))}
                </Form.Group>

                <Modal.Footer className="modalFooter">
                  <Button data-toggle="popover" title="Delete repertoire" disabled={!props.songsToDelete} className="button formBtn" onClick={handleFormSubmit} type="submit">Delete Repertoire</Button>

                  <Button data-toggle="popover" title="Take me back" className="button" type="button" onClick={props.hide}>Take me back</Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </>}
      </Modal>
    </>
  )
}

export default SelectSongModal;

{/* <Form.Check
  type="checkbox"
  name="isAdmin"
  value={att.isAdmin}
  data-id={att._id}
  aria-label="adminCheck"
  className="adminCheck"
  checked={att.isAdmin === "yes"}
  onChange={handleInputChange}
/> */}