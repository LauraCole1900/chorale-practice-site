import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Sidenav } from "../components/navbar";
import "./style.css";

const Members = () => {


  return (
    <>
      <Row>
        <Col sm={2}>
          <Sidenav />
        </Col>
      </Row>
    </>
  )
}

export default Members;