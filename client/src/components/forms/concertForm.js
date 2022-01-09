import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CONCERT, EDIT_CONCERT_BASIC, QUERY_ME, QUERY_ONE_CONCERT } from "../../utils/gql";
import { concertValidate } from "../../utils/validation";
import Auth from "../../utils/auth";
import "./style.css";

const ConcertForm = () => {
  const params = useParams();
  const concertId = params.concertId;
  console.log({ concertId });
  const navigate = useNavigate();
  const currentUserId = Auth.getProfile().data?._id;

  const { loading: editLoading, data: editData, error: editError } = useQuery(QUERY_ONE_CONCERT,
    {
      variables: { id: concertId }
    });
  const { loading: meLoading, data: meData, error: meError } = useQuery(QUERY_ME,
    {
      variables: { id: currentUserId }
    });
  const [addConcert, { addError, addData }] = useMutation(ADD_CONCERT);
  const [editConcert, { editConcertError, editConcertData }] = useMutation(EDIT_CONCERT_BASIC);

  const me = meData?.me || {};
  console.log({ me });
  const concertToEdit = editData?.oneConcert || {};
  console.log({ concertToEdit });

  const [concertData, setConcertData] = useState({
    name: "",
    date: [],
    time: [],
    venue: [],
    signUp: "",
    addlMaterials: [],
  });
  const [errors, setErrors] = useState({});

  // Handles input changes to form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConcertData({ ...concertData, [name]: value });
    if (["date", "time", "venue", "addlMaterials"].includes(name)) {
      let dataArr = value.split(",");
      setConcertData({ ...concertData, [name]: dataArr });
    }
  };

  // Handles click on "Submit" button
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log({ concertData })
    // Validates required inputs
    const validationErrors = concertValidate(concertData);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);
    if (noErrors) {
      console.log("Concert submit", concertData)
      try {
        const { data } = await addConcert({
          variables: { ...concertData }
        });
        console.log({ data });
        navigate("./admin_portal");
      } catch (error) {
        console.log(error);
      }
      setConcertData({
        name: "",
        date: [],
        time: [],
        venue: [],
        signUp: "",
        addlMaterials: [],
      })
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

  // Handles click on "Update" button
  const handleFormUpdate = async (e) => {
    e.preventDefault();
    console.log({ concertData })
    // Validates required inputs
    const validationErrors = concertValidate(concertData);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);
    if (noErrors) {
      console.log("Concert submit", concertData)
      try {
        const { data } = await editConcert({
          variables: { ...concertData }
        });
        console.log({ data });
        navigate("./admin_portal");
      } catch (error) {
        console.log(error);
      }
      setConcertData({
        name: "",
        date: [],
        time: [],
        venue: [],
        signUp: "",
        addlMaterials: [],
      })
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

  useEffect(() => {
    if (Object.keys(concertToEdit).length > 0) {
      setConcertData(concertToEdit)
    }
  }, [concertToEdit]);

  if (editLoading || meLoading) {
    return <h1>Loading....</h1>
  }


  return (
    <>
      {!Auth.loggedIn()
        ? <Navigate to="/login" />
        : (["administrator", "assistant music director", "music director", "webdev"].includes(me.position)
          ? <Container>
            <Row>
              <Col sm={12} className="formHeader">
                <h1>Add a new concert or event</h1>
              </Col>
            </Row>

            <Form className="concertForm">
              <Form.Group controlId="formConcertName">
                <Row>
                  <Col sm={{ span: 8, offset: 2 }}>
                    <Form.Label>Name of concert or event: <span className="red">*</span></Form.Label>
                    {errors.name &&
                      <div className="error"><p>{errors.name}</p></div>}
                    <Form.Control type="input" name="name" placeholder="Our Fantastic Concert" value={concertData.name} className="formInput" onChange={handleInputChange} />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formConcertDate">
                <Row>
                  <Col sm={{ span: 8, offset: 2 }}>
                    <Form.Label>Date(s) of concert or event: <span className="red">*</span></Form.Label><br />
                    <Form.Text className="subtitle" muted>Please enter dates in the format MM-DD-YYYY. For events that occur on multiple dates (auditions, tours, etc.), separate dates with commas</Form.Text>
                    {errors.date &&
                      <div className="error"><p>{errors.date}</p></div>}
                    <Form.Control type="input" name="date" placeholder="04-05-2063" value={concertData.date} className="formInput" onChange={handleInputChange} />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formConcertTime">
                <Row>
                  <Col sm={{ span: 8, offset: 2 }}>
                    <Form.Label>Time(s) of concert or event: <span className="red">*</span></Form.Label><br />
                    <Form.Text className="subtitle" muted>Please enter times in the format HH:MMam/pm. For events that occur at multiple times (Pops & Pasta, etc.), separate times with commas</Form.Text>
                    {errors.time &&
                      <div className="error"><p>{errors.time}</p></div>}
                    <Form.Control type="input" name="time" placeholder="7:30pm" value={concertData.time} className="formInput" onChange={handleInputChange} />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formConcertVenue">
                <Row>
                  <Col sm={{ span: 8, offset: 2 }}>
                    <Form.Label>Venue(s) of concert or event: <span className="red">*</span></Form.Label><br />
                    <Form.Text className="subtitle" muted>For events that occur at multiple venues (tours, etc.), please separate venues with commas</Form.Text>
                    {errors.venue &&
                      <div className="error"><p>{errors.venue}</p></div>}
                    <Form.Control type="input" name="venue" placeholder="Frasier 63" value={concertData.venue} className="formInput" onChange={handleInputChange} />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formConcertSignUp">
                <Row>
                  <Col sm={{ span: 8, offset: 2 }}>
                    <Form.Label>Signup link, if applicable:</Form.Label>
                    <Form.Control type="input" name="signUp" placeholder="Link to Signup Genius, etc." value={concertData.signUp} className="formInput" onChange={handleInputChange} />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formConcertAddlMaterials">
                <Row>
                  <Col sm={{ span: 8, offset: 2 }}>
                    <Form.Label>If there are supplemental materials, please enter the link(s) to them here:</Form.Label><br />
                    <Form.Text className="subtitle" muted>For multiple links, please separate links with commas</Form.Text>
                    <Form.Control type="input" name="addlMaterials" placeholder="http://link_to_lyric_sheet_etc.com" value={concertData.addlMaterials} className="formInput" onChange={handleInputChange} />
                  </Col>
                </Row>
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

              {!Object.keys(params).length
                ? <Row>
                  <Col sm={{ span: 3, offset: 2 }}>
                    <Button data-toggle="popover" title="SubmitAddSongs" disabled={!(concertData.name && concertData.date.length && concertData.time.length && concertData.venue.length)} className="button formBtn" onClick={handleFormSubmit} type="submit">Yes, add repertoire</Button>
                  </Col>
                  <Col sm={{ span: 3, offset: 1 }}>
                    <Button data-toggle="popover" title="Submit" disabled={!(concertData.name && concertData.date.length && concertData.time.length && concertData.venue.length)} className="button formBtn" onClick={handleFormSubmit} type="submit">No, just submit</Button>
                  </Col>
                </Row>
                : <Row>
                  <Col sm={{ span: 3, offset: 2 }}>
                    <Button data-toggle="popover" title="UpdateAddSongs" disabled={!(concertData.name && concertData.date.length && concertData.time.length && concertData.venue.length)} className="button formBtn" onClick={handleFormUpdate} type="submit">Yes, add repertoire</Button>
                  </Col>
                  <Col sm={{ span: 3, offset: 1 }}>
                    <Button data-toggle="popover" title="Update" disabled={!(concertData.name && concertData.date.length && concertData.time.length && concertData.venue.length)} className="button formBtn" onClick={handleFormUpdate} type="submit">No, just update</Button>
                  </Col>
                </Row>}

            </Form>
          </Container>
          : <Navigate to="/members" />
        )
      }
    </>
  )
}

export default ConcertForm;