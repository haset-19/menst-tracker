import React from "react";
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavPage.css";
export default function NavPage() {
  return (
    <>
      <div>
        <Container className="w-100">
          <Row>
            <Navbar bg="primary" variant="dark">
              <Col>
                <Navbar.Brand>
                  {" "}
                  <img src="IMAGE" alt="LOGO" />
                </Navbar.Brand>
              </Col>
              <Col>
                <Nav.Link style={{ color: "#ffffff" }} href="/">
                  Home
                </Nav.Link>
              </Col>
              <Col>
                <Nav.Link style={{ color: "#ffffff" }} href="/plan">
                  Plan
                </Nav.Link>
              </Col>
            </Navbar>
          </Row>
        </Container>
      </div>
    </>
  );
}
