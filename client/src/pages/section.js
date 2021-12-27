import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import "./style.css"

const Section = () => {
  const [songs, setSongs] = useState([]);

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
        <Card>
          <Card.Header className="cardTitle">
            <h1>{capsSection} Section Leader Announcements</h1>
          </Card.Header>
          <Card.Body className="cardBody">
            <p>Any {urlSection} section leader announcements will go here.</p>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}

export default Section;