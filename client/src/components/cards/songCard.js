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
            <p>{song.practiceTrackUrlSop}</p>}
          {section === "alto" && song.practiceTrackUrlAlto &&
            <p>{song.practiceTrackUrlAlto}</p>}
          {section === "tenor" && song.practiceTrackUrlTen &&
            <p>{song.practiceTrackUrlTen}</p>}
          {section === "bass" && song.practiceTrackUrlBass &&
            <p>{song.practiceTrackUrlBass}</p>}
          {!song.practiceTrackUrlSop && !song.practiceTrackUrlAlto && !song.practiceTrackUrlTen && !song.practiceTrackUrlBass &&
            <p>No practice tracks available at this time</p>}
        </Card.Body>
      </Card>
    </>
  )
}

export default SongCard;