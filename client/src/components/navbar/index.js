import { Link } from "react-router-dom";
import { Image, Nav, Navbar } from "react-bootstrap";
import gclogo from "../../pix/chorale-logo.webp";
import "./style.css";

const Navibar = () => {


  return (
    <>
      <Navbar expand="sm" className="navbar">
        <Navbar.Brand>
          <Link to="/" className="logo" aria-label="Greeley Chorale Logo">
            <Image src={gclogo} alt="Greeley Chorale logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav" className="navbarCollapse">
          <Nav>
            <Link to="/" className="navlink">
              Home
            </Link>
            <Link to="/current" className="navlink">
              Login
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
};

export default Navibar;