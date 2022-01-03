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
            song.practiceTrackUrlsSop.map(track => (
              <p>{track}</p>))}
          {section === "alto" && song.practiceTrackUrlAlto &&
            song.practiceTrackUrlsAlto.map(track => (
              <p>{track}</p>))}
          {section === "tenor" && song.practiceTrackUrlTen &&
            song.practiceTrackUrlsTen.map(track => (
              <p>{track}</p>))}
          {section === "bass" && song.practiceTrackUrlBass &&
            song.practiceTrackUrlsBass.map(track => (
              <p>{track}</p>))}
          {!song.practiceTrackUrlSop && !song.practiceTrackUrlAlto && !song.practiceTrackUrlTen && !song.practiceTrackUrlBass &&
            <p>No practice tracks available at this time</p>}
          {song.videoUrls &&
            song.videoUrls.map(video => (
            <p>{video}</p>))}
          {!song.videoUrls &&
            <p>No video links available at this time</p>}
        </Card.Body>
      </Card>
    </>
  )
}

export default SongCard;