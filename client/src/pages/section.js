/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Accordion, Card, Col, Container, Row } from "react-bootstrap";
import dayjs from "dayjs";
import { CompositeDecorator } from "draft-js";
import { TracksAccordion } from "../components/cards";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_ONE_SECT_POST, QUERY_TRUE_CONCERTS } from "../utils/gql";
import { timeToNow } from "../utils/dateUtils";
import Auth from "../utils/auth";
import "./style.css";


const Section = () => {

  //======================//
  //   Global variables   //
  //======================//

  // Params
  const { section } = useParams();

  // Navigation
  const navigate = useNavigate();

  // State variables
  const [sortedConcerts, setSortedConcerts] = useState([]);


  //=====================//
  //       Queries       //
  //=====================//

  const { loading: meLoading, data: meData, error: meError } = useQuery(QUERY_ME);
  const { loading: concertsLoading, data: concertsData, error: concertsError } = useQuery(QUERY_TRUE_CONCERTS);
  const { loading: sectionLoading, data: sectionData, error: sectionError } = useQuery(QUERY_ONE_SECT_POST, {
    variables: { postType: "section leader", postSection: section }
  });

  const me = meData?.me || meData?.currentId || {};
  const concertArr = useMemo(() => { return concertsData?.trueConcerts || [] }, [concertsData?.trueConcerts]);
  const sectionPost = sectionData?.oneSectPost || {};


  //=====================//
  //       Methods       //
  //=====================//

  // Capitalizes first letter of section name
  const capsSection = section.charAt(0).toUpperCase() + section.slice(1);


  //=====================//
  //   Draftjs Methods   //
  //=====================//

  // Makes RTE links clickable in read-only mode
  function linkStrategy(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          contentState.getEntity(entityKey).getType() === 'LINK'
        );
      },
      callback
    );
  };

  // Returns <a> tags for links
  const Link = (props) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return (
      <a href={url} target="_blank" rel="noreferrer noopener">
        {props.children}
      </a>
    );
  };

  // Consolidates decorators?
  const decorator = new CompositeDecorator([
    {
      strategy: linkStrategy,
      component: Link,
    },
  ]);


  //=====================//
  //   Run on page load  //
  //=====================//

  useEffect(() => {
    if (!["soprano", "alto", "tenor", "bass"].includes(section)) {
      navigate("/");
    };

    if (concertArr.length) {
      const upcomingConcerts = concertArr.filter(concert => !concert.time[0].includes("am") && !concert.time[0].includes("pm")
        ? dayjs(concert.date.at(-1), "M-D-YYYY") >= dayjs()
        : (timeToNow(concert.date.at(-1), concert.time.at(-1))) > dayjs()
      );
      const sortedByTime = upcomingConcerts.sort((a, b) => a.time[0] > b.time[0] ? 1 : -1);
      const sortedByDate = sortedByTime.sort((a, b) => (dayjs(a.date[0]) > dayjs(b.date[0])) ? 1 : -1);
      setSortedConcerts(sortedByDate);
    }
  }, [concertArr, navigate, section]);


  //=====================//
  //    Conditionals     //
  //=====================//

  if (concertsLoading || meLoading || sectionLoading) {
    return <h1>Loading....</h1>
  };

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />
  };


  return (
    <>
      <div className="bground">
        <div className="fground">
          <Container fluid>
            <Row>
              <Col sm={{ span: 8, offset: 2 }}>
                <Card className="announcements">
                  <Card.Header className="cardTitle">
                    <h1>{capsSection} Section Leader Announcements</h1>
                    {Object.keys(sectionPost).length > 0 &&
                      <p>{dayjs(JSON.parse(sectionPost.postDate)).format("MMM D, YYYY")} </p>}
                  </Card.Header>
                  <Card.Body className="cardBody">
                    {Object.keys(sectionPost).length > 0
                      ? <div dangerouslySetInnerHTML={{ __html: sectionPost.postBody }} />
                      : <p>No {section} announcements at this time.</p>}
                  </Card.Body>
                </Card>
                {sortedConcerts.length > 0 &&
                  <>
                    <p className="accordionInstr">Click or tap concert title to see practice tracks & videos</p>
                    <Accordion>
                      {sortedConcerts.map((concert, i) => (
                        <TracksAccordion concert={concert} i={i} key={concert._id} section={section} />
                      ))}
                    </Accordion>
                  </>}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  )
}

export default Section;