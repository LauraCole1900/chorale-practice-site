// import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
// import dayjs from "dayjs";
import "./style.css";

const ConcertCard = ({ concert }) => {
  const dates = concert.date.length > 1 ? concert.date.join(" & ") : concert.date[0].toString();
  const times = concert.time.length > 1 ? concert.time.join(" & ") : concert.time[0].toString();
  const venues = concert.venue.length > 1 ? concert.venue.join(" & ") : concert.venue[0].toString();
  console.log(concert.time, times);

  return (
    <>
      <Card className="concertCard">
        <Card.Header className="concertTitle">
          <h3>{concert.name}</h3>
        </Card.Header>
        <Card.Body className="concertBody">
          {dates.includes("&")
            ? <p>Dates: {dates}</p>
            : <p>Date: {dates}</p>}
          {times.includes("&")
            ? <p>Times: {times}</p>
            : <p>Time: {times}</p>}
          {venues.includes("&")
            ? <p>Locations: {venues}</p>
            : <p>Location: {venues}</p>}
        </Card.Body>
      </Card>
    </>
  )
}


export default ConcertCard;