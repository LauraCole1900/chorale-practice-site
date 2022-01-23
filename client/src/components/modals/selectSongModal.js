import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_MANY_SONGS, QUERY_ONE_CONCERT } from "../../utils/gql";
import "./style.css";

const SelectSongModal = (props) => {
  const [songsToDelete, setSongsToDelete] = useState([]);
  console.log({ songsToDelete });

  const [deleteSongs, { deleteError, deleteData }] = useMutation(DELETE_MANY_SONGS, {
    update(cache, { data: { deleteSongs } }) {
      try {
        // Retrieve existing post data that is stored in the cache
        const data = cache.readQuery({ query: QUERY_ONE_CONCERT });
        const concert = data.oneConcert;
        // Update the cache by combining existing post data with the newly created data returned from the mutation
        cache.writeQuery({
          query: QUERY_ONE_CONCERT,
          // If we want new data to show up before or after existing data, adjust the order of this array
          data: { oneConcert: [...concert, deleteSongs] },
        });
      } catch (err) {
        console.error(err);
      }
    }
  });

  const handleInputChange = (e) => {
    const { value } = e.currentTarget;
    const songs = songsToDelete;
    let songArr;
    if (songs.includes(value)) {
      songArr = songs.filter(song => song !== value)
    } else {
      songArr = [...songs, value]
    }
    setSongsToDelete(songArr);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

      try {
        const { data } = await deleteSongs({
          variables: { _id: props.concertId, songsToDelete }
        });
        // handleShowSuccess();
      } catch (error) {
        console.error(JSON.stringify(error));
      //   setErrThrown(error.message);
      //   handleShowErr();
      }
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
                    <Form.Check key={song._id} type="checkbox" name="deleteThis" value={song._id} label={song.title} checked={songsToDelete.includes(song._id)} onChange={handleInputChange} />
                  ))}
                </Form.Group>

                <Modal.Footer className="modalFooter">
                  <Button data-toggle="popover" title="Delete repertoire" disabled={!songsToDelete} className="button formBtn" onClick={handleFormSubmit} type="submit">Delete Repertoire</Button>

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
