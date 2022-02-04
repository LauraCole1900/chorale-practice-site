import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import dayjs from "dayjs";
import { timeToCurtain } from "../../utils/dateUtils";
import SongCard from "./songCard"
import "./style.css";

const TracksCard = ({ concert, section }) => {

  //=====================//
  //   State variables   //
  //=====================//
  const [allSongs, setAllSongs] = useState(concert.songs);


  //=====================//
  //      Functions      //
  //=====================//

  // Format the date
  const formatDate = (dates) => {
    const formattedDate = dates.map(date => dayjs(date, "M-D-YYYY").format("dddd, MMM D, YYYY"));
    return formattedDate.length > 1 ? formattedDate.join(" & ") : formattedDate[0].toString();
  }


  //=====================//
  //  Variables storing  //
  //    dates & times    //
  //=====================//
  const dates = formatDate(concert.date);
  const times = concert.time.length > 1 ? concert.time.join(" & ") : concert.time[0].toString();


  //=====================//
  //   Run on page load  //
  //=====================//
  useEffect(() => {
    // Filter by which songs have an assigned concert order
    const filteredSongs = concert.songs.filter(song => song.concertOrder);
    
    // Filter by which songs do NOT have an assigned concert order
    const otherSongs = concert.songs.filter(song => !song.concertOrder);

    // If there are songs with assigned concert order, sort them into concert order,
    // then add all other songs in the concert to the resulting array
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
          {concert.addlMaterials?.length > 0 &&
            concert.addlMaterials.map((item, i) => (
              <h4 key={i}>Supplemental materials: <a href={item} target="_blank" rel="noreferrer noopener">Supplement {i + 1}</a></h4>
            ))}
          {allSongs.map((song, i) => (
            <SongCard section={section} song={song} key={i} />
          ))}
        </Card.Body>
      </Card>
    </>
  )
}

export default TracksCard;