import { useEffect, useRef, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import Sortable from "sortablejs";
import "./style.css";


const ConcertOrderModal = (props) => {
  const sortableRef = useRef(null);
  const [songsToSave, setSongsToSave] = useState([]);
  let sortable;


  // Handles click on 'Set Concert Order' button
  // Sets concertOrder on each song to index + 1
  const setConcertOrder = (e) => {
    e.preventDefault();
    const songArr = sortable.toArray();
    let orderedSongs = [];
    songArr.forEach((song, i) => {
      console.log({ song }, { i })
      let currentSong = { id: song, concertOrder: i + 1 };
      console.log({ currentSong });
      orderedSongs = [...orderedSongs, currentSong];
    });
    if (orderedSongs.length) {
      console.log({ orderedSongs });
      orderedSongs.pop();
      console.log({ orderedSongs });
      setSongsToSave(orderedSongs);
    }
  };

  // TODO: Match up each song's ID with the correct song object and update with new concert order value, then send the array of updated song objects to the back end


  useEffect(() => {
    if (props.show) {
      sortable = Sortable.create(sortableRef.current, {
        animation: 150,
        dataIdAttr: "data-id"
      });
    }
  }, [props.show]);


  return (
    <>
      <Modal show={props.show} onHide={props.hide} backdrop="static" keyboard={false} centered={true} className="modal">

        {/* Renders draggable list of songs to order */}
        {props.btnname === "songsOrder" &&
          <>
            <Modal.Header className="modalHead">
              <Modal.Title className="modalTitle">Drag repertoire into concert order</Modal.Title>
            </Modal.Header>

            <Modal.Body className="modalBody" ref={sortableRef} id="sortableId">
              {props.songs.map((song, i) => (
                <Row key={song._id} data-id={song._id} className="bordered">
                  <Col sm={{ span: 10, offset: 1 }}>
                    <p className="closeSpace">{song.title}</p>
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

export default ConcertOrderModal