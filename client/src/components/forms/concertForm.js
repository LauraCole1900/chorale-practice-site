import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "./react-bootstrap";
import { concertValidate } from "../../utils/validation";
import "./style.css";

const ConcertForm = () => {
  const [concertData, setConcertData] = useState({
    name: "",
    date: [],
    time: [],
    venue: [],
    addlMaterials: [],
  });
  const [errors, setErrors] = useState({});

  // Handles input changes to form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConcertData({ ...concertData, [name]: value });
    if (["date", "time", "venue", "addlMaterials"].includes(name)) {
      let data = value.split(",").trim();
      setConcertData({ ...concertData, [name]: data });
    }
  };


  return (
    <>
      <Container>
        <Row>
          <Col sm={12} className="formHeader">
            <h1>Add a new concert or event</h1>
          </Col>
        </Row>

        <Form className="concertForm">
          <Row>
            <Form.Group controlId="formConcertName">
              <Col sm={6}>
                <Form.Label>Name of concert or event: <span className="red">*</span></Form.Label>
                {errors.name &&
                  <div className="error"><p>{errors.name}</p></div>}
                <Form.Control type="input" name="name" placeholder="Our Fantastic Concert" value={concertData.name} className="formInput" onChange={handleInputChange} />
              </Col>
            </Form.Group>
            <Form.Group controlId="formConcertDate">
              <Col sm={6}>
                <Form.Label>Date(s) of concert or event: <span className="red">*</span></Form.Label>
                {errors.date &&
                  <div className="error"><p>{errors.date}</p></div>}
                <Form.Text className="subtitle" muted>Please enter dates in the format MM-DD-YYYY and, for events that occur on multiple dates (auditions, tours, etc.), separate dates with commas</Form.Text>
                <Form.Control type="input" name="date" placeholder="04-05-2063" value={concertData.date} className="formInput" onChange={handleInputChange} />
              </Col>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group controlId="formConcertTime">
              <Col sm={6}>
                <Form.Label>Time(s) of concert or event: <span className="red">*</span></Form.Label>
                {errors.time &&
                  <div className="error"><p>{errors.time}</p></div>}
                <Form.Text className="subtitle" muted>Please enter times in the format HH:MMam and, for events that occur at multiple times (Pops & Pasta, etc.), separate times with commas</Form.Text>
                <Form.Control type="input" name="time" placeholder="7:30pm" value={concertData.date} className="formInput" onChange={handleInputChange} />
              </Col>
            </Form.Group>
            <Form.Group controlId="formConcertVenue">
              <Col sm={6}>
                <Form.Label>Venue(s) of concert or event: <span className="red">*</span></Form.Label>
                {errors.venue &&
                  <div className="error"><p>{errors.venue}</p></div>}
                <Form.Text className="subtitle" muted>For events that occur at multiple venues (tours, etc.), please separate venues with commas</Form.Text>
                <Form.Control type="input" name="venue" placeholder="Frasier 63" value={concertData.venue} className="formInput" onChange={handleInputChange} />
              </Col>
            </Form.Group>
          </Row>
          <Form.Group controlId="formConcertAddlMaterials">
            <Col sm={12}>
              <Form.Label>If there are supplemental materials, please enter the link(s) to them here:</Form.Label>
              <Form.Text className="subtitle" muted>For multiple links, please separate links with commas</Form.Text>
              <Form.Control type="input" name="addlMaterials" placeholder="http://linktolyricsheetetc.com" value={concertData.addlMaterials} className="formInput" onChange={handleInputChange} />
            </Col>
          </Form.Group>
        </Form>
      </Container>
    </>
  )
}

export default ConcertForm;