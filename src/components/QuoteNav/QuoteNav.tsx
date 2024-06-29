import React from 'react';
import {ListGroup} from 'react-bootstrap';
import {CATEGORIES} from '../../constants';
import {NavLink} from 'react-router-dom';

const QuoteNav = () => {
  return (
    <>
        <ListGroup>
          <ListGroup.Item><NavLink to={`/`} className='nav-link text-muted'>All</NavLink></ListGroup.Item>
          {CATEGORIES.map(el=>(
            <ListGroup.Item key={Math.random()*1000}>
              <NavLink to={`/quotes/${el.id}`} className='nav-link text-muted'>{el.title}</NavLink>
            </ListGroup.Item>
          ))}
        </ListGroup>
    </>
  );
};

export default QuoteNav;