import { Card } from "react-bootstrap";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import "./style.css";

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

const ConcertCard = ({ concert }) => {
  const formatDate = (dates) => {
    const formattedDate = dates.map(date => dayjs(date, "M-D-YYYY").format("dddd, MMM D, YYYY"));
    return formattedDate.length > 1 ? formattedDate.join(" & ") : formattedDate[0].toString();
  }

  const formatTime = (time) => {
    let formattedTime = "";
    const timeArr = time.split(" ");
    const filteredArr = timeArr.filter(time => (time.includes(":") || time.includes("am") || time.includes("pm")));
    if (filteredArr.length) {
      const splitFiltered = filteredArr.map(time => time.split("-")).flat();
      const addMins = splitFiltered.map(time => time.indexOf(":") === -1 ? (time.indexOf("m") > -1 || time.indexOf("M") > -1 ? `${time.slice(0, -2)}:00${time.slice(-2)}` : `${time}:00`) : time);
      const findMeridiem = addMins.map(time => time.slice(-2));
      if (!["am", "pm"].includes(findMeridiem[0])) {
        formattedTime = `${addMins[0]}${findMeridiem[1]}`
      } else {
        formattedTime = addMins[0];
      }
    }
    return formattedTime;
  };

  const howLong = (date, time) => {
    const formattedTime = formatTime(time);
    const dayjsDate = dayjs(`${date} ${formattedTime}`, "M-D-YYYY h:mma");
    const counter = dayjs(dayjsDate, "M-D-YYYY h:mm a").fromNow();
    return counter;
  }

  const dates = formatDate(concert.date);
  const times = concert.time.length > 1 ? concert.time.join(" & ") : concert.time[0].toString();
  const venues = concert.venue.length > 1 ? concert.venue.join(" & ") : concert.venue[0].toString();

  const capsCase = (str) => {
    const wordsArr = str.split(" ");
    const capsArr = wordsArr.map(word => word[0].toUpperCase() + word.substring(1));
    const casedStr = capsArr.join(" ");
    return casedStr;
  }


  return (
    <>
      <Card className="concertCard">
        <Card.Header className="concertTitle">
          <h3>{concert.name}</h3>
        </Card.Header>
        <Card.Body className="concertBody">
          {dates.includes("&")
            ? <p><span className="bold">Dates:</span> {dates}</p>
            : <p><span className="bold">Date:</span> {dates}</p>}
          {times.includes("&")
            ? <p><span className="bold">Times:</span> {capsCase(times)}</p>
            : <p><span className="bold">Time:</span> {capsCase(times)}</p>}
          {(times.includes("am") || times.includes("pm"))
            ? <p><span className="bold">Countdown to curtain:</span> {howLong(concert.date[0], concert.time[0])}</p>
            : <></>}
          {venues.includes("&")
            ? <p><span className="bold">Locations:</span> {venues}</p>
            : <p><span className="bold">Location:</span> {venues}</p>}
          {concert.signUp
            ? <p><a href={concert.signUp} target="_blank" rel="noreferrer noopener">Sign Up Here</a></p>
            : <></>}
        </Card.Body>
      </Card>
    </>
  )
}


export default ConcertCard;