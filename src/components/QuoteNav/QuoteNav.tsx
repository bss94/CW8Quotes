import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import {CATEGORIES} from '../../constants';
import {NavLink} from 'react-router-dom';

const QuoteNav = () => {
  return (
    <>
      <Navbar className="mt-5 mt-2 fw-medium text-muted">
        <Nav className="ms-auto flex-column">
          <NavLink to={`/`} className="nav-link">All</NavLink>
          {CATEGORIES.map(el => (
            <NavLink to={`/quotes/${el.id}`} className="nav-link" key={Math.random() * 1000}>
              {el.title}
            </NavLink>
          ))}
        </Nav>
      </Navbar>
    </>
  );
};

export default QuoteNav;