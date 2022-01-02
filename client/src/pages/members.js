// import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Sidenav } from "../components/navbar";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_ADMINS } from "../utils";
import "./style.css";

const Members = () => {
  // const [admins, setAdmins] = useState([]);
  // const [pageReady, setPageReady] = useState(false);
  const { loading, data, error } = useQuery(QUERY_ALL_ADMINS);

  const capsCase = (str) => {
    const wordsArr = str.split(" ");
    const capsArr = wordsArr.map(word => word[0].toUpperCase() + word.substring(1));
    const casedStr = capsArr.join(" ");
    return casedStr;
  }

  const firstName = (str) => {
    const nameArr = str.split(" ");
    return nameArr[0];
  }

  const adminArr = data?.admins || [];
  const administrator = adminArr.filter(admin => admin.position === "administrator");
  const director = adminArr.filter(admin => admin.position === "music director");
  const social = adminArr.filter(admin => admin.position === "social media");
  const marketing = adminArr.filter(admin => admin.position === "marketing director");
  const soprano = adminArr.filter(admin => admin.position === "section leader" && admin.section === "soprano");
  const alto = adminArr.filter(admin => admin.position === "section leader" && admin.section === "alto");
  const tenor = adminArr.filter(admin => admin.position === "section leader" && admin.section === "tenor");
  const bass = adminArr.filter(admin => admin.position === "section leader" && admin.section === "bass");


  // useEffect(() => {
  //   if (adminArr.length) {
  //     setAdmins(adminArr);
  //     setPageReady(true);
  //   }
  // }, [adminArr])

  if (loading) {
    return <h1>Loading....</h1>
  }

  if (error) {
    console.log(JSON.stringify(error))
  }


  return (
    <>
      <Container>
        <Row>
          <Col sm={2}>
            <Sidenav />
            <h2 className="sideInfo">Quick Links</h2>
            <a href="https://www.facebook.com/greeleychorale/" target="_blank" rel="noreferrer noopener" className="sideLinks">GC Facebook</a><br />
            <a href="https://docs.google.com/spreadsheets/d/1V-8VwBaETctcQRyHIbVTXFvsAVutFlCktdyv-TRrOas/edit#gid=1766265975" target="_blank" rel="noreferrer noopener" className="sideLinks">Current Roster</a><br />
            <a href="https://mcusercontent.com/a8e2ad8a001699980605e15e4/files/c246cf1f-0f53-e9f3-a3f2-0bc7210c6972/2020_FINAL_ROSTER_CHORALE_BOARD_2020_2021.pdf" target="_blank" rel="noreferrer noopener" className="sideLinks">Current Board</a><br />
            <a href="https://mcusercontent.com/a8e2ad8a001699980605e15e4/files/bfd19bde-0fce-117a-d571-5b55f50af1f1/GChandbook_2021_2022_rev_2021_11_15.pdf" target="_blank" rel="noreferrer noopener" className="sideLinks">Current Handbook</a><br />
            <a href="https://drive.google.com/drive/folders/1rC_Sts79-gVboreuuiyYr5TjjV6Dr2WS" target="_blank" rel="noreferrer noopener" className="sideLinks">Travel Committee Folder</a><br />
            <a href="https://drive.google.com/drive/folders/1xsKVJ4I8162VVGzDlCV2pIksLocR1aZD" target="_blank" rel="noreferrer noopener" className="sideLinks">Singer Info Folder</a>
            <br />

            {adminArr.length
              ? <>
                <h2 className="sideInfo">Staff</h2>
                <p className="sideLinks">{administrator[0].fullName}, {capsCase(administrator[0].position)}</p>
                <a href="mailto:placeholder@gmail.com" className="sideLinks">email {firstName(administrator[0].fullName)}</a>
                <p className="sideLinks">{administrator[0].phone}</p>
                <br />
                <p className="sideLinks">{director[0].fullName}, {capsCase(director[0].position)}</p>
                <a href="mailto:placeholder@gmail.com" className="sideLinks">email {firstName(director[0].fullName)}</a>
                <p className="sideLinks">{director[0].phone}</p>
                <br />
                <p className="sideLinks">{social[0].fullName}, {capsCase(social[0].position)}</p>
                <a href="mailto:placeholder@gmail.com" className="sideLinks">email {firstName(social[0].fullName)}</a>
                <p className="sideLinks">{social[0].phone}</p>
                <br />
                <p className="sideLinks">{marketing[0].fullName}, {capsCase(marketing[0].position)}</p>
                <a href="mailto:placeholder@gmail.com" className="sideLinks">email {firstName(marketing[0].fullName)}</a>
                <p className="sideLinks">{marketing[0].phone}</p>

                <h2 className="sideInfo">Section Leaders</h2>
                <p className="sideLinks">{soprano[0].fullName}, {capsCase(soprano[0].section)}</p>
                <a href="mailto:placeholder@gmail.com" className="sideLinks">email {firstName(soprano[0].fullName)}</a>
                <p className="sideLinks">{soprano[0].phone}</p>
                <br />
                <p className="sideLinks">{alto[0].fullName}, {capsCase(alto[0].section)}</p>
                <a href="mailto:placeholder@gmail.com" className="sideLinks">email {firstName(alto[0].fullName)}</a>
                <p className="sideLinks">{alto[0].phone}</p>
                <br />
                <p className="sideLinks">{tenor[0].fullName}, {capsCase(tenor[0].section)}</p>
                <a href="mailto:placeholder@gmail.com" className="sideLinks">email {firstName(tenor[0].fullName)}</a>
                <p className="sideLinks">{tenor[0].phone}</p>
                <br />
                <p className="sideLinks">{bass[0].fullName}, {capsCase(bass[0].section)}</p>
                <a href="mailto:placeholder@gmail.com" className="sideLinks">email {firstName(bass[0].fullName)}</a>
                <p className="sideLinks">{bass[0].phone}</p>
              </>
              : <>
              </>
            }
          </Col>
          <Col sm={5}>
            <Card>
              <Card.Header className="cardTitle">
                <h2>Singer's Notes</h2>
                <p>Date will go here</p>
              </Card.Header>
              <Card.Body className="cardBody">
                Info will go here
              </Card.Body>
            </Card>
          </Col>
          <Col sm={5}>
            <Card>
              <Card.Header className="cardTitle">
                <h2>Director's Corner</h2>
                <p>Date will go here</p>
              </Card.Header>
              <Card.Body className="cardBody">
                Info will go here
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Members;