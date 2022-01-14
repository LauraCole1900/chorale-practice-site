import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { v1 as uuidv1 } from "uuid";
import { EDIT_CONCERT_REPERTOIRE, QUERY_ME, QUERY_ONE_CONCERT } from "../../utils/gql";
import { songValidate } from "../../utils/validation";
import Auth from "../../utils/auth";
import "./style.css";

const SongForm = () => {
  const currentUserId = Auth.getProfile().data?._id;
  const params = useParams();
  const navigate = useNavigate();

  const { loading: meLoading, data: meData, error: meError } = useQuery(QUERY_ME,
    {
      variables: { id: currentUserId }
    });
  const { loading: concertLoading, data: concertData, error: concertError } = useQuery(QUERY_ONE_CONCERT,
    {
      variables: { id: params.concertId }
    });
  const [editConcertRepertoire, { editConcertError, editConcertData }] = useMutation(EDIT_CONCERT_REPERTOIRE);

  const me = meData?.me || {};
  const concert = concertData?.oneConcert || {};
  console.log({ me }, { concert });

  const [songData, setSongData] = useState({
    title: "",
    composer: [],
    concertOrder: 0,
    publisher: "",
    copyrightDate: "",
    practiceTrackUrlsSopSlow: [],
    practiceTrackUrlsAltoSlow: [],
    practiceTrackUrlsTenSlow: [],
    practiceTrackUrlsBassSlow: [],
    practiceTrackUrlsSopATempo: [],
    practiceTrackUrlsAltoATempo: [],
    practiceTrackUrlsTenATempo: [],
    practiceTrackUrlsBassATempo: [],
    videoUrls: []
  });
  const [errors, setErrors] = useState({});

  // Handles input changes to form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSongData({ ...songData, [name]: value });
    if (["composer", "practiceTrackUrlsSopSlow", "practiceTrackUrlsAltoSlow", "practiceTrackUrlsTenSlow", "practiceTrackUrlsBassSlow", "practiceTrackUrlsSopATempo", "practiceTrackUrlsAltoATempo", "practiceTrackUrlsTenATempo", "practiceTrackUrlsBassATempo", "videoUrls"].includes(name)) {
      let dataArr = value.split(",");
      setSongData({ ...songData, [name]: dataArr });
    }
  };

  // Handles click on "Submit" button
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log({ songData });
    // Validates required inputs
    const validationErrors = songValidate(songData);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);
    if (noErrors) {
      console.log("Song submit", songData)
      try {
        const { data } = await editConcertRepertoire({
          variables: { songId: uuidv1(), ...concertData }
        });
        console.log({ data });
        navigate("/admin_portal");
      } catch (error) {
        console.log(error);
      }
      setSongData({
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
    console.log({ songData })
    // Validates required inputs
    const validationErrors = songValidate(songData);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);
    if (noErrors) {
      console.log("Song update", concertData)
      try {
        const { data } = await editConcertRepertoire({
          variables: { id: params.concertId, songId: params.songId, ...songData }
        });
        console.log({ data });
        if (e.target.title === "Update") {
          navigate("/admin_portal");
        } else {
          navigate(`/repertoire/${params.concertId}`)
        }
      } catch (error) {
        console.log(error);
      }
      setSongData({
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
    if (Object.keys(concert.songs).length > 0) {
      setSongData(concert.songs)
    }
  }, [concert.songs]);


  if (concertLoading || meLoading) {
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
                <h1>Add repertoire, practice tracks, and/or videos for "{concert.name}"</h1>
              </Col>
            </Row>

            <Form className="songForm">
              <Form.Group controlId="formSongTitleOrder">
                <Row>
                  <Col sm={{ span: 6, offset: 2 }}>
                    <Form.Label>Title: <span className="red">*</span></Form.Label>
                    {errors.title &&
                      <div className="error"><p>{errors.title}</p></div>}
                    <Form.Control type="input" name="title" placeholder="Swing Low, Sweet Chariot" value={songData.title} className="formInput" onChange={handleInputChange} />
                  </Col>
                  <Col sm={2}>
                    <Form.Label>Concert order:</Form.Label>
                    {errors.concertOrder &&
                      <div className="error"><p>{errors.concertOrder}</p></div>}
                    <Form.Control type="text" pattern="[0-9]*" inputmode="numeric" placeholder="42" value={songData.concertOrder} className="formInput" onChange={handleInputChange} />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group controlId="formSongComposer">
                <Row>
                  <Col sm={{ span: 8, offset: 2 }}>
                    <Form.Label>Composer(s): <span className="red">*</span></Form.Label><br />
                    <Form.Text className="subtitle" muted>Please comma-separate multiple names</Form.Text>
                    {errors.composer &&
                      <div className="error"><p>{errors.composer}</p></div>}
                    <Form.Control type="input" name="composer" placeholder="arr. Robert Shaw, arr. Alice Parker" value={songData.composer} className="formInput" onChange={handleInputChange} />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group controlId="formSongPublish">
                <Row>
                  <Col sm={{ span: 5, offset: 2 }}>
                    <Form.Label>Publisher:</Form.Label><br />
                    {errors.publisher &&
                      <div className="error"><p>{errors.publisher}</p></div>}
                    <Form.Control type="input" name="publisher" placeholder="Lawson-Gould Music Publishers" value={songData.publisher} className="formInput" onChange={handleInputChange} />
                  </Col>
                  <Col sm={3}>
                    <Form.Label>Copyright date:</Form.Label><br />
                    {errors.copyrightDate &&
                      <div className="error"><p>{errors.copyrightDate}</p></div>}
                    <Form.Control type="input" name="copyrightDate" placeholder="1961" value={songData.copyrightDate} className="formInput" onChange={handleInputChange} />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group controlId="formSongSopPracticeSlow">
                <Row>
                  <Col sm={{ span: 8, offset: 2 }}>
                    <Form.Label>Soprano practice track(s), tempo di learno:</Form.Label><br />
                    <Form.Text className="subtitle" muted>Please comma-separate multiple URLs</Form.Text>
                    {errors.practiceTrackUrlsSopSlow &&
                      <div className="error"><p>{errors.practiceTrackUrlsSopSlow}</p></div>}
                    <Form.Control type="input" name="practiceTrackUrlsSopSlow" placeholder="http://link_to_slow_soprano_practice_tracks.com" value={songData.practiceTrackUrlsSopSlow} className="formInput" onChange={handleInputChange} />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group controlId="formSongAltoPracticeSlow">
                <Row>
                  <Col sm={{ span: 8, offset: 2 }}>
                    <Form.Label>Alto practice track(s), tempo di learno:</Form.Label><br />
                    <Form.Text className="subtitle" muted>Please comma-separate multiple URLs</Form.Text>
                    {errors.practiceTrackUrlsAltoSlow &&
                      <div className="error"><p>{errors.practiceTrackUrlsAltoSlow}</p></div>}
                    <Form.Control type="input" name="practiceTrackUrlsAltoSlow" placeholder="http://link_to_slow_alto_practice_tracks.com" value={songData.practiceTrackUrlsAltoSlow} className="formInput" onChange={handleInputChange} />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group controlId="formSongTenPracticeSlow">
                <Row>
                  <Col sm={{ span: 8, offset: 2 }}>
                    <Form.Label>Tenor practice track(s), tempo di learno:</Form.Label><br />
                    <Form.Text className="subtitle" muted>Please comma-separate multiple URLs</Form.Text>
                    {errors.practiceTrackUrlsTenSlow &&
                      <div className="error"><p>{errors.practiceTrackUrlsTenSlow}</p></div>}
                    <Form.Control type="input" name="practiceTrackUrlsTenSlow" placeholder="http://link_to_slow_tenor_practice_tracks.com" value={songData.practiceTrackUrlsTenSlow} className="formInput" onChange={handleInputChange} />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group controlId="formSongBassPracticeSlow">
                <Row>
                  <Col sm={{ span: 8, offset: 2 }}>
                    <Form.Label>Bass practice track(s), tempo di learno:</Form.Label><br />
                    <Form.Text className="subtitle" muted>Please comma-separate multiple URLs</Form.Text>
                    {errors.practiceTrackUrlsBassSlow &&
                      <div className="error"><p>{errors.practiceTrackUrlsBassSlow}</p></div>}
                    <Form.Control type="input" name="practiceTrackUrlsBassSlow" placeholder="http://link_to_slow_bass_practice_tracks.com" value={songData.practiceTrackUrlsBassSlow} className="formInput" onChange={handleInputChange} />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group controlId="formSongSopPracticeATempo">
                <Row>
                  <Col sm={{ span: 8, offset: 2 }}>
                    <Form.Label>Soprano practice track(s), performance tempo:</Form.Label><br />
                    <Form.Text className="subtitle" muted>Please comma-separate multiple URLs</Form.Text>
                    {errors.practiceTrackUrlsSopATempo &&
                      <div className="error"><p>{errors.practiceTrackUrlsSopATempo}</p></div>}
                    <Form.Control type="input" name="practiceTrackUrlsSopATempo" placeholder="http://link_to_performance_tempo_soprano_practice_tracks.com" value={songData.practiceTrackUrlsSopATempo} className="formInput" onChange={handleInputChange} />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group controlId="formSongAltoPracticeATempo">
                <Row>
                  <Col sm={{ span: 8, offset: 2 }}>
                    <Form.Label>Alto practice track(s), performance tempo:</Form.Label><br />
                    <Form.Text className="subtitle" muted>Please comma-separate multiple URLs</Form.Text>
                    {errors.practiceTrackUrlsAltoATempo &&
                      <div className="error"><p>{errors.practiceTrackUrlsAltoATempo}</p></div>}
                    <Form.Control type="input" name="practiceTrackUrlsAltoATempo" placeholder="http://link_to_performance_tempo_alto_practice_tracks.com" value={songData.practiceTrackUrlsAltoATempo} className="formInput" onChange={handleInputChange} />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group controlId="formSongTenPracticeATempo">
                <Row>
                  <Col sm={{ span: 8, offset: 2 }}>
                    <Form.Label>Tenor practice track(s), tempo di learno:</Form.Label><br />
                    <Form.Text className="subtitle" muted>Please comma-separate multiple URLs</Form.Text>
                    {errors.practiceTrackUrlsTenATempo &&
                      <div className="error"><p>{errors.practiceTrackUrlsTenATempo}</p></div>}
                    <Form.Control type="input" name="practiceTrackUrlsTenATempo" placeholder="http://link_to_performance_tempo_tenor_practice_tracks.com" value={songData.practiceTrackUrlsTenATempo} className="formInput" onChange={handleInputChange} />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group controlId="formSongBassPracticeATempo">
                <Row>
                  <Col sm={{ span: 8, offset: 2 }}>
                    <Form.Label>Bass practice track(s), tempo di learno:</Form.Label><br />
                    <Form.Text className="subtitle" muted>Please comma-separate multiple URLs</Form.Text>
                    {errors.practiceTrackUrlsBassATempo &&
                      <div className="error"><p>{errors.practiceTrackUrlsBassATempo}</p></div>}
                    <Form.Control type="input" name="practiceTrackUrlsBassATempo" placeholder="http://link_to_performance_tempo_bass_practice_tracks.com" value={songData.practiceTrackUrlsBassATempo} className="formInput" onChange={handleInputChange} />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group controlId="formSongVideoUrls">
                <Row>
                  <Col sm={{ span: 8, offset: 2 }}>
                    <Form.Label>Video links:</Form.Label><br />
                    <Form.Text className="subtitle" muted>Please comma-separate multiple URLs</Form.Text>
                    {errors.videoUrls &&
                      <div className="error"><p>{errors.videoUrls}</p></div>}
                    <Form.Control type="input" name="videoUrls" placeholder="http://some_youTube_video.com" value={songData.videoUrls} className="formInput" onChange={handleInputChange} />
                  </Col>
                </Row>
              </Form.Group>

              {Object.keys(params).length === 1 &&
                <Row>
                  <Col sm={{ span: 3, offset: 2 }}>
                    <Button data-toggle="popover" title="Submit" disabled={!(songData.title && songData.composer)} className="button formBtn" onClick={handleFormSubmit} type="submit">Submit Selection</Button>
                  </Col>
                  <Col sm={{ span: 3, offset: 1 }}>
                    <Button data-toggle="popover" title="AddMore" disabled={!(songData.title && songData.composer)} className="button formBtn" onClick={handleFormSubmit} type="submit">Add More Repertoire</Button>
                  </Col>
                </Row>}

              {Object.keys(params).length === 2 &&
                <Row>
                  <Col sm={{ span: 3, offset: 2 }}>
                    <Button data-toggle="popover" title="Update" disabled={!(songData.title && songData.composer)} className="button formBtn" onClick={handleFormUpdate} type="submit">Update Selection</Button>
                  </Col>
                  <Col sm={{ span: 3, offset: 1 }}>
                    <Button data-toggle="popover" title="AddMoreUpdate" disabled={!(songData.title && songData.composer)} className="button formBtn" onClick={handleFormUpdate} type="submit">Add More Repertoire</Button>
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

export default SongForm;