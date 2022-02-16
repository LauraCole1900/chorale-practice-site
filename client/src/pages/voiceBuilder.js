/* eslint-disable no-unused-vars */
import { Navigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/gql";
import { Sidenav } from "../components/navbar";
import { VideoEmbed } from "../components/videoEmbed";
import Auth from "../utils/auth";
import "./style.css";


const VoiceBuilder = () => {

  //=====================//
  //    URL Variables    //
  //=====================//

  // Determines which page user is on, specifically for use with sidenav
  const urlArray = window.location.href.split("/");
  const urlId = urlArray[urlArray.length - 1];


  //=====================//
  //       Queries       //
  //=====================//

  const { loading, data, error } = useQuery(QUERY_ME);

  const me = data?.me || data?.currentId || {};


  if (loading) {
    return <h1>Loading....</h1>
  }; 
  
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />
  };


  return (
    <>
      <Container>
        <Row>
          <Col sm={2}>
            <Sidenav user={me} urlId={urlId} />
          </Col>

          <Col sm={8}>
            <h1>Building Beautiful Voices (playlist)</h1>
            <VideoEmbed src="https://www.youtube.com/embed/videoseries?list=PLjJPaTQW9-OjO0-oSvL68mMg7VYhyjrgZ" />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default VoiceBuilder;