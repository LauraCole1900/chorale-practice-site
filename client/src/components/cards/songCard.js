import { Card } from "react-bootstrap";
import { AudioEmbed, VideoEmbed } from "../embed";
import "./style.css";


const SongCard = ({ section, song }) => {
  console.log({ song });

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
          {section === "soprano" && (song.practiceTrackUrlsSopSlow.length
            ? <>
              <p>Tempo di learno:</p>
              <ul>
                {song.practiceTrackUrlsSopSlow.map((track, i) => (
                  (song.practiceTrackTitlesSopSlow[i]
                    ? (song.practiceTrackTitlesSopSlow[i] === "Cyberbass"
                      ? <li key={i}><a href={track} target="_blank" rel="noreferrer noopener">{song.practiceTrackTitlesSopSlow[i]}</a></li>
                      : <>
                        <li key={i}><p>{song.practiceTrackTitlesSopSlow[i]}</p>
                          <AudioEmbed src={track} title={song.practiceTrackTitlesSopSlow[i]} /></li>
                      </>)
                    : <li key={i}><a href={track} target="_blank" rel="noreferrer noopener">Practice track {i + 1}</a></li>)))}
              </ul>
            </>
            : <>
              <p>No slow-tempo practice tracks found</p>
            </>)}
          {section === "soprano" && (song.practiceTrackUrlsSopATempo.length
            ? <>
              <p>Performance tempo:</p>
              <ul>
                {song.practiceTrackUrlsSopATempo.map((track, i) => (
                  (song.practiceTrackTitlesSopATempo[i]
                    ? (song.practiceTrackTitlesSopATempo[i] === "Cyberbass"
                      ? <li key={i}><a href={track} target="_blank" rel="noreferrer noopener">{song.practiceTrackTitlesSopATempo[i]}</a></li>
                      : <>
                        <li key={i}><p>{song.practiceTrackTitlesSopATempo[i]}</p>
                          <AudioEmbed src={track} title={song.practiceTrackTitlesSopATempo[i]} /></li>
                      </>)
                    : <li key={i}><a href={track} target="_blank" rel="noreferrer noopener">Practice track {i + 1}</a></li>)))}
              </ul>
            </>
            : <>
              <p>No a tempo practice tracks found</p>
            </>)}
          {section === "alto" && (song.practiceTrackUrlsAltoSlow.length
            ? <>
              <p>Tempo di learno:</p>
              <ul>
                {song.practiceTrackUrlsAltoSlow.map((track, i) => (
                  (song.practiceTrackTitlesAltoSlow[i]
                    ? (song.practiceTrackTitlesAltoSlow[i] === "Cyberbass"
                      ? <li key={i}><a href={track} target="_blank" rel="noreferrer noopener">{song.practiceTrackTitlesAltoSlow[i]}</a></li>
                      : <>
                        <li key={i}><p>{song.practiceTrackTitlesAltoSlow[i]}</p>
                          <AudioEmbed src={track} title={song.practiceTrackTitlesAltoSlow[i]} /></li>
                      </>)
                    : <li key={i}><a href={track} target="_blank" rel="noreferrer noopener">Practice track {i + 1}</a></li>)))}
              </ul>
            </>
            : <>
              <p>No slow-tempo practice tracks found</p>
            </>)}
          {section === "alto" && (song.practiceTrackUrlsAltoATempo.length
            ? <>
              <p>Performance tempo:</p>
              <ul>
                {song.practiceTrackUrlsAltoATempo.map((track, i) => (
                  (song.practiceTrackTitlesAltoATempo[i]
                    ? (song.practiceTrackTitlesAltoATempo[i] === "Cyberbass"
                      ? <li key={i}><a href={track} target="_blank" rel="noreferrer noopener">{song.practiceTrackTitlesAltoATempo[i]}</a></li>
                      : <>
                        <li key={i}><p>{song.practiceTrackTitlesAltoATempo[i]}</p>
                          <AudioEmbed src={track} title={song.practiceTrackTitlesAltoATempo[i]} /></li>
                      </>)
                    : <li key={i}><a href={track} target="_blank" rel="noreferrer noopener">Practice track {i + 1}</a></li>)))}
              </ul>
            </>
            : <>
              <p>No a tempo practice tracks found</p>
            </>)}
          {section === "tenor" && (song.practiceTrackUrlsTenSlow.length
            ? <>
              <p>Tempo di learno:</p>
              <ul>
                {song.practiceTrackUrlsTenSlow.map((track, i) => (
                  (song.practiceTrackTitlesTenSlow[i]
                    ? (song.practiceTrackTitlesTenSlow[i] === "Cyberbass"
                      ? <li key={i}><a href={track} target="_blank" rel="noreferrer noopener">{song.practiceTrackTitlesTenSlow[i]}</a></li>
                      : <>
                        <li key={i}><p>{song.practiceTrackTitlesTenSlow[i]}</p>
                          <AudioEmbed src={track} title={song.practiceTrackTitlesTenSlow[i]} /></li>
                      </>)
                    : <li key={i}><a href={track} target="_blank" rel="noreferrer noopener">Practice track {i + 1}</a></li>)))}
              </ul>
            </>
            : <>
              <p>No slow-tempo practice tracks found</p>
            </>)}
          {section === "tenor" && (song.practiceTrackUrlsTenATempo.length
            ? <>
              <p>Performance tempo:</p>
              <ul>
                {song.practiceTrackUrlsTenATempo.map((track, i) => (
                  (song.practiceTrackTitlesTenATempo[i]
                    ? (song.practiceTrackTitlesTenATempo[i] === "Cyberbass"
                      ? <li key={i}><a href={track} target="_blank" rel="noreferrer noopener">{song.practiceTrackTitlesTenATempo[i]}</a></li>
                      : <>
                        <li key={i}><p>{song.practiceTrackTitlesTenATempo[i]}</p>
                          <AudioEmbed src={track} title={song.practiceTrackTitlesTenATempo[i]} /></li>
                      </>)
                    : <li key={i}><a href={track} target="_blank" rel="noreferrer noopener">Practice track {i + 1}</a></li>)))}
              </ul>
            </>
            : <>
              <p>No a tempo practice tracks found</p>
            </>)}
          {section === "bass" && (song.practiceTrackUrlsBassSlow.length
            ? <>
              <p>Tempo di learno:</p>
              <ul>
                {song.practiceTrackUrlsBassSlow.map((track, i) => (
                  (song.practiceTrackTitlesBassSlow[i]
                    ? (song.practiceTrackTitlesBassSlow[i] === "Cyberbass"
                      ? <li key={i}><a href={track} target="_blank" rel="noreferrer noopener">{song.practiceTrackTitlesBassSlow[i]}</a></li>
                      : <>
                        <li key={i}><p>{song.practiceTrackTitlesBassSlow[i]}</p>
                          <AudioEmbed src={track} title={song.practiceTrackTitlesBassSlow[i]} /></li>
                      </>)
                    : <li key={i}><a href={track} target="_blank" rel="noreferrer noopener">Practice track {i + 1}</a></li>)))}
              </ul>
            </>
            : <>
              <p>No slow-tempo practice tracks found</p>
            </>)}
          {section === "bass" && (song.practiceTrackUrlsBassATempo.length
            ? <>
              <p>Performance tempo:</p>
              <ul>
                {song.practiceTrackUrlsBassATempo.map((track, i) => (
                  (song.practiceTrackTitlesBassATempo[i]
                    ? (song.practiceTrackTitlesBassATempo[i] === "Cyberbass"
                      ? <li key={i}><a href={track} target="_blank" rel="noreferrer noopener">{song.practiceTrackTitlesBassATempo[i]}</a></li>
                      : <>
                        <li key={i}><p>{song.practiceTrackTitlesBassATempo[i]}</p>
                          <AudioEmbed src={track} title={song.practiceTrackTitlesBassATempo[i]} /></li>
                      </>)
                    : <li key={i}><a href={track} target="_blank" rel="noreferrer noopener">Practice track {i + 1}</a></li>)))}
              </ul>
            </>
            : <>
              <p>No a tempo practice tracks found</p>
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