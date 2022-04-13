import { Link } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/gql";
import Auth from "../../utils/auth";
import "./style.css";


const Navibar = () => {

  //=====================//
  //    GraphQL Query    //
  //=====================//

  // eslint-disable-next-line no-unused-vars
  const { loading: meLoading, data: meData, error: meError } = useQuery(QUERY_ME);

  const me = meData?.me || {};


  //=====================//
  //     Conditionals    //
  //=====================//

  if (meLoading) {
    return <p>Loading....</p>
  };


  return (
    <>
      <Navbar expand="sm" className="navbar">
        <Navbar.Collapse id="basic-navbar-nav">
          <Navbar.Brand>
            <div>
              <Link to="/" className="navlink" aria-label="Greeley Chorale Logo">
                The Greeley Chorale Practice Site
              </Link>
            </div>
          </Navbar.Brand>
        </Navbar.Collapse>
        <Nav className="navbarKeep">
          <Link to="/" className="navlink">
            Home
          </Link>
          {Auth.loggedIn() ? (
            <>
              {me.isAdmin === true &&
                <Link to="/admin_portal" className="navlink">
                  Admin Portal
                </Link>}
              {me.position !== "guest" &&
                <>
                  <Link to="/profile" className="navlink">
                    Profile
                  </Link>
                  <Link to="/roster" className="navlink">
                    Current Roster
                  </Link>
                  <Link to="/travel" className="navlink">
                    Travel
                  </Link>
                  <Link to="/voice_building" className="navlink">
                    Voice Building
                  </Link>
                </>}
              <NavDropdown title="Section" id="nav-dropdown" className="navlink">
                <NavDropdown.Item eventKey="3.1" className="droplink" as={Link} to="/section/soprano">
                  Soprano
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="3.2" className="droplink" as={Link} to="/section/alto">
                  Alto
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="3.3" className="droplink" as={Link} to="/section/tenor">
                  Tenor
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="3.4" className="droplink" as={Link} to="/section/bass">
                  Bass
                </NavDropdown.Item>
              </NavDropdown>
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
      </Navbar>
    </>
  )
};

export default Navibar;