import { Link } from "react-router-dom";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import "./style.css";

const SelectSongModal = (props) => {


  const handleInputChange = (e) => {

  }

  // const handleInputChange = async (e) => {
  //   const { dataset, name, value } = e.target;
  //   console.log("Attendee table", value, dataset.id);
  //   let adminConf: string;
  //   // Define data to be changed based on existing checkbox value
  //   switch (value) {
  //     case "yes":
  //       adminConf = "no";
  //       break;
  //     default:
  //       adminConf = "yes";
  //   }

  const handleFormSubmit = () => {

  }


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
                <Row>
                  <Col sm={{ span: 10, offset: 1 }}>
                    <Link to={`/edit_repertoire/${props.concertId}/${song._id}`}>{song.title}</Link>
                  </Col>
                </Row>))}
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
                    <Form.Check type="checkbox" name="deleteThis" value="" label={song.title} id={song.songId} checked={song.deleteThis === true} onChange={handleInputChange} />
                  ))}
                </Form.Group>

                <Modal.Footer className="modalFooter">
                  <Button data-toggle="popover" title="Delete repertoire" disabled={!props.songsToDelete} className="button formBtn" onClick={handleFormSubmit} type="submit">Delete Repertoire</Button>
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