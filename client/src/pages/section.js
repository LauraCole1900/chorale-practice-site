import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import dayjs from "dayjs"
import { Sidenav } from "../components/navbar";
import { TracksCard } from "../components/cards";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_CONCERTS, QUERY_TRUE_CONCERTS } from "../utils/queries";
import "./style.css"

const Section = () => {
  const [songs, setSongs] = useState([]);
  const [sortedConcerts, setSortedConcerts] = useState([]);
  const { loading, data } = useQuery(QUERY_ALL_CONCERTS);

  const concertArr = data?.concerts || [];
  console.log(concertArr);

  // Determines which section-page user is on and pulls out the section name
  const urlArray = window.location.href.split("/")
  const urlSection = urlArray[urlArray.length - 1]

  // Capitalizes first letter of section name
  const capsSection = urlSection.charAt(0).toUpperCase() + urlSection.slice(1);

  useEffect(() => {
    if (concertArr.length) {
      const upcomingConcerts = concertArr.filter(concert => (dayjs(concert.date[0], "MM-DD-YYYY")) < dayjs());
      console.log({ upcomingConcerts });
      const trueConcerts = upcomingConcerts.filter(concert => concert.songs?.length > 0);
      console.log({ trueConcerts });
      const sortedByTime = trueConcerts.sort((a, b) => a.time[0] > b.time[0] ? 1 : -1);
      const sortedByDate = sortedByTime.sort((a, b) => (a.date[0] > b.date[0]) ? 1 : -1);
      setSortedConcerts(sortedByDate);
      // setPageReady(true);
    }
  }, [concertArr])

  if (loading) {
    return <h1>Loading....</h1>
  }


  return (
    <>
      <Container>
        <Row>
          <Col sm={2}>
            <Sidenav />
          </Col>
          <Col sm={10}>
            <Card className="announcements">
              <Card.Header className="cardTitle">
                <h1>{capsSection} Section Leader Announcements</h1>
              </Card.Header>
              <Card.Body className="cardBody">
                <p>Any {urlSection} section leader announcements will go here.</p>
              </Card.Body>
            </Card>
            {concertArr.length &&
              concertArr.map(concert => (
                <TracksCard concert={concert} />
              ))}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Section;