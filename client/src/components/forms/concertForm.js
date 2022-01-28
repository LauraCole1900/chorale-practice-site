import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CONCERT, EDIT_CONCERT_BASIC, QUERY_ALL_CONCERTS, QUERY_ME, QUERY_ONE_CONCERT } from "../../utils/gql";
import { concertValidate } from "../../utils/validation";
import Auth from "../../utils/auth";
import { ErrorModal, SuccessModal } from "../modals";
import "./style.css";

const ConcertForm = () => {
  const params = useParams();
  const [concertId, setConcertId] = useState(params.concertId);
  const [errThrown, setErrThrown] = useState();
  const [btnName, setBtnName] = useState();

  const { loading: editLoading, data: editData, error: editError } = useQuery(QUERY_ONE_CONCERT,
    {
      variables: { id: concertId }
    });

  const { loading: meLoading, data: meData, error: meError } = useQuery(QUERY_ME);

  const [addConcert, { addError }] = useMutation(ADD_CONCERT, {
    update(cache, { data: { addConcert } }) {
      try {
        // Retrieve existing concert data that is stored in the cache
        const data = cache.readQuery({ query: QUERY_ALL_CONCERTS });
        const currentConcerts = data.allConcerts;
        // Update the cache by combining existing concert data with the newly created data returned from the mutation
        cache.writeQuery({
          query: QUERY_ALL_CONCERTS,
          // If we want new data to show up before or after existing data, adjust the order of this array
          data: { allConcerts: [...currentConcerts, addConcert] },
        });
      } catch (err) {
        console.error(err);
      }
    }
  });

  const [editConcert, { editConcertError, editConcertData }] = useMutation(EDIT_CONCERT_BASIC);

  const me = meData?.me || meData?.currentId || {};
  const concertToEdit = editData?.oneConcert || {};

  const [concertData, setConcertData] = useState({
    name: "",
    date: [],
    time: [],
    venue: [],
    signUp: "",
    addlMaterials: []
  });
  const [errors, setErrors] = useState({});

  // Determines which page user is on, specifically for use with modals
  const urlArray = window.location.href.split("/")
  const urlId = urlArray[urlArray.length - 1]
  const urlType = urlArray[urlArray.length - 2]

  // Modal variables
  const [showErr, setShowErr] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Sets boolean to show or hide relevant modal
  const handleShowSuccess = () => setShowSuccess(true);
  const handleHideSuccess = () => setShowSuccess(false);
  const handleShowErr = () => setShowErr(true);
  const handleHideErr = () => setShowErr(false);

  // Handles input changes to form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConcertData({ ...concertData, [name]: value });
    if (["date", "venue", "addlMaterials"].includes(name)) {
      let dataArr = value.split(",");
      setConcertData({ ...concertData, [name]: dataArr });
    }
    if (name === "time") {
      let dataArr = value.toLowerCase().split(",");
      setConcertData({ ...concertData, [name]: dataArr });
    }
  };

  // Handles click on "Submit" button
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Validates required inputs
    const validationErrors = concertValidate(concertData);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);
    if (noErrors) {
      try {
        const { data } = await addConcert({
          variables: { ...concertData }
        });
        setConcertId(data.addConcert._id);
        handleShowSuccess();
      } catch (error) {
        console.error(JSON.stringify(error));
        setErrThrown(error.message);
        handleShowErr();
      }
      setConcertData({
        name: "",
        date: [],
        time: [],
        venue: [],
        signUp: "",
        addlMaterials: []
      })
    } else {
      console.error({ validationErrors });
    }
  };

  // Handles click on "Update" button
  const handleFormUpdate = async (e) => {
    e.preventDefault();
    // Validates required inputs
    const validationErrors = concertValidate(concertData);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);
    if (noErrors) {
      try {
        const { data } = await editConcert({
          variables: { id: concertId, ...concertData }
        });
        handleShowSuccess();
      } catch (error) {
        console.error(JSON.stringify(error));
        setErrThrown(error.message);
        handleShowErr();
      }
      setConcertData({
        name: "",
        date: [],
        time: [],
        venue: [],
        signUp: "",
        addlMaterials: []
      })
    } else {
      console.error({ validationErrors });
    }
  };

  useEffect(() => {
    if (Object.keys(concertToEdit).length > 0) {
      setConcertData(concertToEdit)
    }
  }, [concertToEdit]);

  if (editLoading || meLoading) {
    return <h1>Loading....</h1>
  };

  if (editError || meError) {
    console.error(JSON.stringify({ editError }));
    console.error(JSON.stringify({ meError }));
  };

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />
  };

  if (!["administrator", "assistant music director", "music director", "webdev"].includes(me.position)) {
    return <Navigate to="/members" />
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

          {!Object.keys(params).length
            ? <Row>
              <Col sm={{ span: 3, offset: 2 }}>
                <Button data-toggle="popover" title="Submit" disabled={!(concertData.name && concertData.date.length && concertData.time.length && concertData.venue.length)} className="button formBtn" onClick={handleFormSubmit} type="submit">Submit</Button>
              </Col>
            </Row>
            : <Row>
              <Col sm={{ span: 3, offset: 2 }}>
                <Button data-toggle="popover" title="Update" disabled={!(concertData.name && concertData.date.length && concertData.time.length && concertData.venue.length)} className="button formBtn" onClick={handleFormUpdate} type="submit">Update</Button>
              </Col>
            </Row>}

        </Form>

        <SuccessModal
          user={me}
          urlid={urlId}
          urltype={urlType}
          btnname={btnName}
          concertid={concertId}
          params={[]}
          show={showSuccess === true}
          hide={() => handleHideSuccess()}
        />

        <ErrorModal
          user={me}
          urlid={urlId}
          urltype={urlType}
          errmsg={errThrown}
          btnname={btnName}
          show={showErr === true}
          hide={() => handleHideErr()}
        />

      </Container>
    </>
  )
}

export default ConcertForm;