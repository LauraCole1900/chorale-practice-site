import { Card } from "react-bootstrap";
import dayjs from "dayjs";
import SongCard from "./songCard"
import "./style.css";

const TracksCard = ({ concert, section }) => {
  let songs;
  const formatDate = (dates) => {
    const formattedDate = dates.map(date => dayjs(date, "MM-DD-YYYY").format("dddd, MMM D, YYYY"));
    return formattedDate.length > 1 ? formattedDate.join(" & ") : formattedDate[0].toString();
  }

  const dates = formatDate(concert.date);
  const times = concert.time.length > 1 ? concert.time.join(" & ") : concert.time[0].toString();
  if (concert.songs.concertOrder) {
    songs = concert.songs.sort((a,b) => a.concertOrder > b.concertOrder);
  }

  return (
    <>
      <Card className="tracksCard">
        <Card.Header className="tracksTitle">
          <h2>{concert.name}</h2>
          <p>{dates} | {times}</p>
        </Card.Header>
        <Card.Body className="cardBody">
          {songs.map(song => (
            <SongCard section={section} song={song} />
          ))}
          <p>Cards for each selection, containing practice track & video URLs, go here</p>
        </Card.Body>
      </Card>
    </>
  )
}

export default TracksCard;