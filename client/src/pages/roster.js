import { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_USERS } from "../utils/gql";
import { RosterTable } from "../components/tables";

const RosterPage = () => {
  const [currSops, setCurrSops] = useState([]);
  const [currAlts, setCurrAlts] = useState([]);
  const [currTens, setCurrTens] = useState([]);
  const [currBass, setCurrBass] = useState([]);
  const [pageReady, setPageReady] = useState(false);
  const { loading, data, error } = useQuery(QUERY_ALL_USERS);

  const members = data?.allUsers || [];

  const sortSection = (singers) => {
    const sortedSingers = singers.sort((a, b) => a.lastName > b.lastName ? 1 : -1);
    console.log({ sortedSingers });
    return sortedSingers;
  }

  useEffect(() => {
    if (members.length) {
      console.log({ members });
      const sopranos = members.filter(member => member.section === "Soprano I" || member.section === "Soprano II");
      const altos = members.filter(member => member.section === "Alto I" || member.section === "Alto II");
      const tenors = members.filter(member => member.section === "Tenor I" || member.section === "Tenor II");
      const basses = members.filter(member => member.section === "Bass I" || member.section === "Bass II");

      const sortedSops = sortSection(sopranos);
      setCurrSops(sortedSops);
      const sortedAltos = sortSection(altos);
      setCurrAlts(sortedAltos);
      const sortedTenors = sortSection(tenors);
      setCurrTens(sortedTenors);
      const sortedBasses = sortSection(basses);
      setCurrBass(sortedBasses);
      setPageReady(true);
    }
  }, [members])

  if (loading) {
    return <h1>Loading....</h1>
  }

  if (error) {
    console.log(JSON.stringify(error));
  }

  return (
    <>
      {pageReady &&
        <Container fluid>
          <Row>
            <Col sm={12} className="pageHeader">
              <h1>Roster</h1>
            </Col>
          </Row>

          <Row className="rosterNav">
            <ul>
              <li><a href="#sopranos">Sopranos</a></li>
              <li><a href="#altos">Altos</a></li>
              <li><a href="#tenors">Tenors</a></li>
              <li><a href="#basses">Basses</a></li>
            </ul>
          </Row>

          <Row>
            <h3 id="sopranos">Sopranos</h3>
          </Row>
          <Row>
            <RosterTable members={currSops} />
          </Row>

          <Row>
            <h3 id="altos">Altos</h3>
          </Row>
          <Row>
            <RosterTable members={currAlts} />
          </Row>

          <Row>
            <h3 id="tenors">Tenors</h3>
          </Row>
          <Row>
            <RosterTable members={currTens} />
          </Row>

          <Row>
            <h3 id="basses">Basses</h3>
          </Row>
          <Row>
            <RosterTable members={currBass} />
          </Row>
        </Container>
      }
    </>
  )
}

export default RosterPage;