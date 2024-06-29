import React from 'react';
import {NavLink} from 'react-router-dom';
import {Container, Nav, Navbar} from 'react-bootstrap';

const Toolbar = () => {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <NavLink className="navbar-brand" to="/">
          Quotes Central
        </NavLink>
        <Nav className="ms-auto">
          <NavLink className="nav-link" to="/">Quotes</NavLink>
          <NavLink className="nav-link" to="/add-quote">Submit new quote</NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Toolbar;