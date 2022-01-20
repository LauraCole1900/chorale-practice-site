import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";
import dayjs from "dayjs"
import { Sidenav } from "../components/navbar";
import { TracksCard } from "../components/cards";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_ONE_SOP_SECT_POST, QUERY_ONE_ALTO_SECT_POST, QUERY_ONE_TEN_SECT_POST, QUERY_ONE_BASS_SECT_POST, QUERY_TRUE_CONCERTS } from "../utils/gql";
import { timeToNow } from "../utils/dateUtils";
import Auth from "../utils/auth";
import "./style.css"

const Section = () => {
  const { section } = useParams();
  const navigate = useNavigate();

  const [sortedConcerts, setSortedConcerts] = useState([]);
  const { loading: meLoading, data: meData, error: meError } = useQuery(QUERY_ME);
  const { loading: concertsLoading, data: concertsData, error: concertsError } = useQuery(QUERY_TRUE_CONCERTS);
  const { loading: sopLoading, data: sopData, error: sopError } = useQuery(QUERY_ONE_SOP_SECT_POST);
  const { loading: altoLoading, data: altoData, error: altoError } = useQuery(QUERY_ONE_ALTO_SECT_POST);
  const { loading: tenLoading, data: tenData, error: tenError } = useQuery(QUERY_ONE_TEN_SECT_POST);
  const { loading: bassLoading, data: bassData, error: bassError } = useQuery(QUERY_ONE_BASS_SECT_POST);

  const me = meData?.me || meData?.currentId || {};
  const concertArr = concertsData?.trueConcerts || [];
  const sopPost = sopData?.oneSopSectPost || {};
  const altoPost = altoData?.oneSopSectPost || {};
  const tenPost = tenData?.oneSopSectPost || {};
  const bassPost = bassData?.oneSopSectPost || {};

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


  if (concertsLoading || meLoading || sopLoading || altoLoading || tenLoading || bassLoading) {
    return <h1>Loading....</h1>
  }

  if (concertsError || meError || sopError || altoError || tenError || bassError) {
    console.log(JSON.stringify(concertsError, meError, sopError, altoError, tenError, bassError));
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
              </Card.Header>
              <Card.Body className="cardBody">
                {section === "soprano" &&
                  (sopData
                    ? { sopPost }
                    : <p>No {section} announcements at this time.</p>)}
                {section === "alto" &&
                  (altoData
                    ? { altoPost }
                    : <p>No {section} announcements at this time.</p>)}
                {section === "tenor" &&
                  (tenData
                    ? { tenPost }
                    : <p>No {section} announcements at this time.</p>)}
                {section === "bass" &&
                  (bassData
                    ? { bassPost }
                    : <p>No {section} announcements at this time.</p>)}
              </Card.Body>
            </Card>
            {sortedConcerts.length &&
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