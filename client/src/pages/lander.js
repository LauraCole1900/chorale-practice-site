import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import dayjs from "dayjs";
import { ConcertCard } from "../components/cards";
import { useQuery } from '@apollo/client';
import { QUERY_ALL_CONCERTS } from '../utils';

// import Auth from '../utils/auth';
import "./style.css";

const Lander = () => {
  const [sortedConcerts, setSortedConcerts] = useState([]);
  const [pageReady, setPageReady] = useState(false);
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
    console.log(`%c${message}`, style)

    if (concerts.length) {
      const upcomingConcerts = concerts.filter(concert => (dayjs(concert.date[concert.date.length - 1], "MM-DD-YYYY")) > dayjs());
      const sortedByTime = upcomingConcerts.sort((a, b) => a.time[0] > b.time[0] ? 1 : -1);
      const sortedByDate = sortedByTime.sort((a, b) => (a.date[0] > b.date[0]) ? 1 : -1);
      setSortedConcerts(sortedByDate);
    }
    setPageReady(true);
  }, [concerts, message])

  if (loading) {
    return <h1>Loading....</h1>
  }

  if (error) {
    console.log(JSON.stringify(error));
  }


  return (
    <>
      {pageReady === true &&
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
      }
    </>
  )
}

export default Lander;