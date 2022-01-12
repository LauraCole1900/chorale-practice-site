import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import SongCard from "./songCard"
import "./style.css";

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

const TracksCard = ({ concert, section }) => {
  const [allSongs, setAllSongs] = useState(concert.songs);

  const formatDate = (dates) => {
    const formattedDate = dates.map(date => dayjs(date, "MM-DD-YYYY").format("dddd, MMM D, YYYY"));
    return formattedDate.length > 1 ? formattedDate.join(" & ") : formattedDate[0].toString();
  }

  const dates = formatDate(concert.date);
  const times = concert.time.length > 1 ? concert.time.join(" & ") : concert.time[0].toString();

  const formatTime = (time) => {
    let formattedTime = "";
    const timeArr = time.split(" ");
    const filteredArr = timeArr.filter(time => (time.includes(":") || time.includes("am") || time.includes("pm")));
    if (filteredArr.length) {
      const splitFiltered = filteredArr.map(time => time.split("-")).flat();
      const addMins = splitFiltered.map(time => time.indexOf(":") === -1 ? (time.indexOf("m") > -1 || time.indexOf("M") > -1 ? `${time.slice(0, -2)}:00${time.slice(-2)}` : `${time}:00`) : time);
      const findMeridiem = addMins.map(time => time.slice(-2));
      if (!["am", "pm", "AM", "PM"].includes(findMeridiem[0])) {
        formattedTime = `${addMins[0]}${findMeridiem[1]}`
      } else {
        formattedTime = addMins[0];
      }
    }
    return formattedTime;
  };

  const howLong = (date, time) => {
    const formattedTime = formatTime(time);
    const dayjsDate = dayjs(`${date} ${formattedTime}`, "MM-DD-YYYY h:mma");
    const counter = dayjs(dayjsDate, "MM-DD-YYYY h:mm a").fromNow();
    return counter;
  }

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
          <p>{dates} | {times} | <span className="boldOutline">Countdown to curtain</span>: {howLong(concert.date[0], concert.time[0])}</p>
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