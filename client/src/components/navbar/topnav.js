import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
// import gclogo from "../../pix/chorale-logo.webp";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/gql";
import Auth from "../../utils/auth";
import "./style.css";

const Navibar = () => {
  const { loading: meLoading, data: meData, error: meError } = useQuery(QUERY_ME);

  const me = meData?.me || {};

  if (meLoading) {
    return <p>Loading....</p>
  }


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
            <Link to="/" className="navlink">
              Home
            </Link>
            {Auth.loggedIn() ? (
              <>
                {me.position !== "guest" &&
                  <Link to="/profile" className="navlink">
                    Profile
                  </Link>}
                <Link to="/members" className="navlink">
                  Members
                </Link>
                <Nav.Link onClick={Auth.logout} className="navlink">Logout</Nav.Link>
              </>
            ) : (
              <Link to="/login" className="navlink">
                Login
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
};

export default Navibar;