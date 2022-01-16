import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import "./style.css";

const SelectSongModal = ({ concertId, songs }) => {
  const [songsToDelete, setSongsToDelete] = useState([]);

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
      <Row>
        <Col sm={12}>
          <h1>Choose repertoire to delete</h1>
        </Col>
      </Row>

      <Form className="checkboxForm">
        <Form.Group controlId="formDeleteSongs">
          {songs.map(song => (
            <Form.Check type="checkbox" name="deleteThis" value="" label={song.title} id={song.songId} checked={song.deleteThis === true} onChange={handleInputChange} />
          ))}
        </Form.Group>

        <Button data-toggle="popover" title="Delete repertoire" disabled={!songsToDelete} className="button formBtn" onClick={handleFormSubmit} type="submit">Delete Repertoire</Button>
      </Form>
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