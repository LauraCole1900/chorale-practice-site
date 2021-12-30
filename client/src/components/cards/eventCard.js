import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import dayjs from "dayjs";
import "./style.css";

const ConcertCard = ({ concerts }) => {
  const dates = concerts.date > 1 ? concerts.date.join(", ") : concerts.date.toString();
  const times = concerts.time > 1 ? concerts.time.join(", ") : concerts.time.toString();
  const venues = concerts.venue > 1 ? concerts.venue.join(", ") : concerts.venue.toString();

  return (
    <>
      {concerts.map(concert => (
        <Card className="concertCard">
          <Card.Header className="concertTitle">
            <h2>{concert.name}</h2>
          </Card.Header>
          <Card.Body className="concertBody">
            {dates.includes(",")
              ? <p>Dates: {dates}</p>
              : <p>Date: {dates}</p>}
            {times.includes(",")
              ? <p>Times: {times}</p>
              : <p>Time: {times}</p>}
            {venues.includes(",")
              ? <p>Locations: {venues}</p>
              : <p>Location: {venues}</p>}
          </Card.Body>
        </Card>))}
    </>
  )
}


export default ConcertCard;