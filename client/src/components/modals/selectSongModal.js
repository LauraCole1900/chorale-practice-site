import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import "./style.css";

const SelectSongModal = (props) => {

  const handleInputChange = (e) => {
    const { value } = e.currentTarget;
    const songs = props.songsToDelete;
    let songArr;
    songs.includes(value) ? songArr = songs.filter(song => song !== value) : songArr = [...songs, value];
    props.setSongsToDelete(songArr);
  };

  const handleGoBack = () => {
    props.setSongsToDelete([]);
    props.hide();
  };

  const handleGoOn = (e) => {
    e.preventDefault();
    const { dataset } = e.target
    props.setbtnname(dataset.btnname);
    props.setSongsToDelete([]);
    props.confirm(e);
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
                    <Form.Check key={song._id} type="checkbox" name="deleteThis" value={song._id} label={song.title} checked={props.songsToDelete.includes(song._id)} onChange={handleInputChange} />
                  ))}
                </Form.Group>

                <Modal.Footer className="modalFooter">
                  <Button data-toggle="popover" title="Delete repertoire" disabled={!props.songsToDelete} className="button formBtn" data-btnname="songsDelete" onClick={(e) => handleGoOn(e)} type="submit">Delete Repertoire</Button>

                  <Button data-toggle="popover" title="Take me back" className="button" type="button" onClick={handleGoBack}>Take me back</Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </>}
      </Modal>
    </>
  )
}

export default SelectSongModal;
