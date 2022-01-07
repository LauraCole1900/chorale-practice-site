import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
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

  // Handles click on "Submit" button
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log({ concertData })
    // Validates required inputs
    const validationErrors = concertValidate(concertData);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);
    if (noErrors) {
      console.log("Concert submit", concertData)
      // POST call to create concert document
      // ExhibitorAPI.registerExhibitor({ ...exhibitor })
      //   .then(resp => {
      //     // If no errors thrown, show Success modal
      //     if (!resp.err) {
      //       handleShowSuccess();
      //     }
      //   })
      // If yes errors thrown, setState(err.message) and show Error modal
      // .catch(err => {
      //   console.log(err)
      //   setErrThrown(err.message);
      //   handleShowErr();
      // })
    } else {
      console.log({ validationErrors });
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
              <Col sm={{ span: 8, offset: 2 }}>
                <Form.Label>Name of concert or event: <span className="red">*</span></Form.Label>
                {errors.name &&
                  <div className="error"><p>{errors.name}</p></div>}
                <Form.Control type="input" name="name" placeholder="Our Fantastic Concert" value={concertData.name} className="formInput" onChange={handleInputChange} />
              </Col>
            </Form.Group>
            <Form.Group controlId="formConcertDate">
              <Col sm={{ span: 8, offset: 2 }}>
                <Form.Label>Date(s) of concert or event: <span className="red">*</span></Form.Label><br />
                <Form.Text className="subtitle" muted>Please enter dates in the format MM-DD-YYYY and, for events that occur on multiple dates (auditions, tours, etc.), separate dates with commas</Form.Text>
                {errors.date &&
                  <div className="error"><p>{errors.date}</p></div>}
                <Form.Control type="input" name="date" placeholder="04-05-2063" value={concertData.date} className="formInput" onChange={handleInputChange} />
              </Col>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group controlId="formConcertTime">
              <Col sm={{ span: 8, offset: 2 }}>
                <Form.Label>Time(s) of concert or event: <span className="red">*</span></Form.Label><br />
                <Form.Text className="subtitle" muted>Please enter times in the format HH:MMam and, for events that occur at multiple times (Pops & Pasta, etc.), separate times with commas</Form.Text>
                {errors.time &&
                  <div className="error"><p>{errors.time}</p></div>}
                <Form.Control type="input" name="time" placeholder="7:30pm" value={concertData.date} className="formInput" onChange={handleInputChange} />
              </Col>
            </Form.Group>
            <Form.Group controlId="formConcertVenue">
              <Col sm={{ span: 8, offset: 2 }}>
                <Form.Label>Venue(s) of concert or event: <span className="red">*</span></Form.Label><br />
                <Form.Text className="subtitle" muted>For events that occur at multiple venues (tours, etc.), please separate venues with commas</Form.Text>
                {errors.venue &&
                  <div className="error"><p>{errors.venue}</p></div>}
                <Form.Control type="input" name="venue" placeholder="Frasier 63" value={concertData.venue} className="formInput" onChange={handleInputChange} />
              </Col>
            </Form.Group>
          </Row>
          <Form.Group controlId="formConcertAddlMaterials">
            <Col sm={{ span: 8, offset: 2 }}>
              <Form.Label>If there are supplemental materials, please enter the link(s) to them here:</Form.Label><br />
              <Form.Text className="subtitle" muted>For multiple links, please separate links with commas</Form.Text>
              <Form.Control type="input" name="addlMaterials" placeholder="http://linktolyricsheetetc.com" value={concertData.addlMaterials} className="formInput" onChange={handleInputChange} />
            </Col>
          </Form.Group>

          {Object.keys(errors).length !== 0 &&
            <Row>
              <Col sm={{ span: 8, offset: 2 }}>
                <div className="error"><p>The nanobots have detected an error or omission in one or more required fields. Please review this form.</p></div>
              </Col>
            </Row>}

          <Row>
            <Col sm={{ span: 3, offset: 2 }}>
              <p>Add repertoire?</p>
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 3, offset: 2 }}>
              <Button data-toggle="popover" title="SubmitAddSongs" className="button" onClick={handleFormSubmit} type="submit">Yes, add repertoire</Button>
            </Col>
            <Col sm={{ span: 3, offset: 1 }}>
              <Button data-toggle="popover" title="Submit" className="button" onClick={handleFormSubmit} type="submit">No, just submit</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  )
}

export default ConcertForm;