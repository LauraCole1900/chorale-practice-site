import { Card } from "react-bootstrap";
import "./style.css"

const SongCard = ({ section, song }) => {
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
              {song.practiceTrackUrlsSop.map((track, i)=> (
                <p key={i}><a href={track} target="_blank" rel="noreferrer noopener">Practice track {i + 1}</a></p>))}
            </>
            : <>
              <p>No practice tracks found</p>
            </>)}
          {section === "alto" && (song.practiceTrackUrlsAlto.length
            ? <>
              {song.practiceTrackUrlsAlto.map((track, i) => (
                <p key={i}><a href={track} target="_blank" rel="noreferrer noopener">Practice track {i + 1}</a></p>))}
            </>
            : <>
              <p>No practice tracks found</p>
            </>)}
          {section === "tenor" && (song.practiceTrackUrlsTen.length
            ? <>
              {song.practiceTrackUrlsTen.map((track, i) => (
                <p key={i}><a href={track} target="_blank" rel="noreferrer noopener">Practice track {i + 1}</a></p>))}
            </>
            : <>
              <p>No practice tracks found</p>
            </>)}
          {section === "bass" && (song.practiceTrackUrlsBass.length
            ? <>
              {song.practiceTrackUrlsSop.map((track, i) => (
                <p key={i}><a href={track} target="_blank" rel="noreferrer noopener">Practice track {i + 1}</a></p>))}
            </>
            : <>
              <p>No practice tracks found</p>
            </>)}
          {song.videoUrls.length
            ? <>
              {song.videoUrls.map((video, i) => (
                <p key={i}><a href={video} target="_blank" rel="noreferrer noopener">Video {i + 1}</a></p>))}
            </>
            : <>
              <p>No video links found</p>
            </>}
        </Card.Body>
      </Card>
    </>
  )
}

export default SongCard;