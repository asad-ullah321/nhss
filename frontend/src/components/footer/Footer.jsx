import React from "react";
import  "./footer.css"
import { Nav } from "react-bootstrap";
const Footer = () => {
  return (
    <div>
      <Nav className="justify-content-center footer " activeKey="/home">
        <Nav.Item>Designed by MicroSlush</Nav.Item>
      </Nav>
    </div>
  );
};

export default Footer;
