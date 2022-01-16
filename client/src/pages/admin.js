import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";
import dayjs from "dayjs";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_CONCERT, DELETE_POST, DELETE_USER, DELETE_MANY_SONGS, QUERY_ALL_CONCERTS, QUERY_ALL_USERS, QUERY_ME } from "../utils/gql";
import Auth from "../utils/auth";
import { timeToNow } from "../utils/dateUtils";
import { ConfirmModal, ErrorModal, SelectModal, SelectSongModal, SuccessModal } from "../components/modals";
import "./style.css";

const AdminPortal = () => {
  const currentUserId = Auth.getProfile().data?._id;

  const [btnName, setBtnName] = useState();
  const [type, setType] = useState();
  const [concertId, setConcertId] = useState();
  const [concertName, setConcertName] = useState();
  const [member, setMember] = useState();
  const [post, setPost] = useState();
  const [songsToDelete, setSongsToDelete] = useState([]);
  const [errThrown, setErrThrown] = useState();

  // Determines which page user is on, specifically for use with modals
  const urlArray = window.location.href.split("/")
  const urlId = urlArray[urlArray.length - 1]
  const urlType = urlArray[urlArray.length - 2]

  // Modal variables
  const [showConfirm, setShowConfirm] = useState(false);
  const [showErr, setShowErr] = useState(false);
  const [showSelect, setShowSelect] = useState(false);
  const [showSelectSongs, setShowSelectSongs] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Sets boolean to show or hide relevant modal
  const handleHideConfirm = () => setShowConfirm(false);
  const handleHideSelect = () => setShowSelect(false);
  const handleShowSelectSongs = () => setShowSelectSongs(true);
  const handleHideSelectSongs = () => setShowSelectSongs(false);
  const handleShowSuccess = () => setShowSuccess(true);
  const handleHideSuccess = () => setShowSuccess(false);
  const handleShowErr = () => setShowErr(true);
  const handleHideErr = () => setShowErr(false);

  const { loading: concertLoading, data: concertData, error: concertError } = useQuery(QUERY_ALL_CONCERTS);
  const { loading: userLoading, data: userData, error: userError } = useQuery(QUERY_ALL_USERS);
  const { loading: meLoading, data: meData, error: meError } = useQuery(QUERY_ME,
    {
      variables: { id: currentUserId }
    });
  const [deleteConcert, { deleteError, deleteData }] = useMutation(DELETE_CONCERT);
  const [deletePost, { postError, postData }] = useMutation(DELETE_POST);
  const [deleteManySongs, { songsError, songsData }] = useMutation(DELETE_MANY_SONGS);
  const [deleteMember, { memberError, memberData }] = useMutation(DELETE_USER);
  const [sortedConcerts, setSortedConcerts] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);

  const concerts = concertData?.allConcerts || [];
  const users = userData?.allUsers || [];
  const me = meData?.me || {};

  // Shows Select modal
  const handleShowSelect = (e) => {
    const { dataset } = e.target;
    console.log(dataset.type);
    console.log(dataset.id);
    setType(dataset.type);
    setShowSelect(true);
    switch (dataset.type) {
      case "event":
        setConcertId(dataset.id);
        break;
      case "member":
        setMember(dataset.member);
        break;
      default:
        setPost(dataset.post);
    }
  };

  // Shows Confirm modal
  const handleShowConfirm = (e) => {
    const { dataset } = e.target;
    console.log({ concertId });
    setBtnName(dataset.btnname);
    setConcertName(dataset.name);
    setShowSelect(false);
    setShowConfirm(true);
  };

  // Handles click on "Delete Concert" button on Confirm modal
  const handleDeleteConcert = async (id) => {
    handleHideConfirm();
    console.log(id);
    try {
      const { data } = await deleteConcert({
        variables: { id: id },
      });
      console.log(data);
      handleShowSuccess();
    } catch (err) {
      console.log(err.message);
      setErrThrown(err.message);
      handleShowErr();
    }
  };

  // Handles click on "Delete Member" button on Confirm modal
  const handleDeleteMember = async (id) => {
    console.log(id)
    try {
      const { data } = await deleteMember({
        variables: { id: id },
      });
      console.log(data);
      handleHideConfirm();
      handleShowSuccess();
    } catch (err) {
      console.log(err.message);
      setErrThrown(err.message);
      handleShowErr();
    }
  };

  // Handles click on "Delete Post" button on Confirm modal
  const handleDeletePost = async (id) => {
    console.log(id)
    try {
      const { data } = await deletePost({
        variables: { id: id },
      });
      console.log(data);
      handleHideConfirm();
      handleShowSuccess();
    } catch (err) {
      console.log(err.message);
      setErrThrown(err.message);
      handleShowErr();
    }
  };

  // Handles click on "Delete Repertoire" button on Confirm modal
  const handleDeleteSongs = async (id, songs) => {
    console.log(id)
    try {
      const { data } = await deleteManySongs({
        variables: { id: id, songsToDelete: songs },
      });
      console.log(data);
      handleHideConfirm();
      handleShowSuccess();
    } catch (err) {
      console.log(err.message);
      setErrThrown(err.message);
      handleShowErr();
    }
  };

  useEffect(() => {
    if (concerts.length) {
      const upcomingConcerts = concerts.filter(concert => !concert.time[0].includes("am") && !concert.time[0].includes("pm")
        ? dayjs(concert.date[concert.date.length - 1], "M-D-YYYY") >= dayjs()
        : (timeToNow(concert.date[concert.date.length - 1], concert.time[concert.time.length - 1])) > dayjs()
      );
      const sortedByTime = upcomingConcerts.sort((a, b) => a.time[0] > b.time[0] ? 1 : -1);
      const sortedByDate = sortedByTime.sort((a, b) => (dayjs(a.date[0]) > dayjs(b.date[0])) ? 1 : -1);
      setSortedConcerts(sortedByDate);
    }

    if (users.length) {
      const userCopy = [...users];
      const sortedByLName = userCopy.sort((a, b) => (a.lastName > b.lastName ? 1 : -1));
      setSortedUsers(sortedByLName);
    }
  }, [concerts, users])

  if (concertLoading || meLoading || userLoading) {
    return <h1>Loading....</h1>
  }

  if (concertError || meError || userError) {
    console.log(JSON.stringify(concertError, meError, userError));
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
        : (me.isAdmin === true
          ? <Container>
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
                      <li key={concert._id} className="adminLink" onClick={handleShowSelect} data-type="event" data-id={concert._id} data-name={concert.name}>{concert.name}</li>
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
                      <li key={user._id} className="adminLink" onClick={handleShowSelect} data-type="member" data-id={user._id}>{user.fullName}</li>
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

            <SelectModal
              concertId={concertId}
              member={member}
              post={post}
              type={type}
              show={showSelect === true}
              hide={() => handleHideSelect()}
              confirm={(e) => handleShowConfirm(e)}
              showSelectSongs={() => handleShowSelectSongs()}
            />

            <SelectSongModal
              concertId={concertId}
              show={showSelectSongs === true}
              hide={() => handleHideSelectSongs()}
              confirm={(e) => handleShowConfirm(e)}
              setSongsToDelete={setSongsToDelete}
            />

            <ConfirmModal
              btnname={btnName}
              urlid={urlId}
              urltype={urlType}
              concertId={concertId}
              concertName={concertName}
              member={member}
              post={post}
              eventDelete={() => handleDeleteConcert(concertId)}
              memberDelete={() => handleDeleteMember(
                member._id,
                handleHideConfirm,
                handleShowSuccess,
                setErrThrown,
                handleShowErr
              )}
              postDelete={() => handleDeletePost(
                post._id,
                handleHideConfirm,
                handleShowSuccess,
                setErrThrown,
                handleShowErr
              )}
              songsDelete={() => handleDeleteSongs(
                concertId,
                songsToDelete,
                handleHideConfirm,
                handleShowSuccess,
                setErrThrown,
                handleShowErr
              )}
              show={showConfirm === true}
              hide={() => handleHideConfirm()}
            />

            <SuccessModal
              user={me}
              urlid={urlId}
              urltype={urlType}
              btnname={btnName}
              params={[]}
              show={showSuccess === true}
              hide={() => handleHideSuccess()}
            />

            <ErrorModal
              user={me}
              urlid={urlId}
              urltype={urlType}
              errmsg={errThrown}
              btnname={btnName}
              show={showErr === true}
              hide={() => handleHideErr()}
            />

          </Container>
          : <Navigate to="/members" />
        )
      }
    </>
  )
}

export default AdminPortal;