import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Sidenav } from "../components/navbar";
import { useQuery } from "@apollo/client";
import { QUERY_TRUE_CONCERTS } from "../utils/queries";
import "./style.css"

const Section = () => {
  const [songs, setSongs] = useState([]);
  const { loading, data } = useQuery(QUERY_TRUE_CONCERTS);

  const concertArr = data?.concerts || [];
  console.log(concertArr);

  // Determines which section-page user is on and pulls out the section name
  const urlArray = window.location.href.split("/")
  const urlSection = urlArray[urlArray.length - 1]

  // Capitalizes first letter of section name
  const capsSection = urlSection.charAt(0).toUpperCase() + urlSection.slice(1);

  // useEffect(() => {
  // useEffect will pull section leader announcements & practice tracks list
  // }, []);


  return (
    <>
      <Container>
        <Row>
          <Col sm={2}>
            <Sidenav />
          </Col>
          <Col sm={10}>
            <Card>
              <Card.Header className="cardTitle">
                <h1>{capsSection} Section Leader Announcements</h1>
              </Card.Header>
              <Card.Body className="cardBody">
                <p>Any {urlSection} section leader announcements will go here.</p>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header className="cardTitle">
                <h2>Title of First Song Goes Here</h2>
              </Card.Header>
              <Card.Body className="cardBody">
                <p>Either a link to a practice track or an embedded practice track will go here</p>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header className="cardTitle">
                <h2>Title of Second Song Goes Here</h2>
              </Card.Header>
              <Card.Body className="cardBody">
                <p>Either a link to a practice track or an embedded practice track will go here</p>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header className="cardTitle">
                <h2>Title of Third Song Goes Here</h2>
              </Card.Header>
              <Card.Body className="cardBody">
                <p>Either a link to a practice track or an embedded practice track will go here</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Section;