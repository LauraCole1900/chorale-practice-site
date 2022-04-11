/* eslint-disable no-unused-vars */
import { useMemo } from "react";
import { Navigate } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";
import dayjs from "dayjs";
import { CompositeDecorator } from "draft-js";
import { useQuery } from "@apollo/client";
import { QUERY_TRAVEL_POSTS, QUERY_ME } from "../utils/gql";
import Auth from "../utils/auth";
import "./style.css";

const Travel = () => {


  //=====================//
  //       Queries       //
  //=====================//

  const { loading: meLoading, data: meData, error: meError } = useQuery(QUERY_ME);
  const { loading: travelLoading, data: travelData, error: travelError } = useQuery(QUERY_TRAVEL_POSTS, {
    variables: { postType: "travel" }
  });

  const me = useMemo(() => { return meData?.me || {} }, [meData?.me]);
  const travelPosts = travelData?.travelPosts || [];


  //=====================//
  //   Draftjs Methods   //
  //=====================//

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
  };

  // Returns <a> tags for links
  const Link = (props) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return (
      <a href={url} target="_blank" rel="noreferrer noopener">
        {props.children}
      </a>
    );
  };

  // Consolidates decorators?
  const decorator = new CompositeDecorator([
    {
      strategy: linkStrategy,
      component: Link,
    },
  ]);


  //=====================//
  //   Run on page load  //
  //=====================//

  // useEffect(() => {
  //   setUserData(me)
  // }, [me]);


  //=====================//
  //    Conditionals     //
  //=====================//

  if (meLoading || travelLoading) {
    return <h1>Loading....</h1>
  }

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />
  };

  if (me.position === "guest") {
    return <Navigate to="/members" />
  }

  return (
    <>
      <div className="bground">
        <div className="fground">
          <Container fluid>
            <Row>
              <Col sm={{ span: 8, offset: 2 }}>
                <h1 className="pageHeader">Travel Page</h1>
              </Col>
            </Row>

            <Row>
              <Col sm={{ span: 8, offset: 2 }}>
                {travelPosts.length > 0
                  ? (travelPosts.map(post => (
                    <Card className="announcements" key={post._id}>
                      <Card.Header className="cardTitle">
                        <h1>{post.postTitle}</h1>
                        {Object.keys(post).length > 0 &&
                          <p>{dayjs(JSON.parse(post.postDate)).format("MMM D, YYYY")} </p>}
                      </Card.Header>
                      <Card.Body className="cardBody">
                        {Object.keys(post).length > 0
                          ? <div dangerouslySetInnerHTML={{ __html: post.postBody }} />
                          : <></>}
                      </Card.Body>
                    </Card>
                  )))
                  : <Card className="announcements">
                    <Card.Header className="cardTitle">
                      <h1>Travel Committee Announcements</h1>
                    </Card.Header>
                    <Card.Body className="cardBody">
                      <p>No travel committee announcements at this time.</p>
                    </Card.Body>
                  </Card>
                }
              </Col>
            </Row>

          </Container>
        </div>
      </div>
    </>
  )
}

export default Travel;