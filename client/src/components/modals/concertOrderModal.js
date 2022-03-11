import { useEffect, useRef } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import Sortable from "sortablejs";
import "./style.css";


const ConcertOrderModal = (props) => {

  //================//
  //   Vars & Ref   //
  //================//

  const sortableRef = useRef(null);
  let sortable;


  //=================//
  //     Methods     //
  //=================//

  // Handles click on 'Set Concert Order' button
  const handleConcertOrderClick = (e) => {
    e.preventDefault();
    const songArr = sortable.toArray();
    let orderedSongs = [];
    songArr.forEach((songId, i) => {
      let currentSong = { id: songId, concertOrder: i + 1 };
      orderedSongs = [...orderedSongs, currentSong];
    });
    if (orderedSongs.length) {
      handleSetSongsAttr(orderedSongs);
    }
  };

  // Sets each song's concertOrder attribute to the above-set index
  // Runs setConcertOrder mutation
  const handleSetSongsAttr = (songIndices) => {
    let songObjs = [];
    const copiedSongs = JSON.parse(JSON.stringify(props.songs), omitTypename);
    copiedSongs.forEach(song => {
      songIndices.forEach(ind => {
        if (song._id === ind.id) {
          const newSong = Object.assign({}, song, { concertOrder: ind.concertOrder });
          songObjs = [...songObjs, newSong];
        }
      })
    });
    props.setSongsToOrder(songObjs);
    props.setConcertOrder(props.concertId, songObjs);
  };

  // Strips __typename out of each song so mutation will actually run
  function omitTypename(key, value) {
    return key === '__typename' ? undefined : value
  }


  //======================//
  //   Run on page load   //
  //======================//

  useEffect(() => {
    if (props.show) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
            </Modal.Body>
            <Modal.Footer className="modalFooter">
              <Button data-toggle="popover" title="Take me back" className="button" type="button" onClick={props.hide}>Take me back</Button>
              <Button data-toggle="popover" title="Set concert order" className="button" type="button" onClick={handleConcertOrderClick}>Set concert order</Button>
            </Modal.Footer>
          </>}

      </Modal>
    </>
  )
};

export default ConcertOrderModal