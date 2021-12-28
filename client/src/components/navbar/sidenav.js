import { Link } from "react-router-dom";
import { Button, Nav, Navbar } from "react-bootstrap";
import "./style.css";

const Sidenav = () => {


  return (
    <>
      <Navbar className="sideNav">
        <Nav>
          <Link to="/section/soprano"><Button className="navBtn">Soprano</Button></Link>
        </Nav>
        <Nav>
          <Link to="/section/alto"><Button className="navBtn">Alto</Button></Link>
        </Nav>
        <Nav>
          <Link to="/section/tenor"><Button className="navBtn">Tenor</Button></Link>
        </Nav>
        <Nav>
          <Link to="/section/bass"><Button className="navBtn">Bass</Button></Link>
        </Nav>
        <Nav>
          <Link to="/members"><Button className="navBtn">Members</Button></Link>
        </Nav>
      </Navbar>
    </>
  )
}

export default Sidenav;