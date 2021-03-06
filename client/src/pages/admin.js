/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";
import dayjs from "dayjs";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_CONCERT, DELETE_POST, DELETE_USER, DELETE_MANY_SONGS, QUERY_ALL_CONCERTS, QUERY_ALL_POSTS, QUERY_ALL_USERS, QUERY_ME, SET_CONCERT_ORDER } from "../utils/gql";
import Auth from "../utils/auth";
import { timeToNow } from "../utils/dateUtils";
import { ConcertOrderModal, ConfirmModal, ErrorModal, SelectModal, SelectSongModal, SuccessModal } from "../components/modals";
import { Sidenav } from "../components/navbar";
import "./style.css";


const AdminPortal = () => {

  //======================//
  //    State variables   //
  //======================//

  // useEffect states
  const [sortedConcerts, setSortedConcerts] = useState([]);
  const [sortedSops, setSortedSops] = useState([]);
  const [sortedAlts, setSortedAlts] = useState([]);
  const [sortedTens, setSortedTens] = useState([]);
  const [sortedBass, setSortedBass] = useState([]);
  const [sortedOthers, setSortedOthers] = useState([]);
  const [sortedPosts, setSortedPosts] = useState([]);

  // States passed to modals
  const [btnName, setBtnName] = useState();
  const [type, setType] = useState();
  const [concertId, setConcertId] = useState();
  const [concertName, setConcertName] = useState();
  const [memberId, setMemberId] = useState();
  const [memberName, setMemberName] = useState();
  const [postId, setPostId] = useState();
  const [songs, setSongs] = useState([]);
  const [songsToDelete, setSongsToDelete] = useState([]);
  const [songsToOrder, setSongsToOrder] = useState([]);
  const [errThrown, setErrThrown] = useState();

  // Modal states
  const [showConfirm, setShowConfirm] = useState(false);
  const [showErr, setShowErr] = useState(false);
  const [showSelect, setShowSelect] = useState(false);
  const [showSelectSongs, setShowSelectSongs] = useState(false);
  const [showSetConcertOrder, setShowConcertOrder] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);


  //=====================//
  //    URL Variables    //
  //=====================//

  // Determines which page user is on, specifically for use with modals & sidenav
  const urlArray = window.location.href.split("/");
  const urlId = urlArray.at(-1);
  const urlType = urlArray.at(-2);


  //=====================//
  //       Queries       //
  //=====================//

  const { loading: concertLoading, data: concertData, error: concertError } = useQuery(QUERY_ALL_CONCERTS);
  const { loading: userLoading, data: userData, error: userError } = useQuery(QUERY_ALL_USERS);
  const { loading: meLoading, data: meData, error: meError } = useQuery(QUERY_ME);
  const { loading: postLoading, data: postData, error: postError } = useQuery(QUERY_ALL_POSTS);

  const concerts = useMemo(() => { return concertData?.allConcerts || [] }, [concertData?.allConcerts]);
  const users = useMemo(() => { return userData?.allUsers || [] }, [userData?.allUsers]);
  const posts = useMemo(() => { return postData?.allPosts || [] }, [postData?.allPosts]);
  const me = meData?.me || meData?.currentId || {};


  //=====================//
  //      Mutations      //
  //=====================//

  // eslint-disable-next-line no-unused-vars
  const [deleteConcert, { deleteConcertError, deleteConcertData }] = useMutation(DELETE_CONCERT, {
    update(cache, { data: { deleteConcert } }) {
      try {
        // Retrieve existing concert data that is stored in the cache
        const existingConcerts = cache.readQuery({ query: QUERY_ALL_CONCERTS });
        // Filter out data returned from the mutation
        const updatedConcerts = existingConcerts.allConcerts.filter(concert => concert._id !== deleteConcert._id);
        // Update the cache by setting concert data to the above-filtered data
        cache.writeQuery({
          query: QUERY_ALL_CONCERTS,
          // If we want new data to show up before or after existing data, adjust the order of this array
          data: { allConcerts: updatedConcerts },
        });
      } catch (err) {
        console.error(err);
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  const [deletePost, { deletePostError, deletePostData }] = useMutation(DELETE_POST, {
    update(cache, { data: { deletePost } }) {
      try {
        // Retrieve existing post data that is stored in the cache
        const existingPosts = cache.readQuery({ query: QUERY_ALL_POSTS });
        // Filter out data returned from the mutation
        const updatedPosts = existingPosts.allPosts.filter(post => post._id !== deletePost._id);
        // Update the cache by setting post data to the above-filtered data
        cache.writeQuery({
          query: QUERY_ALL_POSTS,
          // If we want new data to show up before or after existing data, adjust the order of this array
          data: { allPosts: updatedPosts },
        });
      } catch (err) {
        console.error(err);
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  const [deleteManySongs, { songsError, songsData }] = useMutation(DELETE_MANY_SONGS);

  const [deleteMember, { memberError, memberData }] = useMutation(DELETE_USER, {
    update(cache, { data: { deleteUser } }) {
      try {
        // Retrieve existing member data that is stored in the cache
        const existingMembers = cache.readQuery({ query: QUERY_ALL_USERS });
        // Filter out data returned from the mutation
        const updatedMembers = existingMembers.allUsers.filter(member => member._id !== deleteUser._id);
        // Update the cache by setting member data to the above-filtered data
        cache.writeQuery({
          query: QUERY_ALL_USERS,
          // If we want new data to show up before or after existing data, adjust the order of this array
          data: { allUsers: updatedMembers },
        });
      } catch (err) {
        console.error(err);
      }
    }
  });

  const [setConcertOrder, { concertOrderError, concertOrderData }] = useMutation(SET_CONCERT_ORDER);


  //=====================//
  //    Modal Methods    //
  //=====================//

  // Sets boolean to show or hide relevant modal
  const handleHideConfirm = () => setShowConfirm(false);
  const handleHideSelect = () => setShowSelect(false);
  const handleHideSelectSongs = () => setShowSelectSongs(false);
  const handleHideSetConcertOrder = () => setShowConcertOrder(false);
  const handleToggleSuccess = () => setShowSuccess(showSuccess => !showSuccess);
  const handleToggleErr = () => setShowErr(showErr => !showErr);

  // Shows Select modal
  const handleShowSelect = (e, id, name, songs) => {
    const { dataset } = e.target;
    setType(dataset.type);
    setShowSelect(true);
    switch (dataset.type) {
      case "event":
        const copiedSongs = [...songs];
        const sortedSongs = copiedSongs.sort((a, b) => a.concertOrder > b.concertOrder ? 1 : -1)
        setConcertId(id);
        setConcertName(name);
        setSongs(sortedSongs);
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
  const handleShowSelectSongs = (e) => {
    const { dataset } = e.target;
    setBtnName(dataset.btnname);
    handleHideSelect();
    setShowSelectSongs(true);
  };

  // Shows Set Concert Order modal
  const handleShowConcertOrder = (e) => {
    const { dataset } = e.target;
    setBtnName(dataset.btnname);
    handleHideSelect();
    setShowConcertOrder(true);
  };

  // Shows Confirm modal
  const handleShowConfirm = (e) => {
    const { dataset } = e.target;
    setBtnName(dataset.btnname);
    handleHideSelect();
    handleHideSelectSongs();
    setShowConfirm(true);
  };

  // Handles click on "Delete Concert" button on Confirm modal
  const handleDeleteConcert = async (id) => {
    handleHideConfirm();
    try {
      const { data } = await deleteConcert({
        variables: { id: id },
      });
      handleToggleSuccess();
    } catch (err) {
      console.error(err.message);
      setErrThrown(err.message);
      handleToggleErr();
    }
  };

  // Handles click on "Delete Member" button on Confirm modal
  const handleDeleteMember = async (id) => {
    handleHideConfirm();
    try {
      const { data } = await deleteMember({
        variables: { id: id },
      });
      handleToggleSuccess();
    } catch (err) {
      console.error(err.message);
      setErrThrown(err.message);
      handleToggleErr();
    }
  };

  // Handles click on "Delete Post" button on Confirm modal
  const handleDeletePost = async (id) => {
    handleHideConfirm();
    try {
      const { data } = await deletePost({
        variables: { id: id },
      });
      handleToggleSuccess();
    } catch (err) {
      console.error(err.message);
      setErrThrown(err.message);
      handleToggleErr();
    }
  };

  // Handles click on "Delete Repertoire" button on Confirm modal
  const handleDeleteSongs = async (id, songs) => {
    handleHideConfirm();
    try {
      const { data } = await deleteManySongs({
        variables: { _id: id, songsToDelete: songs },
      });
      handleToggleSuccess();
    } catch (err) {
      console.error(err.message);
      setErrThrown(err.message);
      handleToggleErr();
    }
    setSongsToDelete([]);
  };

  // Handles click on "Set Concert Order" on Concert Order modal
  const handleConcertOrder = async (id, songs) => {
    handleHideSetConcertOrder();
    try {
      const { data } = await setConcertOrder({
        variables: { id: id, songs: songs },
      });
      handleToggleSuccess();
    } catch (err) {
      console.log(JSON.parse(JSON.stringify(err)));
      setErrThrown(err.message);
      handleToggleErr();
    }
    setSongsToOrder([]);
  }

  // Filters users by section, then sorts by first name, then last name
  const sortSection = (singers, section) => {
    let filteredSingers;
    if (section.length === 2) {
      filteredSingers = singers.filter(singer => section.includes(singer.section));
    } else {
      filteredSingers = singers.filter(singer => !section.includes(singer.section));
    }
    const sortByFName = filteredSingers.sort((a, b) => a.firstName < b.firstName ? 1 : -1);
    const sortedSingers = sortByFName.sort((a, b) => a.lastName > b.lastName ? 1 : -1);
    return sortedSingers;
  };


  //=====================//
  //   Run on page load  //
  //=====================//

  useEffect(() => {
    // If there are concerts
    if (concerts.length) {
      const upcomingConcerts = concerts.filter(concert => !concert.time[0].includes("am") && !concert.time[0].includes("pm")
        ? dayjs(concert.date.at(-1), "M-D-YYYY") >= dayjs()
        : (timeToNow(concert.date.at(-1), concert.time.at(-1))) > dayjs()
      );
      const sortedByTime = upcomingConcerts.sort((a, b) => dayjs(a.time[0], "h:mma") - dayjs(b.time[0], "h:mma") ? -1 : 1);
      const sortedByDate = sortedByTime.sort((a, b) => (dayjs(a.date[0], "MM-DD-YYYY") > dayjs(b.date[0], "MM-DD-YYYY")) ? 1 : -1);
      setSortedConcerts(sortedByDate);
    };

    // If there are posts
    if (posts.length) {
      const postsToSort = [...posts];
      const postsByDate = postsToSort.sort((a, b) => a.postDate > b.postDate ? 1 : -1);
      setSortedPosts(postsByDate);
    };

    // If there are users
    if (users.length) {
      const sortedSoprano = sortSection(users, ["Soprano I", "Soprano II"]);
      const sortedAlto = sortSection(users, ["Alto I", "Alto II"]);
      const sortedTenor = sortSection(users, ["Tenor I", "Tenor II"]);
      const sortedBass = sortSection(users, ["Bass I", "Bass II"]);
      const sortedOther = sortSection(users, ["Soprano I", "Soprano II", "Alto I", "Alto II", "Tenor I", "Tenor II", "Bass I", "Bass II", "Guest"]);
      setSortedSops(sortedSoprano);
      setSortedAlts(sortedAlto);
      setSortedTens(sortedTenor);
      setSortedBass(sortedBass);
      setSortedOthers(sortedOther);
    };
  }, [concerts, posts, users]);


  //=====================//
  //    Conditionals     //
  //=====================//

  if (concertLoading || meLoading || postLoading || userLoading) {
    return <h1>Loading....</h1>
  };

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />
  };

  if (!me.isAdmin) {
    return <Navigate to="/members" />
  };


  return (
    <>
      <div className="bground">
        <div className="fground">
          <Container fluid>
            <Row>
              <Col sm={12} className="center">
                <h1>Admin Portal</h1>
              </Col>
            </Row>

            <Row>
              <Col sm={2}>
                <Sidenav />
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
                      <li key={post._id} className="adminLink" onClick={(e) => handleShowSelect(e, post._id, post.postTitle)} data-type="post">{dayjs(JSON.parse(post.postDate)).format("MMM D, YYYY")} - {post.postTitle}</li>
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
              showConcertOrder={(e) => handleShowConcertOrder(e)}
            />

            <SelectSongModal
              btnname={btnName}
              setbtnname={setBtnName}
              concertId={concertId}
              songs={songs}
              show={showSelectSongs === true}
              hide={() => handleHideSelectSongs()}
              confirm={(e) => handleShowConfirm(e)}
              setSongsToDelete={setSongsToDelete}
              songsToDelete={songsToDelete}
            />

            <ConcertOrderModal
              btnname={btnName}
              setbtnname={setBtnName}
              concertId={concertId}
              songs={songs}
              show={showSetConcertOrder === true}
              hide={() => handleHideSetConcertOrder()}
              confirm={(e) => handleShowConfirm(e)}
              setConcertOrder={handleConcertOrder}
              setSongsToOrder={setSongsToOrder}
              songsToOrder={songsToOrder}
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
              hide={() => handleToggleSuccess()}
            />

            <ErrorModal
              user={me}
              urlid={urlId}
              urltype={urlType}
              errmsg={errThrown}
              btnname={btnName}
              show={showErr === true}
              hide={() => handleToggleErr()}
            />

          </Container>
        </div>
      </div>
    </>
  )
}

export default AdminPortal;