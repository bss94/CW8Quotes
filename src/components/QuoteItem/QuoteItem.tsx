import React from 'react';
import {Button, Card} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import axiosApi from '../../axiosApi';


interface Props {
  text: string;
  author: string;
  id: string;
}
const QuoteItem: React.FC<Props> = ({
  text,
  author,
  id
}) => {
  const deletePost = async () => {
    await axiosApi.delete(`/quotes/${id}.json`);
  };
  return (
    <div>
      <Card className="mt-3">
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
          <Card.Title>{text}</Card.Title>
          <NavLink to={`/quotes/${id}/edit`} className="btn btn-outline-primary">Edit</NavLink>
          <Button className="btn-danger mx-3" onClick={deletePost}>Delete</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default QuoteItem;