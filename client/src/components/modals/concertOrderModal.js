import { useEffect, useRef } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import Sortable from "sortablejs";
import "./style.css";


const ConcertOrderModal = (props) => {
  const sortableRef = useRef(null);
  let sortable;


  // Handles click on 'Set Concert Order' button
  // Gets the new index value for each song -- how?
  // Sets concertOrder on each song to index + 1
  const setConcertOrder = (e) => {
    e.preventDefault();
    // const { dataset } = e.target;
    console.log(sortable.toArray());

  };


  useEffect(() => {
    if (props.show) {
      sortable = Sortable.create(sortableRef.current);
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
                <Row key={song._id} className="bordered">
                  <Col sm={{ span: 10, offset: 1 }}>
                    <p className="closeSpace" data-id={i}>{song.title}</p>
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