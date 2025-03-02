import React from "react";
import { useContext } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { AuthContext } from "../context/authContext"; 

const NavigationBar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <Navbar expand="lg" className="bg-body-tertiary px-2">
      <Container fluid className="d-flex align-items-center">
        <Navbar.Brand href="/">BlogVerse</Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" className="ms-3" />

        <Navbar.Collapse id="navbarScroll">
          <div className="d-lg-flex flex-lg-row w-100 justify-content-end mt-3 mt-lg-0">
            {isAuthenticated ? (
              <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center">
                <Button variant="outline-primary" className="me-lg-2 w-lg-auto mb-2 mb-lg-0" href="/create-post">
                  Create Post
                </Button>
                <Button variant="outline-primary" className="me-lg-2 w-lg-auto mb-2 mb-lg-0" href="/dashboard">
                  Dashboard
                </Button>
                <Button variant="outline-danger" className="w-lg-auto" onClick={logout}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center">
                <Nav.Link href="/login" className="mb-2 mb-lg-0">Login</Nav.Link>
                <Button variant="outline-primary" className="w-100 w-lg-auto ms-lg-2" href="/signup">
                  Create Account
                </Button>
              </div>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;