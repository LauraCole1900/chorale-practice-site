import { useRef } from "react";
import { Button, Row } from "react-bootstrap"
import PropTypes from "prop-types";

const AudioEmbed = ({ title, src, songId }) => {
  const audioRef = useRef(songId);
  console.log(audioRef.current)
  let PBR = audioRef.current.playbackRate;


  const normal = () => {

  }

  const slowDown = () => {
    PBR = PBR - .05;
    if (PBR < .50) PBR = .50;
    // audioRef.playbackRate = PBR;
  }

  const speedUp = () => {

  }


  return (
    <>
      <Row className="audio-responsive" >
        <audio
          src={src}
          title={title}
          type="audio/mp3"
          id={songId}
          ref={audioRef}
          controls
        />
      </Row>

      <Row className="around">
        <Button className="pbrButton button" onClick={slowDown()}>Slower</Button>
        <Button className="pbrButton button" onClick={normal()}>Normal</Button>
        <Button className="pbrButton button" onClick={speedUp()}>Faster</Button>
      </Row>
    </>
  )
};

AudioEmbed.propTypes = {
  src: PropTypes.string.isRequired
};

export default AudioEmbed;