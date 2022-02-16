import React from "react";
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavPage.css";

export default function NavPage() {
  return (
    <>
      <div>
        <Navbar bg="primary">
          <Container>
            <Navbar.Brand>
              <img
                className="img-fluid "
                style={{ height: 150, width: 200 }}
                src="/logo.png"
                alt="logo"
              />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link
                  href="/"
                  style={{ fontSize: 20 }}
                  className="text-white"
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  style={{ fontSize: 20 }}
                  className="text-white"
                  href="/plan"
                >
                  Plan
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* <Container>
          <Row>
            <Col sm={4}>
              <Navbar.Brand
                className="img-fluid" 
                // style={{ maxHeight: 100, maxWidth: 30 }}
              >
                {" "}
                <img
                  className="img-fluid"
                  style={{ height: 200, width: 300 }}
                  src="/logo.png"
                  alt="logo"
                />
              </Navbar.Brand>
            </Col>
            {/* <Navbar> */}
        {/* <Col className="mt-4" sm={3}>
              <Nav.Link style={{ color: "#cddbgd" }} href="/">
                Home
              </Nav.Link>
            </Col>
            <Col className="mt-4" sm={3}>
              <Nav.Link style={{ color: "#cddbgd" }} href="/plan">
                Plan
              </Nav.Link>
            </Col>
            {/* </Navbar> */}
        {/* </Row>
        </Container>  */}

        {/* </Navbar> */}
      </div>
    </>
  );
}
