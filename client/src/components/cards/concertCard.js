import { Card } from "react-bootstrap";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import "./style.css";

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

const ConcertCard = ({ concert }) => {
  const formatDate = (dates) => {
    const formattedDate = dates.map(date => dayjs(date, "MM-DD-YYYY").format("dddd, MMM D, YYYY"));
    return formattedDate.length > 1 ? formattedDate.join(" & ") : formattedDate[0].toString();
  }

  const formatTime = (time) => {
    let formattedTime = "";
    const timeArr = time.split(" ");
    const filteredArr = timeArr.filter(time => (time.includes(":") || time.includes("am") || time.includes("pm") || time.includes("AM") || time.includes("PM")));
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
    console.log({ formattedTime });
    const dayjsDate = dayjs(`${date} ${formattedTime}`, "MM-DD-YYYY h:mma");
    console.log({ dayjsDate });
    const counter = dayjs(dayjsDate, "MM-DD-YYYY h:mm a").fromNow();
    console.log(counter);
    return counter;
  }

  const dates = formatDate(concert.date);
  const times = concert.time.length > 1 ? concert.time.join(" & ") : concert.time[0].toString();
  const venues = concert.venue.length > 1 ? concert.venue.join(" & ") : concert.venue[0].toString();


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
            ? <p><span className="bold">Times:</span> {times}</p>
            : <p><span className="bold">Time:</span> {times}</p>}
          {times.includes(":")
            ? <p><span className="bold">Countdown to curtain:</span> {howLong(concert.date[0], concert.time[0])}</p>
            : <></>}
          {venues.includes("&")
            ? <p><span className="bold">Locations:</span> {venues}</p>
            : <p><span className="bold">Location:</span> {venues}</p>}
          {concert.signUp
            ? <p><a href={concert.signUp}>Sign Up Here</a></p>
            : <></>}
        </Card.Body>
      </Card>
    </>
  )
}


export default ConcertCard;