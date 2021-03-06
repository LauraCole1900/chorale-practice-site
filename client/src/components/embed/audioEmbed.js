import { useEffect, useRef, useState } from "react";
import { Button, Form, Row } from "react-bootstrap"
import PropTypes from "prop-types";

const AudioEmbed = ({ title, src, songId }) => {

  //=================//
  //   State & Ref   //
  //=================//

  const audioRef = useRef();
  const [pbr, setPbr] = useState(1.0);


  //=================//
  //     Methods     //
  //=================//

  // returns playbackRate to 1.0 on button click
  const normal = () => {
    setPbr(1.0)
  };

  // slows down playbackRate by increments of 5% on button click
  const slowDown = () => {
    let varPbr = pbr - .05;
    if (pbr <= .50) {
      varPbr = .50;
    }
    setPbr(varPbr);
  };

  // speeds up playbackRate by increments of 5% on button click
  const speedUp = () => {
    let varPbr = pbr + .05;
    if (pbr >= 2.00) {
      varPbr = 2.00;
    }
    setPbr(varPbr);
  };

  // sets playback rate from slider
  const handleSetPlayback = (e) => {
    setPbr(e.target.value);
  };


  //======================//
  //   Run on page load   //
  //======================//

  // sets initial playbackRate on page load
  useEffect(() => {
    audioRef.current.playbackRate = pbr
  }, [pbr]);


  return (
    <>
      <Row className="audio-responsive" >
        <audio
          src={process.env.PUBLIC_URL + src}
          title={title}
          type="audio/mp3"
          id={songId}
          ref={audioRef}
          controls
        />
      </Row>

      <Form>
        <Form.Group controlId="pbrSlider">
          <Row>
            <Form.Label className="pbrLabel">Playback Speed: {Math.round(pbr * 100)}%</Form.Label>
            <Form.Range onChange={handleSetPlayback} value={pbr} min="0.5" max="2.0" step="0.05" className="pbrSlider" variant="dark" />
          </Row>
        </Form.Group>
        <Row className="around">
          <Button className="pbrButton button" onClick={slowDown}>Slower</Button>
          <Button className="pbrButton button" onClick={normal}>Normal</Button>
          <Button className="pbrButton button" onClick={speedUp}>Faster</Button>
        </Row>
      </Form>
    </>
  )
};

AudioEmbed.propTypes = {
  src: PropTypes.string.isRequired
};

export default AudioEmbed;