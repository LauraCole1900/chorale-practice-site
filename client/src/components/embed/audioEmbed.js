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

  // returns playbackRate to 1.0
  const normal = () => {
    setPbr(1.0)
  }

  // slows down playbackRate by increments of 5%
  const slowDown = () => {
    let varPbr = pbr - .05;
    if (pbr <= .50) {
      varPbr = .50;
    }
    setPbr(varPbr);
  }

  // speeds up playbackRate by increments of 5%
  const speedUp = () => {
    let varPbr = pbr + .05;
    if (pbr >= 2.00) {
      varPbr = 2.00;
    }
    setPbr(varPbr);
  }


  //======================//
  //   Run on page load   //
  //======================//

  // sets initial playbackRate on page load
  useEffect(() => {
    audioRef.current.playbackRate = pbr
  }, [pbr])


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

      <Row className="around">
        <Button className="pbrButton button" onClick={slowDown}>Slower</Button>
        <Button className="pbrButton button" onClick={normal}>Normal</Button>
        <Button className="pbrButton button" onClick={speedUp}>Faster</Button>
      </Row>
    </>
  )
};

AudioEmbed.propTypes = {
  src: PropTypes.string.isRequired
};

export default AudioEmbed;