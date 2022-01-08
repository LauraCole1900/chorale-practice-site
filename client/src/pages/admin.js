import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";
import dayjs from "dayjs";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ALL_CONCERTS, QUERY_ALL_USERS } from "../utils/gql";
import Auth from "../utils/auth";
import "./style.css";

const AdminPortal = () => {
  const { loading: concertLoading, data: concertData, error: concertError } = useQuery(QUERY_ALL_CONCERTS);
  const { loading: userLoading, data: userData, error: userError } = useQuery(QUERY_ALL_USERS);
  const [sortedConcerts, setSortedConcerts] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [pageReady, setPageReady] = useState(false);

  const concerts = concertData?.allConcerts || [];
  console.log({ concerts });

  const users = userData?.allUsers || [];
  console.log({ users });

  const deleteConcert = (id) => {

  }

  useEffect(() => {
    if (concerts.length) {
      const upcomingConcerts = concerts.filter(concert => (dayjs(concert.date[concert.date.length - 1], "MM-DD-YYYY")) > dayjs());
      const sortedByTime = upcomingConcerts.sort((a, b) => a.time[0] > b.time[0] ? 1 : -1);
      const sortedByDate = sortedByTime.sort((a, b) => (a.date[0] > b.date[0]) ? 1 : -1);
      setSortedConcerts(sortedByDate);
    }

    if (users.length) {
      const userCopy = [...users];
      const sortedByLName = userCopy.sort((a, b) => (a.lastName > b.lastName ? 1 : -1));
      setSortedUsers(sortedByLName);
    }
    setPageReady(true);
  }, [concerts, users])

  if (concertLoading || userLoading) {
    return <h1>Loading....</h1>
  }

  if (concertError || userError) {
    console.log(JSON.stringify(concertError, userError));
  }

  // edit concert
  // +- songs
  // +- tracks
  // +- videos
  // +- materials
  // posts
  // director's corner
  // singer's notes
  // section leader announcements


  return (
    <>
      {!Auth.loggedIn
        ? <Navigate to="/login" />
        : <Container>
          <Row>
            <Col sm={12} className="center">
              <h1>Admin Portal</h1>
            </Col>
          </Row>

          <Row className="rosterNav">
            <ul>
              <li><a href="#events">Events</a></li>
              <li><a href="#members">Members</a></li>
              <li><a href="#posts">Posts</a></li>
            </ul>
          </Row>

          <Row>
            <Card className="adminCard" id="events">
              <Card.Header className="cardTitle">
                <h2>Event Actions</h2>
              </Card.Header>
              <Card.Body className="cardBody">
                <h5><Link to="/new_event" className="adminLink">Create new event</Link></h5>
                <h5>Click name of existing event to edit or delete</h5>
                <ul>
                  {sortedConcerts.map(concert => (
                    <div key={concert._id}>
                      <li>{concert.name}</li>
                      <ul>
                        <li><Link to={`/edit_event/${concert._id}`}>Edit event information</Link></li>
                        <li><Link to={`/repertoire/${concert._id}`}>Add repertoire, practice tracks, and/or video links</Link></li>
                        <li className="adminLink" onClick={() => deleteConcert(concert._id)}>Delete this event</li>
                      </ul>
                    </div>
                  ))}
                </ul>
              </Card.Body>
            </Card>

            <Card className="adminCard" id="members">
              <Card.Header className="cardTitle">
                <h2>Member Actions</h2>
              </Card.Header>
              <Card.Body className="cardBody">
                <h5><Link to="/new_member" className="adminLink">Add new member</Link></h5>
                <h5>Click name of existing member to edit or delete</h5>
                <ul>
                  {sortedUsers.map(user => (
                    <li key={user._id}><Link to={`/edit_member/${user._id}`}>{user.fullName}</Link></li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
            <Card className="adminCard" id="posts">
              <Card.Header className="cardTitle">
                <h2>Post Actions</h2>
              </Card.Header>
              <Card.Body className="cardBody">
                <h5><Link to="/new_post" className="adminLink">Add new post</Link></h5>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      }
    </>
  )
}

export default AdminPortal;