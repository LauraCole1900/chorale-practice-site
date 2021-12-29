import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import dayjs from "dayjs";
import "./style.css";

const EventCard = ({ chorEvents }) => {
  const dates = chorEvents.date > 1 ? chorEvents.date.join(", ") : chorEvents.date.toString();
  const times = chorEvents.time > 1 ? chorEvents.time.join(", ") : chorEvents.time.toString();
  const venues = chorEvents.venue > 1 ? chorEvents.venue.join(", ") : chorEvents.venue.toString();

  return (
    <>
      {chorEvents.map(chorEvent => (
        <Card className="eventCard">
          <Card.Header className="eventTitle">
            <h2>{chorEvents.name}</h2>
          </Card.Header>
          <Card.Body className="eventBody">
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


export default EventCard;