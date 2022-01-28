import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";
import dayjs from "dayjs"
import { Sidenav } from "../components/navbar";
import { TracksCard } from "../components/cards";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_ONE_SECT_POST, QUERY_TRUE_CONCERTS } from "../utils/gql";
import { timeToNow } from "../utils/dateUtils";
import Auth from "../utils/auth";
import "./style.css"

const Section = () => {
  const { section } = useParams();
  const navigate = useNavigate();

  const [sortedConcerts, setSortedConcerts] = useState([]);
  const { loading: meLoading, data: meData, error: meError } = useQuery(QUERY_ME);
  const { loading: concertsLoading, data: concertsData, error: concertsError } = useQuery(QUERY_TRUE_CONCERTS);
  const { loading: sectionLoading, data: sectionData, error: sectionError } = useQuery(QUERY_ONE_SECT_POST, {
    variables: { postType: "section leader", postSection: section }
  });

  const me = meData?.me || meData?.currentId || {};
  const concertArr = concertsData?.trueConcerts || [];
  const sectionPost = sectionData?.oneSectPost || {};

  // Capitalizes first letter of section name
  const capsSection = section.charAt(0).toUpperCase() + section.slice(1);

  useEffect(() => {
    if (!["soprano", "alto", "tenor", "bass"].includes(section)) {
      navigate("/");
    };

    if (concertArr.length) {
      const upcomingConcerts = concertArr.filter(concert => !concert.time[0].includes("am") && !concert.time[0].includes("pm")
        ? dayjs(concert.date[concert.date.length - 1], "M-D-YYYY") >= dayjs()
        : (timeToNow(concert.date[concert.date.length - 1], concert.time[concert.time.length - 1])) > dayjs()
      );
      const sortedByTime = upcomingConcerts.sort((a, b) => a.time[0] > b.time[0] ? 1 : -1);
      const sortedByDate = sortedByTime.sort((a, b) => (dayjs(a.date[0]) > dayjs(b.date[0])) ? 1 : -1);
      setSortedConcerts(sortedByDate);
    }
  }, [concertArr, navigate, section]);


  if (concertsLoading || meLoading || sectionLoading) {
    return <h1>Loading....</h1>
  }

  if (concertsError || meError || sectionError) {
    console.error(JSON.stringify({ concertsError }));
    console.error(JSON.stringify({ meError }));
    console.error(JSON.stringify({ sectionError }));
  }

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />
  }


  return (
    <>
      <Container>
        <Row>
          <Col sm={2}>
            <Sidenav user={me} />
          </Col>
          <Col sm={10}>
            <Card className="announcements">
              <Card.Header className="cardTitle">
                <h1>{capsSection} Section Leader Announcements</h1>
                {Object.keys(sectionPost).length > 0 &&
                  <p>{dayjs(JSON.parse(sectionPost.postDate)).format("MMM D, YYYY")} </p>}
              </Card.Header>
              <Card.Body className="cardBody">
                {Object.keys(sectionPost).length > 0
                  ? <p>{sectionPost.postBody}</p>
                  : <p>No {section} announcements at this time.</p>}
              </Card.Body>
            </Card>
            {sortedConcerts.length > 0 &&
              sortedConcerts.map(concert => (
                <TracksCard concert={concert} key={concert._id} section={section} />
              ))}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Section;