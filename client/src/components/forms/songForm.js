import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_REPERTOIRE, EDIT_REPERTOIRE, QUERY_CURRENT_ID, QUERY_ME, QUERY_ONE_CONCERT } from "../../utils/gql";
import { songValidate } from "../../utils/validation";
import Auth from "../../utils/auth";
import { ErrorModal, SuccessModal } from "../modals";
import "./style.css";

const SongForm = () => {
  const currentUserId = Auth.getProfile().data?._id;
  const { concertId, songId } = useParams();
  const navigate = useNavigate();
  const [errThrown, setErrThrown] = useState();
  const [btnName, setBtnName] = useState();
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

  // Determines which page user is on, specifically for use with modals
  const urlArray = window.location.href.split("/")
  const urlId = urlArray[urlArray.length - 2]
  const urlType = urlArray[urlArray.length - 3]

  // Modal variables
  const [showErr, setShowErr] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Sets boolean to show or hide relevant modal
  const handleShowSuccess = () => setShowSuccess(true);
  const handleHideSuccess = () => setShowSuccess(false);
  const handleShowErr = () => setShowErr(true);
  const handleHideErr = () => setShowErr(false);

  const { loading: meLoading, data: meData, error: meError } = useQuery(
    currentUserId ? QUERY_CURRENT_ID : QUERY_ME,
    {
      variables: { id: currentUserId }
    });
  const { loading: concertLoading, data: concertData, error: concertError } = useQuery(QUERY_ONE_CONCERT,
    {
      variables: { id: concertId }
    });
  const [addRepertoire, { addRepertoireError, addRepertoireData }] = useMutation(ADD_REPERTOIRE);
  const [editRepertoire, { editRepertoireError, editRepertoireData }] = useMutation(EDIT_REPERTOIRE);

  const me = meData?.me || meData?.currentId || {};
  const concert = concertData?.oneConcert || {};

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
      console.log("Song submit", songData, concertId);
      try {
        const { data } = await addRepertoire({
          variables: { id: concertId, songs: { ...songData, concertOrder: parseInt(songData.concertOrder) } }
        });
        console.log({ data });
        handleShowSuccess();
        // navigate("/admin_portal");
      } catch (error) {
        console.log(JSON.stringify(error));
        setErrThrown(error.message);
        handleShowErr();
      }
      setSongData({
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
    // Validates required inputs
    const validationErrors = songValidate(songData);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);
    if (noErrors) {
      try {
        const { data } = await editRepertoire({
          variables: { id: concertId, songId: songId, songs: { ...songData, concertOrder: parseInt(songData.concertOrder) } }
        });
        console.log({ data });
        if (e.target.title === "Update") {
          handleShowSuccess();
          // navigate("/admin_portal");
        } else {
          navigate(`/repertoire/${concertId}`)
        }
      } catch (error) {
        console.log(JSON.stringify(error));
        setErrThrown(error.message);
        handleShowErr();
      }
      setSongData({
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
    if (urlType === "edit_repertoire" && Object.keys(concert).length) {
      const songToEdit = concert.songs.filter(song => song._id === songId);
      setSongData(songToEdit[0]);
    }
  }, [concert]);


  if (concertLoading || meLoading) {
    return <h1>Loading....</h1>
  };

  if (concertError || meError) {
    console.log(JSON.stringify(concertError, meError));
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
            {urlId === "repertoire"
              ? <h1>Add repertoire, practice tracks, and/or videos for "{concert.name}"</h1>
              : <h1>Edit information, practice tracks, and/or videos for "{songData.title}"</h1>}
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
                <Form.Control type="text" pattern="[0-9]*" inputMode="numeric" placeholder="42" max={25} name="concertOrder" value={songData.concertOrder} className="formInput" onChange={handleInputChange} />
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

          {!songId
            ? <Row>
              <Col sm={{ span: 3, offset: 2 }}>
                <Button data-toggle="popover" title="Submit" disabled={!(songData.title && songData.composer)} className="button formBtn" onClick={handleFormSubmit} type="submit">Submit Selection</Button>
              </Col>
            </Row>

            : <Row>
              <Col sm={{ span: 3, offset: 2 }}>
                <Button data-toggle="popover" title="Update" disabled={!(songData.title && songData.composer)} className="button formBtn" onClick={handleFormUpdate} type="submit">Update Selection</Button>
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

export default SongForm;