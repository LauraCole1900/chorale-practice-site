import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_USERS, QUERY_ME } from "../utils/gql";
import Auth from "../utils/auth";
import { RosterTable } from "../components/tables";

const RosterPage = () => {
  const [currSops, setCurrSops] = useState([]);
  const [currAlts, setCurrAlts] = useState([]);
  const [currTens, setCurrTens] = useState([]);
  const [currBass, setCurrBass] = useState([]);
  const [currStaff, setCurrStaff] = useState([]);
  const [currBoard, setCurrBoard] = useState([]);

  const { loading: meLoading, data: meData, error: meError } = useQuery(QUERY_ME);
  const { loading: usersLoading, data: usersData, error: usersError } = useQuery(QUERY_ALL_USERS);

  const me = meData?.me || meData?.currentId || {};
  const members = usersData?.allUsers || [];

  const sortSection = (singers) => {
    const sortedSingers = singers.sort((a, b) => a.lastName > b.lastName ? 1 : -1);
    return sortedSingers;
  }

  useEffect(() => {
    if (members.length) {
      const sopranos = members.filter(member => member.section === "Soprano I" || member.section === "Soprano II");
      const altos = members.filter(member => member.section === "Alto I" || member.section === "Alto II");
      const tenors = members.filter(member => member.section === "Tenor I" || member.section === "Tenor II");
      const basses = members.filter(member => member.section === "Bass I" || member.section === "Bass II");
      const staff = members.filter(member => !["section leader", "singer", "webdev", "guest"].includes(member.position));
      const board = members.filter(member => member.section === "Board");

      const sortedSops = sortSection(sopranos);
      setCurrSops(sortedSops);
      const sortedAltos = sortSection(altos);
      setCurrAlts(sortedAltos);
      const sortedTenors = sortSection(tenors);
      setCurrTens(sortedTenors);
      const sortedBasses = sortSection(basses);
      setCurrBass(sortedBasses);
      const sortedStaff = sortSection(staff);
      setCurrStaff(sortedStaff);
      const sortedBoard = sortSection(board);
      setCurrBoard(sortedBoard);
    }
  }, [members])

  if (meLoading || usersLoading) {
    return <h1>Loading....</h1>
  }

  if (meError || usersError) {
    console.log(JSON.stringify(meError, usersError));
  }

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />
  }

  if (me.position === "guest") {
    return <Navigate to="/members" />
  }

  return (
    <>
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
            <li><a href="#staff">Staff</a></li>
            <li><a href="#board">Board</a></li>
            {me.isAdmin === true &&
              <li><Link to="/admin_portal">Admin Portal</Link></li>}
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

        <Row>
          <h3 id="staff">Staff</h3>
        </Row>
        <Row>
          <RosterTable members={currStaff} />
        </Row>

        <Row>
          <h3 id="board">Board</h3>
        </Row>
        <Row>
          <RosterTable members={currBoard} />
        </Row>
      </Container>
    </>
  )
}

export default RosterPage;