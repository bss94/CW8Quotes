import React from 'react';
import {Button, Card} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';


interface Props {
  text: string;
  author: string;
  id: string;
  deleteQuote: React.MouseEventHandler;
}

const QuoteItem: React.FC<Props> = ({
  text,
  author,
  id,
  deleteQuote
}) => {

  return (
    <div>
      <Card className="mt-3">
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">--{author}</Card.Subtitle>
          <Card.Title>{text}</Card.Title>
          <div className="text-end ">
            <NavLink to={`/quotes/${id}/edit`} className="btn btn-outline-primary">Edit</NavLink>
            <Button className=" btn-danger  mx-3" onClick={deleteQuote}>Delete</Button>
          </div>

        </Card.Body>
      </Card>
    </div>
  );
};

export default QuoteItem;