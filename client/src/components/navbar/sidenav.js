import { Link } from "react-router-dom";
import { Button, Nav, Navbar } from "react-bootstrap";
import "./style.css";


const Sidenav = ({ user, urlId }) => {


  return (
    <>
      <Navbar className={"sideNav " + (urlId !== "members" ? "sticky" : "")}>
        <Nav>
          <a href="#events"><Button className="navBtn">Events</Button></a>
        </Nav>
        <Nav>
          <a href="#members"><Button className="navBtn">Members</Button></a>
        </Nav>
        <Nav>
          <a href="#posts"><Button className="navBtn">Posts</Button></a>
        </Nav>
      </Navbar>
    </>
  )
}

export default Sidenav;