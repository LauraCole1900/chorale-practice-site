import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";
import dayjs from "dayjs"
import { Sidenav } from "../components/navbar";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_POST, QUERY_ALL_ADMINS, QUERY_ALL_POSTS, QUERY_ME } from "../utils/gql";
import Auth from "../utils/auth";
import "./style.css";

const Members = () => {
  const currentUserId = Auth.getProfile().data?._id;

  // const [admins, setAdmins] = useState([]);
  // const [pageReady, setPageReady] = useState(false);
  const { loading: adminLoading, data: adminData, error: adminError } = useQuery(QUERY_ALL_ADMINS);
  const { loading: meLoading, data: meData, error: meError } = useQuery(QUERY_ME);
  const { loading: postLoading, data: postData, error: postError } = useQuery(QUERY_ALL_POSTS);

  const [deleteExpired, { deleteError, deleteData }] = useMutation(DELETE_POST);

  const capsCase = (str) => {
    const wordsArr = str.split(" ");
    const capsArr = wordsArr.map(word => word[0].toUpperCase() + word.substring(1));
    const casedStr = capsArr.join(" ");
    return casedStr;
  }

  const getSect = (str) => {
    const posArr = str.split(" ");
    return posArr[0];
  }

  const adminArr = adminData?.admins || [];
  const me = meData?.me || meData?.currentId || {};
  const postArr = postData?.allPosts || [];

  const administrator = adminArr.filter(admin => admin.position === "administrator");
  const director = adminArr.filter(admin => admin.position === "music director");
  const social = adminArr.filter(admin => admin.position === "digital media specialist");
  const marketing = adminArr.filter(admin => admin.position === "marketing director");
  const soprano = adminArr.filter(admin => admin.position === "section leader" && getSect(admin.section) === "Soprano");
  const alto = adminArr.filter(admin => admin.position === "section leader" && getSect(admin.section) === "Alto");
  const tenor = adminArr.filter(admin => admin.position === "section leader" && getSect(admin.section) === "Tenor");
  const bass = adminArr.filter(admin => admin.position === "section leader" && getSect(admin.section) === "Bass");

  const emergency = postArr.filter(post => post.postType === "emergency");
  const singersNote = postArr.filter(post => post.postType === "singers note");
  const sortedSingersNote = singersNote.sort((a, b) => a.postDate > b.postDate ? 1 : -1);
  const directorNote = postArr.filter(post => post.postType === "director");
  const sortedDirectorNote = directorNote.sort((a, b) => a.postDate > b.postDate ? 1 : -1);

  const emergencyToDelete = emergency.filter(post => dayjs(post.postExpire) > dayjs());

  // Handles deletion of expired emergency posts
  const handleDeleteExpired = async (id) => {
    try {
      const { data } = await deleteExpired({
        variables: { id: id },
      });
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (emergencyToDelete.length > 0) {
      emergencyToDelete.forEach(post => {
        handleDeleteExpired(post._id);
      });
    }
  }, [])

  if (adminLoading || meLoading || postLoading) {
    return <h1>Loading....</h1>
  }

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />
  }

  if (adminError || meError || postError) {
    console.log(JSON.stringify(adminError, meError, postError));
  }


  return (
    <>
      <Container>
        <Row>
          <Col sm={2}>
            <Sidenav user={me} />
            <aside className="sideInfo">
              <h2 className="sideInfo">Quick Links</h2>
              <a href="https://www.greeleychorale.org/" target="_blank" rel="noreferrer noopener" className="sideLinks">GC Website</a><br />
              <a href="https://www.facebook.com/greeleychorale/" target="_blank" rel="noreferrer noopener" className="sideLinks">GC Facebook</a><br />
              <a href="https://mcusercontent.com/a8e2ad8a001699980605e15e4/files/bfd19bde-0fce-117a-d571-5b55f50af1f1/GChandbook_2021_2022_rev_2021_11_15.pdf" target="_blank" rel="noreferrer noopener" className="sideLinks">Current Handbook</a><br />
              {me.position !== "guest" &&
                <>
                  <a href="https://docs.google.com/spreadsheets/d/1V-8VwBaETctcQRyHIbVTXFvsAVutFlCktdyv-TRrOas/edit#gid=1766265975" target="_blank" rel="noreferrer noopener" className="sideLinks">Current Roster</a><br />
                  <a href="https://mcusercontent.com/a8e2ad8a001699980605e15e4/files/c246cf1f-0f53-e9f3-a3f2-0bc7210c6972/2020_FINAL_ROSTER_CHORALE_BOARD_2020_2021.pdf" target="_blank" rel="noreferrer noopener" className="sideLinks">Current Board</a><br />
                  <a href="https://drive.google.com/drive/folders/1rC_Sts79-gVboreuuiyYr5TjjV6Dr2WS" target="_blank" rel="noreferrer noopener" className="sideLinks">Travel Committee Folder</a><br />
                  <a href="https://drive.google.com/drive/folders/1xsKVJ4I8162VVGzDlCV2pIksLocR1aZD" target="_blank" rel="noreferrer noopener" className="sideLinks">Singer Info Folder</a>
                </>}
              <br />

              {adminArr.length
                ? <>
                  <h2 className="sideInfo">Staff</h2>
                  {me.position !== "guest"
                    ? <>
                      <p className="sideLinks">{administrator[0].fullName}, {capsCase(administrator[0].position)}</p>
                      <a href={`mailto:${administrator[0].email1}`} className="sideLinks">email {administrator[0].preferredName}</a>
                      <p className="sideLinks">{administrator[0].phone1}</p>
                      <br />
                      <p className="sideLinks">{director[0].fullName}, {capsCase(director[0].position)}</p>
                      <a href={`mailto:${director[0].email1}`} className="sideLinks">email {director[0].preferredName}</a>
                      <p className="sideLinks">{director[0].phone1}</p>
                      <br />
                      <p className="sideLinks">{social[0].fullName}, {capsCase(social[0].position)}</p>
                      <a href={`mailto:${social[0].email1}`} className="sideLinks">email {social[0].preferredName}</a>
                      <p className="sideLinks">{social[0].phone1}</p>
                      <br />
                      <p className="sideLinks">{marketing[0].fullName}, {capsCase(marketing[0].position)}</p>
                      <a href={`mailto:${marketing[0].email1}`} className="sideLinks">email {marketing[0].preferredName}</a>
                      <p className="sideLinks">{marketing[0].phone1}</p>
                    </>
                    : <>
                      <p className="sideLinks">{administrator[0].fullName}, {capsCase(administrator[0].position)}</p>
                      <br />
                      <p className="sideLinks">{director[0].fullName}, {capsCase(director[0].position)}</p>
                      <br />
                      <p className="sideLinks">{social[0].fullName}, {capsCase(social[0].position)}</p>
                      <br />
                      <p className="sideLinks">{marketing[0].fullName}, {capsCase(marketing[0].position)}</p>
                    </>}

                  <h2 className="sideInfo">Section Leaders</h2>
                  {me.position !== "guest"
                    ? <>
                      <p className="sideLinks">{soprano[0].fullName}, {getSect(soprano[0].section)}</p>
                      <a href={`mailto:${soprano[0].email1}`} className="sideLinks">email {soprano[0].preferredName}</a>
                      <p className="sideLinks">{soprano[0].phone1}</p>
                      <br />
                      <p className="sideLinks">{alto[0].fullName}, {getSect(alto[0].section)}</p>
                      <a href={`mailto:${alto[0].email1}`} className="sideLinks">email {alto[0].preferredName}</a>
                      <p className="sideLinks">{alto[0].phone1}</p>
                      <br />
                      <p className="sideLinks">{tenor[0].fullName}, {getSect(tenor[0].section)}</p>
                      <a href={`mailto:${tenor[0].email1}`} className="sideLinks">email {tenor[0].preferredName}</a>
                      <p className="sideLinks">{tenor[0].phone1}</p>
                      <br />
                      <p className="sideLinks">{bass[0].fullName}, {getSect(bass[0].section)}</p>
                      <a href={`mailto:${bass[0].email1}`} className="sideLinks">email {bass[0].preferredName}</a>
                      <p className="sideLinks">{bass[0].phone1}</p>
                    </>
                    : <>
                      <p className="sideLinks">{soprano[0].fullName}, {getSect(soprano[0].section)}</p>
                      <br />
                      <p className="sideLinks">{alto[0].fullName}, {getSect(alto[0].section)}</p>
                      <br />
                      <p className="sideLinks">{tenor[0].fullName}, {getSect(tenor[0].section)}</p>
                      <br />
                      <p className="sideLinks">{bass[0].fullName}, {getSect(bass[0].section)}</p>
                    </>}
                </>
                : <>
                </>
              }
            </aside>
          </Col>
          <Col sm={10}>
            <Row>
              {emergency.length > 0 &&
                <Card className="membersCard emergencyCard">
                  <Card.Header className="cardTitle">
                    <h1>{emergency[0].postTitle}</h1>
                    <p>{dayjs(JSON.parse(emergency[0].postDate)).format("MMM D, YYYY")}</p>
                  </Card.Header>
                  <Card.Body className="cardBody">
                    {emergency[0].postBody}
                  </Card.Body>
                </Card>
              }
              <Col sm={6} className="sNotes">
                <Card className="membersCard">
                  <Card.Header className="cardTitle">
                    {sortedSingersNote.length > 0
                      ? <>
                        <h2>{sortedSingersNote[0].title}</h2>
                        <p>{dayjs(JSON.parse(sortedSingersNote[0].postDate)).format("MMM D, YYYY")}</p>
                      </>
                      : <>
                        <h2>No Singer's Notes Found</h2>
                      </>}
                  </Card.Header>
                  <Card.Body className="cardBody">
                    {sortedSingersNote.length > 0 &&
                      <p>{sortedSingersNote[0].body}</p>}
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6} className="dNotes">
                <Card className="membersCard">
                  <Card.Header className="cardTitle">
                    {sortedDirectorNote.length > 0
                      ? <>
                        <h2>{sortedDirectorNote[0].title}</h2>
                        <p>{dayjs(JSON.parse(sortedDirectorNote[0].postDate)).format("MMM D, YYYY")}</p>
                      </>
                      : <>
                        <h2>No Director's Notes Found</h2>
                      </>}
                  </Card.Header>
                  <Card.Body className="cardBody">
                    {sortedDirectorNote.length > 0 &&
                      <p>{sortedDirectorNote[0].body}</p>}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container >
    </>
  )
}

export default Members;