import "./navbar.css";
import React from "react";
import { Link } from "react-router-dom";
/*React-Bootstrap Libs for NavBar*/
import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavBar = () => {
  return (
    <div>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container className="py-1">
          <Navbar.Brand href="#home" className="fs-3 me-5">NHSS </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">


              <Link exact to="/" className="text-decoration-none navbarlinks me-3 mt-2 px-2">
              <span style={{"color": "white"}}>Stock</span>
              </Link>

              <Link exact to="/fine" className="text-decoration-none navbarlinks me-3 mt-2 px-2">
              <span style={{"color": "white"}}>Fine</span>
              </Link>

              <Link exact to="/lib" className="text-decoration-none navbarlinks me-3 mt-2 px-2">
              <span style={{"color": "white"}}>Library</span>
              </Link>

              <Link exact to="/attendance" className="text-decoration-none navbarlinks me-3 mt-2 px-2">
              <span style={{"color": "white"}}>Attendance</span>
              </Link>


              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
