import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";
import dayjs from "dayjs";
import { CompositeDecorator, convertFromRaw, Editor, EditorState } from "draft-js";
import { Sidenav } from "../components/navbar";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_POST, QUERY_ALL_ADMINS, QUERY_ALL_BIRTHDAYS, QUERY_ALL_POSTS, QUERY_ME } from "../utils/gql";
import Auth from "../utils/auth";
import "./style.css";

const Members = () => {
  const { loading: adminLoading, data: adminData, error: adminError } = useQuery(QUERY_ALL_ADMINS);
  const { loading: bdayLoading, data: bdayData, error: bdayError } = useQuery(QUERY_ALL_BIRTHDAYS);
  const { loading: meLoading, data: meData, error: meError } = useQuery(QUERY_ME);
  const { loading: postLoading, data: postData, error: postError } = useQuery(QUERY_ALL_POSTS);

  const [deleteExpired, { deleteError, deleteData }] = useMutation(DELETE_POST, {
    update(cache, { data: { deletePost } }) {
      try {
        // Retrieve existing post data that is stored in the cache
        const data = cache.readQuery({ query: QUERY_ALL_POSTS });
        const posts = data.allPosts;
        // Update the cache by combining existing post data with the newly created data returned from the mutation
        cache.writeQuery({
          query: QUERY_ALL_POSTS,
          // If we want new data to show up before or after existing data, adjust the order of this array
          data: { allPosts: [...posts, deletePost] },
        });
      } catch (err) {
        console.error(err);
      }
    }
  });

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
  const bDays = bdayData?.allBirthdays || [];
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

  const bdayCopy = [...bDays];
  const filteredBdays = bdayCopy.filter(user => user.birthday);
  const sortedBdays = filteredBdays.sort((a, b) => a.birthday > b.birthday ? 1 : -1);
  const nextMonthBdays = sortedBdays.filter(bday => dayjs(bday.birthday, "MM-DD") > dayjs().subtract(1, "day") && dayjs(bday.birthday, "MM-DD") < dayjs().add(1, "month"));

  const emergency = postArr.filter(post => post.postType === "emergency");
  const singersNote = postArr.filter(post => post.postType === "singers note");
  const sortedSingersNote = singersNote.sort((a, b) => a.postDate < b.postDate ? 1 : -1);
  const directorNote = postArr.filter(post => post.postType === "director");
  const sortedDirectorNote = directorNote.sort((a, b) => a.postDate < b.postDate ? 1 : -1);

  const emergencyToDelete = emergency.filter(post => dayjs(JSON.parse(post.postExpire)) < dayjs());

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
  }

  const Link = (props) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return (
      <a href={url} target="_blank" rel="noreferrer noopener">
        {props.children}
      </a>
    );
  };

  const decorator = new CompositeDecorator([
    {
      strategy: linkStrategy,
      component: Link,
    },
  ]);

  // Handles deletion of expired emergency posts
  const handleDeleteExpired = async (id) => {
    try {
      const { data } = await deleteExpired({
        variables: { id: id },
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (emergencyToDelete.length > 0) {
      emergencyToDelete.forEach(post => {
        handleDeleteExpired(post._id);
      });
    }
  }, [])

  if (adminLoading || bdayLoading || meLoading || postLoading) {
    return <h1>Loading....</h1>
  }

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />
  }

  if (adminError || bdayError || meError || postError) {
    console.error(JSON.stringify({ adminError }));
    console.error(JSON.stringify({ bdayError }));
    console.error(JSON.stringify({ meError }));
    console.error(JSON.stringify({ postError }));
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
              {me.position !== "guest" &&
                <>
                  <a href="https://mcusercontent.com/a8e2ad8a001699980605e15e4/files/bfd19bde-0fce-117a-d571-5b55f50af1f1/GChandbook_2021_2022_rev_2021_11_15.pdf" target="_blank" rel="noreferrer noopener" className="sideLinks">Current Handbook</a><br />
                  <a href="https://docs.google.com/spreadsheets/d/1V-8VwBaETctcQRyHIbVTXFvsAVutFlCktdyv-TRrOas/edit#gid=1766265975" target="_blank" rel="noreferrer noopener" className="sideLinks">Current Roster</a><br />
                  <a href="https://mcusercontent.com/a8e2ad8a001699980605e15e4/files/c246cf1f-0f53-e9f3-a3f2-0bc7210c6972/2020_FINAL_ROSTER_CHORALE_BOARD_2020_2021.pdf" target="_blank" rel="noreferrer noopener" className="sideLinks">Current Board</a><br />
                  <a href="https://drive.google.com/drive/folders/1rC_Sts79-gVboreuuiyYr5TjjV6Dr2WS" target="_blank" rel="noreferrer noopener" className="sideLinks">Travel Committee Folder</a><br />
                  <a href="https://drive.google.com/drive/folders/1xsKVJ4I8162VVGzDlCV2pIksLocR1aZD" target="_blank" rel="noreferrer noopener" className="sideLinks">Singer Info Folder</a><br />
                  <br />
                  <h2 className="sideInfo">Upcoming Birthdays</h2>
                  {nextMonthBdays.map(bday => (
                    <p key={bday._id} className="upcomingBdays">{dayjs(bday.birthday, "MM-DD").format("MMM D")} - {bday.fullName}</p>
                  ))}
                </>}
              <br />
            </aside>
          </Col>

          <Col sm={8}>
            {emergency.length > 0 &&
              <Row>
                <Col sm={11} className="centerCol">
                  <Card className="membersCard emergencyCard">
                    <Card.Header className="cardTitle">
                      <h1>{emergency[0].postTitle}</h1>
                      <p>{dayjs(JSON.parse(emergency[0].postDate)).format("MMM D, YYYY")}</p>
                    </Card.Header>
                    <Card.Body className="cardBody">
                      <Editor editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(emergency[0].postBody)), decorator)} readOnly={true} />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            }

            <Row>
              <Col sm={11} className="centerCol">
                <Card className="membersCard">
                  <Card.Header className="cardTitle">
                    <h2>Director's Corner</h2>
                    {sortedDirectorNote.length > 0 &&
                      <>
                        <h3>{sortedDirectorNote[0].title}</h3>
                        <p>{dayjs(JSON.parse(sortedDirectorNote[0].postDate)).format("MMM D, YYYY")}</p>
                      </>}
                  </Card.Header>
                  <Card.Body className="cardBody">
                    {sortedDirectorNote.length > 0
                      ? <Editor editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(sortedDirectorNote[0].postBody)), decorator)} readOnly={true} />
                      : <p>No Director's Notes found</p>}
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col sm={11} className="centerCol">
                <Card className="membersCard">
                  <Card.Header className="cardTitle">
                    <h2>Singer's Notes</h2>
                    {sortedSingersNote.length > 0 &&
                      <p>{dayjs(JSON.parse(sortedSingersNote[0].postDate)).format("MMM D, YYYY")}</p>
                    }
                  </Card.Header>
                  <Card.Body className="cardBody">
                    {sortedSingersNote.length > 0
                      ? <Editor editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(sortedSingersNote[0].postBody)), decorator)} readOnly={true} />
                      : <p>No Singer's Notes found</p>}
                  </Card.Body>
                </Card>
              </Col>
            </Row>

          </Col>

          <Col sm={2}>
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
          </Col>
        </Row>
      </Container >
    </>
  )
}

export default Members;