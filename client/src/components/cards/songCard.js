import { Card } from "react-bootstrap";
import { AudioEmbed, VideoEmbed } from "../embed";
import "./style.css";


const SongCard = ({ section, song }) => {

  // If there's more than one composer, join their names into a single string
  // If there's only one composer, convert the array to a string
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
              <p>Practice tracks:</p>
              <ul>
                {song.practiceTrackUrlsSop.map((track, i) => (
                  (song.practiceTrackTitlesSop[i]
                    ? (song.practiceTrackTitlesSop[i] === "Cyberbass"
                      ? <li key={i}><a href={track} target="_blank" rel="noreferrer noopener">{song.practiceTrackTitlesSop[i]}</a></li>
                      : <>
                        <li key={i}><p>{song.practiceTrackTitlesSop[i]}</p>
                          <AudioEmbed src={track} title={song.practiceTrackTitlesSop[i]} /></li>
                      </>)
                    : <li key={i}><a href={track} target="_blank" rel="noreferrer noopener">Practice track {i + 1}</a></li>)))}
              </ul>
            </>
            : <>
              <p>No practice tracks found</p>
            </>)}

          {section === "alto" && (song.practiceTrackUrlsAlto.length
            ? <>
              <p>Practice tracks:</p>
              <ul>
                {song.practiceTrackUrlsAlto.map((track, i) => (
                  (song.practiceTrackTitlesAlto[i]
                    ? (song.practiceTrackTitlesAlto[i] === "Cyberbass"
                      ? <li key={i}><a href={track} target="_blank" rel="noreferrer noopener">{song.practiceTrackTitlesAlto[i]}</a></li>
                      : <>
                        <li key={i}><p><a href={track} target="_blank" rel="noreferrer noopener">{song.practiceTrackTitlesAlto[i]}</a></p>
                          <AudioEmbed src={track} title={song.practiceTrackTitlesAlto[i]} /></li>
                      </>)
                    : <li key={i}><a href={track} target="_blank" rel="noreferrer noopener">Practice track {i + 1}</a></li>)))}
              </ul>
            </>
            : <>
              <p>No practice tracks found</p>
            </>)}

          {section === "tenor" && (song.practiceTrackUrlsTen.length
            ? <>
              <p>Practice tracks:</p>
              <ul>
                {song.practiceTrackUrlsTen.map((track, i) => (
                  (song.practiceTrackTitlesTen[i]
                    ? (song.practiceTrackTitlesTen[i] === "Cyberbass"
                      ? <li key={i}><a href={track} target="_blank" rel="noreferrer noopener">{song.practiceTrackTitlesTen[i]}</a></li>
                      : <>
                        <li key={i}><p>{song.practiceTrackTitlesTen[i]}</p>
                          <AudioEmbed src={track} title={song.practiceTrackTitlesTen[i]} /></li>
                      </>)
                    : <li key={i}><a href={track} target="_blank" rel="noreferrer noopener">Practice track {i + 1}</a></li>)))}
              </ul>
            </>
            : <>
              <p>No practice tracks found</p>
            </>)}

          {section === "bass" && (song.practiceTrackUrlsBass.length
            ? <>
              <p>Practice tracks:</p>
              <ul>
                {song.practiceTrackUrlsBass.map((track, i) => (
                  (song.practiceTrackTitlesBass[i]
                    ? (song.practiceTrackTitlesBass[i] === "Cyberbass"
                      ? <li key={i}><a href={track} target="_blank" rel="noreferrer noopener">{song.practiceTrackTitlesBass[i]}</a></li>
                      : <>
                        <li key={i}><p>{song.practiceTrackTitlesBass[i]}</p>
                          <AudioEmbed src={track} title={song.practiceTrackTitlesBass[i]} /></li>
                      </>)
                    : <li key={i}><a href={track} target="_blank" rel="noreferrer noopener">Practice track {i + 1}</a></li>)))}
              </ul>
            </>
            : <>
              <p>No practice tracks found</p>
            </>)}
          {song.videoUrls.length
            ? <>
              <p>Video(s):</p>
              {song.videoUrls.map((video, i) => (
                <VideoEmbed src={video} key={i} />
              ))}
            </>
            : <>
              <p>No videos found</p>
            </>}
        </Card.Body>
      </Card>
    </>
  )
}

export default SongCard;