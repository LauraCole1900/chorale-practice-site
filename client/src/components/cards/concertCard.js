import { Card } from "react-bootstrap";
import dayjs from "dayjs";
import { timeToCurtain } from "../../utils/dateUtils";
import "./style.css";


const ConcertCard = ({ concert }) => {

  //====================//
  //      Methods       //
  //====================//

  // Format the date
  const formatDate = (dates) => {
    const formattedDate = dates.map(date => dayjs(date, "M-D-YYYY").format("dddd, MMM D, YYYY"));
    return formattedDate.length > 1 ? formattedDate.join(" & ") : formattedDate[0].toString();
  }

  // Capitalize the first letter of each word, e.g. "By Appointment Only"
  const capsCase = (str) => {
    const wordsArr = str.split(" ");
    const capsArr = wordsArr.map(word => word[0].toUpperCase() + word.substring(1).toLowerCase());
    const casedStr = capsArr.join(" ");
    return casedStr;
  }


  //======================//
  //  Variables storing   //
  // dates, times, venues //
  //======================//
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
            ? <p><span className="bold">Times:</span> {capsCase(times)}</p>
            : <p><span className="bold">Time:</span> {capsCase(times)}</p>}
          {(times.includes("am") || times.includes("pm"))
            ? <p><span className="bold">Countdown to curtain:</span> {timeToCurtain(concert.date[0], concert.time[0])}</p>
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