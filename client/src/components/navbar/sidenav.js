import { Link } from "react-router-dom";
import { Button, Nav, Navbar } from "react-bootstrap";
import "./style.css";


const Sidenav = ({ user, urlId }) => {


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
          <Link to="/voice_building"><Button className="navBtn">Voice Building Exercises</Button></Link>
        </Nav>
        {(user.isAdmin === true &&
          urlId !== "admin_portal")
          ? <>
            <Nav>
              <Link to="/admin_portal"><Button className="navBtn">Admin Portal</Button></Link>
            </Nav>
          </>
          : <>
          </>}
      </Navbar>
    </>
  )
}

export default Sidenav;