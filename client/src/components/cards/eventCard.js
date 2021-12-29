import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import dayjs from "dayjs";
import "./style.css";

const EventCard = (props) => {
  const dates = props.date > 1 ? props.date.join(", ") : props.date.toString();
  const times = props.time > 1 ? props.time.join(", ") : props.time.toString();
  const venues = props.venue > 1 ? props.venue.join(", ") : props.venue.toString();

  return (
    <Card className="eventCard">
      <Card.Header className="eventTitle">
        <h2>{props.name}</h2>
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
    </Card>
  )
}


export default EventCard;