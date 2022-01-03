import { Card } from "react-bootstrap";
import "./style.css"

const SongCard = ({ section, song }) => {
  console.log({ song })
  const composers = song.composer.length > 1 ? song.composer.join(" & ") : song.composer[0].toString();


  return (
    <>
      <Card className="songCard">
        <Card.Header className="songTitle">
          <h3>{song.title}</h3>
          <p>{composers}</p>
        </Card.Header>
        <Card.Body className="songBody">
          {section === "soprano" && (song.practiceTrackUrlsSop.length
            ? <>
              {song.practiceTrackUrlsSop.map(track => (
                <p>{track}</p>))}
            </>
            : <>
              <p>No practice tracks available at this time</p>
            </>)}
          {section === "alto" && (song.practiceTrackUrlsAlto.length
            ? <>
              {song.practiceTrackUrlsAlto.map(track => (
                <p>{track}</p>))}
            </>
            : <>
              <p>No practice tracks available at this time</p>
            </>)}
          {section === "tenor" && (song.practiceTrackUrlsTen.length
            ? <>
              {song.practiceTrackUrlsTen.map(track => (
                <p>{track}</p>))}
            </>
            : <>
              <p>No practice tracks available at this time</p>
            </>)}
          {section === "bass" && (song.practiceTrackUrlsBass.length
            ? <>
              {song.practiceTrackUrlsSop.map(track => (
                <p>{track}</p>))}
            </>
            : <>
              <p>No practice tracks available at this time</p>
            </>)}
          {song.videoUrls.length
            ? <>
              {song.videoUrls.map(video => (
                <p>{video}</p>))}
            </>
            : <>
              <p>No video links available at this time</p>
            </>}
        </Card.Body>
      </Card>
    </>
  )
}

export default SongCard;