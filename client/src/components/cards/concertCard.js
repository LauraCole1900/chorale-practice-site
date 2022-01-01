// import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import dayjs from "dayjs";
import "./style.css";

const ConcertCard = ({ concert }) => {
  const formatDate = (dates) => {
    const formattedDate = dates.map(date => dayjs(date, "MM-DD-YYYY").format("dddd, MMM D, YYYY"));
    return formattedDate.length > 1 ? formattedDate.join(" & ") : formattedDate[0].toString();
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
          {venues.includes("&")
            ? <p><span className="bold">Locations:</span> {venues}</p>
            : <p><span className="bold">Location:</span> {venues}</p>}
        </Card.Body>
      </Card>
    </>
  )
}


export default ConcertCard;