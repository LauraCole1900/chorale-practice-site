import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import dayjs from "dayjs";
import { timeToCurtain } from "../../utils/dateUtils";
import SongCard from "./songCard"
import "./style.css";

const TracksCard = ({ concert, section }) => {
  const [allSongs, setAllSongs] = useState(concert.songs);

  const formatDate = (dates) => {
    const formattedDate = dates.map(date => dayjs(date, "M-D-YYYY").format("dddd, MMM D, YYYY"));
    return formattedDate.length > 1 ? formattedDate.join(" & ") : formattedDate[0].toString();
  }

  const dates = formatDate(concert.date);
  const times = concert.time.length > 1 ? concert.time.join(" & ") : concert.time[0].toString();

  useEffect(() => {
    const filteredSongs = concert.songs.filter(song => song.concertOrder);
    const otherSongs = concert.songs.filter(song => !song.concertOrder);
    
    if (filteredSongs.length) {
      const sortedSongs = filteredSongs.sort((a, b) => a.concertOrder > b.concertOrder ? 1 : -1);
      setAllSongs([...sortedSongs, otherSongs].flat());
    }
  }, []);
  

  return (
    <>
      <Card className="tracksCard">
        <Card.Header className="tracksTitle">
          <h2>{concert.name}</h2>
          <p>{dates} | {times} | <span className="boldOutline">Countdown to curtain</span>: {timeToCurtain(concert.date[0], concert.time[0])}</p>
        </Card.Header>
        <Card.Body className="cardBody">
          {allSongs.map((song, i) => (
            <SongCard section={section} song={song} key={i} />
          ))}
        </Card.Body>
      </Card>
    </>
  )
}

export default TracksCard;