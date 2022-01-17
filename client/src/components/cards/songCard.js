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
          {section === "soprano" && (song.practiceTrackUrlsSopSlow.length
            ? <>
              {song.practiceTrackUrlsSopSlow.map((track, i) => (
                <p key={i}>Tempo di learno: <a href={track} target="_blank" rel="noreferrer noopener">Practice track {i + 1}</a></p>))}
            </>
            : <>
              <p>No slow-tempo practice tracks found</p>
            </>)}
          {section === "soprano" && (song.practiceTrackUrlsSopATempo.length
            ? <>
              {song.practiceTrackUrlsSopATempo.map((track, i) => (
                <p key={i}>Performance tempo: <a href={track} target="_blank" rel="noreferrer noopener">Practice track {i + 1}</a></p>))}
            </>
            : <>
              <p>No a tempo practice tracks found</p>
            </>)}
          {section === "alto" && (song.practiceTrackUrlsAltoSlow.length
            ? <>
              {song.practiceTrackUrlsAltoSlow.map((track, i) => (
                <p key={i}>Tempo di learno: <a href={track} target="_blank" rel="noreferrer noopener">Practice track {i + 1}</a></p>))}
            </>
            : <>
              <p>No slow-tempo practice tracks found</p>
            </>)}
          {section === "alto" && (song.practiceTrackUrlsAltoATempo.length
            ? <>
              {song.practiceTrackUrlsAltoATempo.map((track, i) => (
                <p key={i}>Performance tempo: <a href={track} target="_blank" rel="noreferrer noopener">Practice track {i + 1}</a></p>))}
            </>
            : <>
              <p>No a tempo practice tracks found</p>
            </>)}
          {section === "tenor" && (song.practiceTrackUrlsTenSlow.length
            ? <>
              {song.practiceTrackUrlsTenSlow.map((track, i) => (
                <p key={i}>Tempo di learno: <a href={track} target="_blank" rel="noreferrer noopener">Practice track {i + 1}</a></p>))}
            </>
            : <>
              <p>No slow-tempo practice tracks found</p>
            </>)}
          {section === "tenor" && (song.practiceTrackUrlsTenATempo.length
            ? <>
              {song.practiceTrackUrlsTenATempo.map((track, i) => (
                <p key={i}>Performance tempo: <a href={track} target="_blank" rel="noreferrer noopener">Practice track {i + 1}</a></p>))}
            </>
            : <>
              <p>No a tempo practice tracks found</p>
            </>)}
          {section === "bass" && (song.practiceTrackUrlsBassSlow.length
            ? <>
              {song.practiceTrackUrlsBassSlow.map((track, i) => (
                <p key={i}>Tempo di learno: <a href={track} target="_blank" rel="noreferrer noopener">Practice track {i + 1}</a></p>))}
            </>
            : <>
              <p>No slow-tempo practice tracks found</p>
            </>)}
          {section === "bass" && (song.practiceTrackUrlsBassATempo.length
            ? <>
              {song.practiceTrackUrlsBassATempo.map((track, i) => (
                <p key={i}>Performance tempo: <a href={track} target="_blank" rel="noreferrer noopener">Practice track {i + 1}</a></p>))}
            </>
            : <>
              <p>No a tempo practice tracks found</p>
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