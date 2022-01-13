import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";
import dayjs from "dayjs";
import { useQuery } from "@apollo/client";
import { QUERY_ME_PROFILE } from "../utils/gql";
import Auth from "../utils/auth";
import { Sidenav } from "../components/navbar";
import "./style.css";

const ProfilePage = () => {
  const currentUserId = Auth.getProfile().data?._id;

  const { loading: meLoading, data: meData, error: meError } = useQuery(QUERY_ME_PROFILE,
    {
      variables: { id: currentUserId }
    });

  const me = meData?.meProfile || {};

  const formatDate = (date) => {
    return dayjs(date, "MM-DD").format("MMMM D")
  };

  if (meLoading) {
    return <h1>Loading....</h1>
  };

  if (meError) {
    console.log(JSON.stringify(meError));
  };


  return (
    <>
      {!Auth.loggedIn()
        ? <Navigate to="/login" />
        : <Container>
          <Row>
            <Col sm={2}>
              <Sidenav user={me} />
            </Col>
            <Col sm={8}>
              <Card className="profileCard">
                <Card.Header className="cardTitle">
                  <h1>My Profile</h1>
                </Card.Header>
                <Card.Body className="cardBody">
                  <p>Full name: {me.fullName}</p>
                  <p>Prefer to be called: {me.preferredName}</p>
                  <p>Section: {me.section}</p>
                  <p>Birthday: {formatDate(me.birthday)}</p>
                  <p>Primary email: {me.email1}</p>
                  <p>Secondary email: {me.email2}</p>
                  <p>Primary phone: {me.phone1} ({me.phone1Type})</p>
                  <p>Secondary phone: {me.phone2} ({me.phone2Type})</p>
                  <p>Tertiary phone: {me.phone3} ({me.phone3Type})</p>
                  <p>Street address: {me.streetAddress}</p>
                  <p>City: {me.city}</p>
                  <p>State: {me.state}</p>
                  <p>ZIP Code: {me.zipCode}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      }
    </>
  )
}

export default ProfilePage;