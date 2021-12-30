import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import dayjs from "dayjs";
import { ConcertCard } from "../components/cards";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALL_CONCERTS } from '../utils/queries';

import Auth from '../utils/auth';
import "./style.css";

const Lander = () => {
  const { loading, data } = useQuery(QUERY_ALL_CONCERTS);

  const concerts = data || [];

  const upcomingConcerts = concerts.filter(concert => (dayjs(concert.date[0], "MM-DD-YYYY")) > dayjs());
  const sortedConcerts = upcomingConcerts.sort((a, b) => (a.date[0] > b.date[0]) ? 1 : -1);
  console.log({ upcomingConcerts });
  console.log({ sortedConcerts });

  const message = `=============================
|     Looking for a job     |
|                           |
|   Visit my portfolio at   |
|   https://lcolearts.com   |
=============================`
  const style = "color: #00ff00";

  useEffect(() => {
    console.log(`%c${message}`, style)
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
          {concerts.length > 0 &&
            <ConcertCard concerts={sortedConcerts} />}
        </Card.Body>
      </Card>
    </>
  )
}

export default Lander;