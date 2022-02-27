/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_USERS, QUERY_ME } from "../utils/gql";
import Auth from "../utils/auth";
import { RosterTable } from "../components/tables";

const RosterPage = () => {

  //=====================//
  //   State Variables   //
  //=====================//

  const [currSops, setCurrSops] = useState([]);
  const [currAlts, setCurrAlts] = useState([]);
  const [currTens, setCurrTens] = useState([]);
  const [currBass, setCurrBass] = useState([]);
  const [currStaff, setCurrStaff] = useState([]);
  const [currBoard, setCurrBoard] = useState([]);


  //=====================//
  //       Queries       //
  //=====================//

  const { loading: meLoading, data: meData, error: meError } = useQuery(QUERY_ME);
  const { loading: usersLoading, data: usersData, error: usersError } = useQuery(QUERY_ALL_USERS);

  const me = meData?.me || meData?.currentId || {};
  const members = useMemo(() => {return usersData?.allUsers || []}, [usersData?.allUsers]);


  //=====================//
  //       Methods       //
  //=====================//

  // Filter users by section or position, then sort by first name, then by last name
  const sortSection = (singers, section) => {
    let filteredSingers;
    if (section.length <= 2) {
      filteredSingers = singers.filter(singer => section.includes(singer.section));
    } else {
      filteredSingers = singers.filter(singer => !section.includes(singer.position));
    }
    const sortByFName = filteredSingers.sort((a, b) => a.firstName < b.firstName ? 1 : -1);
    const sortedSingers = sortByFName.sort((a, b) => a.lastName > b.lastName ? 1 : -1);
    return sortedSingers;
  }


  //=====================//
  //   Run on page load  //
  //=====================//

  useEffect(() => {
    if (members.length) {
      const sortedSops = sortSection(members, ["Soprano I", "Soprano II"]);
      const sortedAltos = sortSection(members, ["Alto I", "Alto II"]);
      const sortedTenors = sortSection(members, ["Tenor I", "Tenor II"]);
      const sortedBasses = sortSection(members, ["Bass I", "Bass II"]);
      const sortedStaff = sortSection(members, ["section leader", "singer", "webdev", "guest"]);
      const sortedBoard = sortSection(members, ["Board"]);
      setCurrSops(sortedSops);
      setCurrAlts(sortedAltos);
      setCurrTens(sortedTenors);
      setCurrBass(sortedBasses);
      setCurrStaff(sortedStaff);
      setCurrBoard(sortedBoard);
    }
  }, [members])


  //=====================//
  //    Conditionals     //
  //=====================//
  
  if (meLoading || usersLoading) {
    return <h1>Loading....</h1>
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