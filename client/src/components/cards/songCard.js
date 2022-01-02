import { Card } from "react-bootstrap";
import "./style.css"

const SongCard = ({ section, song }) => {
  const composers = song.composer.length > 1 ? song.composer.join(" & ") : song.composer[0].toString();


  return (
    <>
      <Card className="songCard">
        <Card.Header className="songHeader">
          <h3>{song.title}</h3>
          <p>{composers}</p>
        </Card.Header>
        <Card.Body className="songBody">
          {section === "soprano" && song.practiceTrackUrlSop &&
            song.practiceTrackUrlSop.map(track => (
              <p>{track}</p>))}
          {section === "alto" && song.practiceTrackUrlAlto &&
            song.practiceTrackUrlAlto.map(track => (
              <p>{track}</p>))}
          {section === "tenor" && song.practiceTrackUrlTen &&
            song.practiceTrackUrlTen.map(track => (
              <p>{track}</p>))}
          {section === "bass" && song.practiceTrackUrlBass &&
            song.practiceTrackUrlBass.map(track => (
              <p>{track}</p>))}
          {!song.practiceTrackUrlSop && !song.practiceTrackUrlAlto && !song.practiceTrackUrlTen && !song.practiceTrackUrlBass &&
            <p>No practice tracks available at this time</p>}
          {song.videoUrl1 &&
            <p>{song.videoUrl1}</p>}
          {song.videoUrl2 &&
            <p>{song.videoUrl2}</p>}
          {song.videoUrl3 &&
            <p>{song.videoUrl3}</p>}
          {!song.videoUrl1 && !song.videoUrl2 && !song.videoUrl3 &&
            <p>No video links available at this time</p>}
        </Card.Body>
      </Card>
    </>
  )
}

export default SongCard;