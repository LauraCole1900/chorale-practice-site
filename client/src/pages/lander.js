import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import dayjs from "dayjs";
import { ConcertCard } from "../components/cards";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_CONCERTS } from "../utils/gql";
import { timeToNow } from "../utils/dateUtils";
import "./style.css";

const Lander = () => {
  const [sortedConcerts, setSortedConcerts] = useState([]);
  const { loading, data, error } = useQuery(QUERY_ALL_CONCERTS);

  const concerts = data?.allConcerts || [];

  const message = `=============================
|     Looking for a job     |
|                           |
|   Visit my portfolio at   |
|   https://lcolearts.com   |
=============================`
  const style = "color: #00ff00";

  useEffect(() => {
    console.log(`%c${message}`, style);

    if (concerts.length) {
      const upcomingConcerts = concerts.filter(concert => !concert.time[0].includes("am") && !concert.time[0].includes("pm")
        ? dayjs(concert.date[concert.date.length - 1], "M-D-YYYY") >= dayjs()
        : (timeToNow(concert.date[concert.date.length - 1], concert.time[concert.time.length - 1])) > dayjs()
      );
      const sortedByTime = upcomingConcerts.sort((a, b) => a.time[0] > b.time[0] ? 1 : -1);
      const sortedByDate = sortedByTime.sort((a, b) => (dayjs(a.date[0]) > dayjs(b.date[0])) ? 1 : -1);
      setSortedConcerts(sortedByDate);
    }
  }, [concerts, message])

  if (loading) {
    return <h1>Loading....</h1>
  }

  if (error) {
    console.error(JSON.stringify(error));
  }


  return (
    <>
      <Card className="card">
        <Card.Header className="cardTitle">
          <h1>Upcoming Events</h1>
        </Card.Header>
        <Card.Body className="cardBody">
          <Row>
            {sortedConcerts.length > 0
              ? <>
                {sortedConcerts.map(concert => (
                  <Col sm={12} md={6} lg={4} className="eventCards" key={concert._id}>
                    <ConcertCard concert={concert} />
                  </Col>
                ))}
              </>
              : <>
                <h3>No upcoming events found</h3>
              </>}
          </Row>
        </Card.Body>
      </Card>
    </>
  )
}

export default Lander;