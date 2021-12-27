import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import "./style.css";

const Lander = () => {

  // useEffect(() => {
    // will grab upcoming concerts from database & throw them into an array
  // }, []);

  
  return (
    <>
      <Card className="card">
        <Card.Header className="cardTitle">
          <h1>Upcoming Events</h1>
        </Card.Header>
        <Card.Body className="cardBody">
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