import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";
import dayjs from "dayjs";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_CONCERT, DELETE_POST, DELETE_USER, DELETE_MANY_SONGS, QUERY_ALL_CONCERTS, QUERY_ALL_POSTS, QUERY_ALL_USERS, QUERY_ME } from "../utils/gql";
import Auth from "../utils/auth";
import { timeToNow } from "../utils/dateUtils";
import { ConfirmModal, ErrorModal, SelectModal, SelectSongModal, SuccessModal } from "../components/modals";
import { Sidenav } from "../components/navbar";
import "./style.css";

const AdminPortal = () => {
  const [btnName, setBtnName] = useState();
  const [type, setType] = useState();
  const [concertId, setConcertId] = useState();
  const [concertName, setConcertName] = useState();
  const [memberId, setMemberId] = useState();
  const [memberName, setMemberName] = useState();
  const [postId, setPostId] = useState();
  const [songs, setSongs] = useState([]);
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
  const handleHideSelectSongs = () => setShowSelectSongs(false);
  const handleShowSuccess = () => setShowSuccess(true);
  const handleHideSuccess = () => setShowSuccess(false);
  const handleShowErr = () => setShowErr(true);
  const handleHideErr = () => setShowErr(false);

  const { loading: concertLoading, data: concertData, error: concertError } = useQuery(QUERY_ALL_CONCERTS);
  const { loading: userLoading, data: userData, error: userError } = useQuery(QUERY_ALL_USERS);
  const { loading: meLoading, data: meData, error: meError } = useQuery(QUERY_ME);
  const { loading: postLoading, data: postData, error: postError } = useQuery(QUERY_ALL_POSTS);
  const [deleteConcert, { deleteConcertError, deleteConcertData }] = useMutation(DELETE_CONCERT, {
    update(cache, { data: { addConcert } }) {
      try {
        // Retrieve existing concert data that is stored in the cache
        const { concerts } = cache.readQuery({ query: QUERY_ALL_CONCERTS });
        // Update the cache by combining existing concert data with the newly created data returned from the mutation
        cache.writeQuery({
          query: QUERY_ALL_CONCERTS,
          // If we want new data to show up before or after existing data, adjust the order of this array
          data: { profiles: [...concerts, addConcert] },
        });
      } catch (err) {
        console.error(err);
      }
    }
  });
  const [deletePost, { deletePostError, deletePostData }] = useMutation(DELETE_POST);
  const [deleteManySongs, { songsError, songsData }] = useMutation(DELETE_MANY_SONGS);
  const [deleteMember, { memberError, memberData }] = useMutation(DELETE_USER);
  const [sortedConcerts, setSortedConcerts] = useState([]);
  const [sortedSops, setSortedSops] = useState([]);
  const [sortedAlts, setSortedAlts] = useState([]);
  const [sortedTens, setSortedTens] = useState([]);
  const [sortedBass, setSortedBass] = useState([]);
  const [sortedOthers, setSortedOthers] = useState([]);
  const [sortedPosts, setSortedPosts] = useState([]);

  const concerts = concertData?.allConcerts || [];
  const users = userData?.allUsers || [];
  const posts = postData?.allPosts || [];
  const me = meData?.me || meData?.currentId || {};

  // Shows Select modal
  const handleShowSelect = (e, id, name, songs) => {
    const { dataset } = e.target;
    setType(dataset.type);
    setShowSelect(true);
    switch (dataset.type) {
      case "event":
        setConcertId(id);
        setConcertName(name);
        setSongs(songs);
        break;
      case "member":
        setMemberId(id);
        setMemberName(name);
        break;
      default:
        setPostId(id);
    }
  };

  // Shows Select Songs modal
  const handleShowSelectSongs = (e, songs) => {
    const { dataset } = e.target;
    setBtnName(dataset.btnname);
    handleHideSelect();
    setShowSelectSongs(true);
  }

  // Shows Confirm modal
  const handleShowConfirm = (e) => {
    const { dataset } = e.target;
    setBtnName(dataset.btnname);
    handleHideSelect();
    setShowConfirm(true);
  };

  // Handles click on "Delete Concert" button on Confirm modal
  const handleDeleteConcert = async (id) => {
    handleHideConfirm();
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

    if (posts.length) {
      const postsByDate = posts.sort((a, b) => a.postDate < b.postDate ? 1 : -1);
      setSortedPosts(postsByDate);
    }

    if (users.length) {
      console.log({ users });
      const sops = users.filter(user => ["Soprano I", "Soprano II"].includes(user.section));
      const alts = users.filter(user => ["Alto I", "Alto II"].includes(user.section));
      const tens = users.filter(user => ["Tenor I", "Tenor II"].includes(user.section));
      const bass = users.filter(user => ["Bass I", "Bass II"].includes(user.section));
      const other = users.filter(user => !["Soprano I", "Soprano II", "Alto I", "Alto II", "Tenor I", "Tenor II", "Bass I", "Bass II", "Guest"].includes(user.section));
      const sopsSortedByLName = sops.sort((a, b) => (a.lastName > b.lastName ? 1 : -1));
      const altsSortedByLName = alts.sort((a, b) => (a.lastName > b.lastName ? 1 : -1));
      const tensSortedByLName = tens.sort((a, b) => (a.lastName > b.lastName ? 1 : -1));
      const bassSortedByLName = bass.sort((a, b) => (a.lastName > b.lastName ? 1 : -1));
      const othersSortedByLName = other.sort((a, b) => (a.lastName > b.lastName ? 1 : -1));
      setSortedSops(sopsSortedByLName);
      setSortedAlts(altsSortedByLName);
      setSortedTens(tensSortedByLName);
      setSortedBass(bassSortedByLName);
      setSortedOthers(othersSortedByLName);
    }
  }, [concerts, posts, users])

  if (concertLoading || meLoading || postLoading || userLoading) {
    return <h1>Loading....</h1>
  }

  if (concertError || meError || postError || userError) {
    console.log(JSON.stringify(concertError, meError, userError));
  }

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />
  }

  if (!me.isAdmin) {
    return <Navigate to="/members" />
  }


  return (
    <>
      <Container>
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
          <Col sm={2}>
            <Sidenav user={me} />
          </Col>
          <Col sm={10}>
            <Card className="adminCard" id="events">
              <Card.Header className="cardTitle">
                <h2>Event Actions</h2>
              </Card.Header>
              <Card.Body className="cardBody">
                <h5><Link to="/new_event" className="adminLink">Create new event</Link></h5>
                <h5>Click name of existing event to edit or delete</h5>
                <ul>
                  {sortedConcerts.map(concert => (
                    <li key={concert._id} className="adminLink" onClick={(e) => handleShowSelect(e, concert._id, concert.name, concert.songs)} data-type="event" data-name={concert.name}>{concert.name}</li>
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
                <h5>Sopranos</h5>
                <ul>
                  {sortedSops.map(user => (
                    <li key={user._id} className="adminLink" onClick={(e) => handleShowSelect(e, user._id, user.fullName)} data-type="member">{user.fullName}</li>
                  ))}
                </ul>
                <h5>Altos</h5>
                <ul>
                  {sortedAlts.map(user => (
                    <li key={user._id} className="adminLink" onClick={(e) => handleShowSelect(e, user._id, user.fullName)} data-type="member">{user.fullName}</li>
                  ))}
                </ul>
                <h5>Tenors</h5>
                <ul>
                  {sortedTens.map(user => (
                    <li key={user._id} className="adminLink" onClick={(e) => handleShowSelect(e, user._id, user.fullName)} data-type="member">{user.fullName}</li>
                  ))}
                </ul>
                <h5>Basses</h5>
                <ul>
                  {sortedBass.map(user => (
                    <li key={user._id} className="adminLink" onClick={(e) => handleShowSelect(e, user._id, user.fullName)} data-type="member">{user.fullName}</li>
                  ))}
                </ul>
                <h5>Non-Singer Staff & Board</h5>
                <ul>
                  {sortedOthers.map(user => (
                    <li key={user._id} className="adminLink" onClick={(e) => handleShowSelect(e, user._id, user.fullName)} data-type="member">{user.fullName}</li>
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
                <h5>Click existing post to edit or delete</h5>
                {sortedPosts.map(post => (
                  <li key={post._id} className="adminLink" onClick={(e) => handleShowSelect(e, post._id, post.title)} data-type="post">{dayjs(JSON.parse(post.postDate)).format("MMM D, YYYY")} - {post.postTitle}</li>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <SelectModal
          concertId={concertId}
          memberId={memberId}
          postId={postId}
          type={type}
          songs={songs}
          show={showSelect === true}
          hide={() => handleHideSelect()}
          confirm={(e) => handleShowConfirm(e)}
          showSelectSongs={(e) => handleShowSelectSongs(e)}
        />

        <SelectSongModal
          btnname={btnName}
          concertId={concertId}
          songs={songs}
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
          memberId={memberId}
          memberName={memberName}
          postId={postId}
          eventDelete={() => handleDeleteConcert(concertId)}
          memberDelete={() => handleDeleteMember(memberId)}
          postDelete={() => handleDeletePost(postId)}
          songsDelete={() => handleDeleteSongs(concertId, songsToDelete)}
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
    </>
  )
}

export default AdminPortal;