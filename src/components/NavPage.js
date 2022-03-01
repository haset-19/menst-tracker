import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavPage.css";

export default function NavPage() {
  return (
    <>
      <div>
        <Navbar style={{ backgroundColor: "#8b008b" }}>
          <Container>
            <Navbar.Brand>
              <img
                className="img-fluid "
                style={{ height: 150, width: 250 }}
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
      </div>
    </>
  );
}
