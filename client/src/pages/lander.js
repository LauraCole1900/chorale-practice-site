import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import dayjs from "dayjs";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME, QUERY_ALL_EVENTS } from '../utils/queries';

import Auth from '../utils/auth';
import "./style.css";

const Lander = () => {
  const { userLoading, userData } = useQuery(QUERY_ME);
  const { eventLoading, eventData } = useQuery(QUERY_ALL_EVENTS);

  const user = userData?.me || {};
  const chorEvents = eventData || [];

  const upcomingEvents = chorEvents.filter(chorEvent => (dayjs(chorEvent.date[0], "MM-DD-YYYY")) > dayjs());
  console.log(upcomingEvents);

  useEffect(() => {
    console.log(`=============================
|       You found me!       |
|                           |
|   Visit my portfolio at   |
|   https://lcolearts.com   |
=============================
`)
    // will grab upcoming concerts from database & throw them into an array
  }, []);

  
  return (
    <>
      <Card className="card">
        <Card.Header className="cardTitle">
          <h1>Upcoming Events</h1>
        </Card.Header>
        <Card.Body className="cardBody">
          <h2>Chorale auditions</h2>
          <p>Wednesday, January 12 & Saturday, January 15 | By Appointment Only</p>
          <h2>Pops & Pasta Solo & Small Group Auditions</h2>
          <p>Saturday, January 15</p>
          <h2>Pops & Pasta ONLY Rehearsal</h2>
          <p>Wednesday January 12 | 7:15pm | Frasier 63</p>
          <h2>First Spring Concert Rehearsal</h2>
          <p>Wednesday, January 19 | 7:15pm | Frasier 63</p>
          <h2>26th Annual Pops & Pasta!</h2>
          <p>
            Saturday, February 26th | 1pm & 6pm | Greeley Recreation Center
          </p>
          <h2>Duruflé's Requiem and a Choral Potpourri</h2>
          <p>
            Saturday, April 9th | 7:30pm | First Congregational Church, Greeley
          </p>
        </Card.Body>
      </Card>
    </>
  )
}

export default Lander;