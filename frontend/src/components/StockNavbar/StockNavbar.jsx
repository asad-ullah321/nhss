import React, {useEffect} from 'react'
import Navbar from "react-bootstrap/Navbar";
import "./stocknavbar.css"
import { Link } from "react-router-dom";
import { Nav, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';


const StockNavbar = () => {
  let location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location]);
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand className="fs-4 me-4">Stock Management  <span className="fs-2">|</span></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              
              <Link exact to = "/" className={`stockmanagementlinks text-decoration-none me-2 mt-1 px-2 pb-1 ${location.pathname === "/" ? "stockmanagementlinksactive":""}` }> Stock </Link>
              <Link exact to = "/issuedStock" className={`stockmanagementlinks text-decoration-none me-5 mt-1 px-2 pb-1 ${location.pathname === "/issuedStock" ? "stockmanagementlinksactive":""}`}> Issue Stock </Link>
              

              {/* <NavDropdown title="temp" id="basic-nav-dropdown">
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
                </NavDropdown>*/}

              {/*<Form className="d-flex">
                  <Form.Control
                    type="text"
                    placeholder="Search by name/location"
                    className="mx-3"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => onSearch(e)}
                  />
                 
                </Form>*/}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default StockNavbar
