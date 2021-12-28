import { Link } from "react-router-dom";
import { Image, Nav, Navbar } from "react-bootstrap";
// import gclogo from "../../pix/chorale-logo.webp";
import "./style.css";

const Navibar = () => {


  return (
    <>
      <Navbar expand="sm" className="navbar">
        <Navbar.Brand>
          <div>
            {/* <Image src={gclogo} alt="Greeley Chorale logo" /> */}
            <Link to="/" className="navlink" aria-label="Greeley Chorale Logo">
              The Greeley Chorale Practice Site
            </Link>
          </div>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav" className="navbarCollapse">
          <Nav>
            <a href="https://www.greeleychorale.org/" target="_blank" rel="noreferrer noopener" className="navlink">greeleychorale.org</a>
            <Link to="/" className="navlink">
              Home
            </Link>
            <Link to="/login" className="navlink">
              Login
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
};

export default Navibar;