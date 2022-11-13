import { useEffect, useRef, useState } from "react";
import { Button, Form, Row } from "react-bootstrap"
import PropTypes from "prop-types";

const AudioEmbed = ({ title, src, songId, tracker, length, setPlistIdx }) => {

  //=================//
  //   State & Ref   //
  //=================//

  const audioRef = useRef();
  const [pbr, setPbr] = useState(1.0);


  //=================//
  //     Methods     //
  //=================//

  // sets playback rate
  const handleSetRate = (e) => {
    let varPbr = 1;
    if (e.target.value === "slow") {
      varPbr = pbr - .05;
      if (pbr <= .50) {
        varPbr = .50;
      }
    } else if (e.target.value === "fast") {
      varPbr = pbr + .05;
      if (pbr >= 2.00) {
        varPbr = 2.00;
      }
    } else {
      varPbr = 1.00;
    }
    setPbr(varPbr);
  };

  // sets playback rate from slider
  const handleSetPlayback = (e) => {
    setPbr(e.target.value);
  };

  if (setPlistIdx) {
    console.log(audioRef);
    if (audioRef.current?.currentTime === audioRef.current?.duration && tracker < length) {
      tracker = tracker++;
      console.log({ tracker });
      setPlistIdx(tracker);
    } else if (audioRef.current?.currentTime === audioRef.current?.duration && tracker === length) {
      tracker = 0;
      console.log({ tracker });
      setPlistIdx(tracker);
    }
  }


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
        {parseInt(tracker) === 0 &&
          <audio controls ref={audioRef} playbackRate={pbr}>
            <source src={process.env.PUBLIC_URL + src}
              title={title}
              type="audio/mp3"
              id={songId} />
          </audio>}
        {parseInt(tracker) > 0 &&
          <audio controls ref={audioRef} playbackRate={pbr}>
            <source src={process.env.PUBLIC_URL + src}
              title={title}
              type="audio/mp3"
              id={songId}/>
          </audio>}
      </Row>

      <Form>
        <Form.Group controlId="pbrSlider">
          <Row>
            <Form.Label className="pbrLabel">Playback Speed: {Math.round(pbr * 100)}%</Form.Label>
            <Form.Range onChange={handleSetPlayback} value={pbr} min="0.5" max="2.0" step="0.05" className="pbrSlider" variant="dark" />
          </Row>
        </Form.Group>
        <Row className="around">
          <Button className="pbrButton button" value="slow" onClick={handleSetRate}>Slower</Button>
          <Button className="pbrButton button" value="normal" onClick={handleSetRate}>Normal</Button>
          <Button className="pbrButton button" value="fast" onClick={handleSetRate}>Faster</Button>
        </Row>
      </Form>
    </>
  )
};

AudioEmbed.propTypes = {
  src: PropTypes.string.isRequired
};

export default AudioEmbed;