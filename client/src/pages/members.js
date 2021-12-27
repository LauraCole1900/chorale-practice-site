import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Sidenav } from "../components/navbar";
import "./style.css";

const Members = () => {


  return (
    <>
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

          <h2 className="sideInfo">Staff</h2>
          <p className="sideLinks">Kari Munson, Administrator</p>
          <a href="mailto:placeholder@gmail.com" className="sideLinks">email Kari</a>
          <p className="sideLinks">555.555.5555</p>
          <br />
          <p className="sideLinks">Galen Darrough, Music Director</p>
          <a href="mailto:placeholder@gmail.com" className="sideLinks">email Galen</a>
          <p className="sideLinks">555.555.5555</p>
          <br />
          <p className="sideLinks">Susan McKenzie, Social Media</p>
          <a href="mailto:placeholder@gmail.com" className="sideLinks">email Susan</a>
          <p className="sideLinks">555.555.5555</p>
          <br />
          <p className="sideLinks">Jeff Walthall, Marketing Director</p>
          <a href="mailto:placeholder@gmail.com" className="sideLinks">email Jeff</a>
          <p className="sideLinks">555.555.5555</p>

          <h2 className="sideInfo">Section Leaders</h2>
          <p className="sideLinks">Anna Troyer, Soprano</p>
          <a href="mailto:placeholder@gmail.com" className="sideLinks">email Anna</a>
          <p className="sideLinks">555.555.5555</p>
          <br />
          <p className="sideLinks">Amie Cieminski, Alto</p>
          <a href="mailto:placeholder@gmail.com" className="sideLinks">email Amie</a>
          <p className="sideLinks">555.555.5555</p>
          <br />
          <p className="sideLinks">Chad Young, Tenor</p>
          <a href="mailto:placeholder@gmail.com" className="sideLinks">email Chad</a>
          <p className="sideLinks">555.555.5555</p>
          <br />
          <p className="sideLinks">Bob Locke, Bass</p>
          <a href="mailto:placeholder@gmail.com" className="sideLinks">email Bob</a>
          <p className="sideLinks">555.555.5555</p>
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
              Ino will go here
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Members;