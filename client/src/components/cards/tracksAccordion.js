import { useEffect, useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import dayjs from "dayjs";
import { timeToCurtain } from "../../utils/dateUtils";
import SongCard from "./songCard";
import "./style.css";


const TracksAccordion = ({ concert, i, section, user }) => {

  let truncSect = "";
  if (section === "soprano" || section === "tenor") {
    const truncated = section.slice(0, 3);
    truncSect = `${truncated.charAt(0).toUpperCase()}${truncated.slice(1)}`;
  } else if (section === "alto" || section === "bass") {
    truncSect = `${section.charAt(0).toUpperCase()}${section.slice(1)}`;
  };


  //=====================//
  //   State variables   //
  //=====================//
  const [allSongs, setAllSongs] = useState(concert.songs);
  const [playlist, setPlaylist] = useState([]);


  //=====================//
  //       Methods       //
  //=====================//

  // Format the date
  const formatDate = (dates) => {
    const formattedDate = dates.map(date => dayjs(date, "M-D-YYYY").format("dddd, MMM D, YYYY"));
    return formattedDate.length > 1 ? formattedDate.join(" & ") : formattedDate[0].toString();
  }

  // Handles click on "play full playlist" button
  const handlePlaylistPlay = (e) => {
    const { value } = e.target;
    console.log({ playlist });
  };

  // Handles click on "pause full playlist" button
  const handlePlaylistPause = (e) => {
    const { value } = e.target;
    JSON.parse(value) ? setPlaylist(false) : setPlaylist(true);
  };

  // Handles click on "stop full playlist" button
  const handlePlaylistStop = (e) => {
    const { value } = e.target;
    JSON.parse(value) ? setPlaylist(false) : setPlaylist(true);
  };


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
      const trackUrls = sortedSongs.map(song => song[`practiceTrackUrls${truncSect}`]);
      const flattenedUrls = trackUrls.flat();
      const filteredUrls = flattenedUrls.filter(url => !url.includes("cyberbass"));
      setPlaylist(filteredUrls);
    }


  }, [concert.songs, section]);


  return (
    <>
      <Accordion.Item eventKey={i} className="tracksCard">
        <Accordion.Header className="tracksTitle">
          <h2>{concert.name}</h2>
          <p>{dates} | {times} | <span className="boldOutline">Countdown to curtain</span>: {timeToCurtain(concert.date[0], concert.time[0])}</p>
        </Accordion.Header>
        <Accordion.Body className="cardBody">
          {allSongs.length > 0 &&
            <>
              
            </>
          }
          {concert.addlMaterials?.length > 0 &&
            concert.addlMaterials.map((item, i) => (
              <h4 key={i}>Supplemental materials: <a href={item} target="_blank" rel="noreferrer noopener">Supplement {i + 1}</a></h4>
            ))}
          {allSongs.map((song, i) => (
            <SongCard section={section} song={song} key={i} />
          ))}
        </Accordion.Body>
      </Accordion.Item>
    </>
  )
}

export default TracksAccordion;