import React from "react";
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavPage.css";

export default function NavPage() {
  return (
    <>
      <div>
        <Container>
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
            <Col>
              <Navbar bg="info">
                <Col className="mt-4" sm={3}>
                  <Nav.Link style={{ color: "cddbgd" }} href="/">
                    Home
                  </Nav.Link>
                </Col>
                <Col className="mt-4" sm={3}>
                  <Nav.Link style={{ color: "#cddbgd" }} href="/plan">
                    Plan
                  </Nav.Link>
                </Col>
              </Navbar>
            </Col>
          </Row>
        </Container>

        {/* </Navbar> */}
      </div>
    </>
  );
}
