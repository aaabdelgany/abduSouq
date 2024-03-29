import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom';
const Product = ({ prod }) => {
  const placeholder = '/images/reacticon.jpeg';

  return (
    <div>
      <Card className="my-3 p-3 rounded" key={prod._id}>
        <Link to={`/products/${prod._id}`}>
          <Card.Img
            variant="top"
            src={prod.image.slice(8, 13) === 'image' ? placeholder : prod.image}
          />
        </Link>
        <Card.Body as="div">
          <Link to={`/products/${prod._id}`}>
            <Card.Title as="div">
              <strong>{prod.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as="div">
            <Rating
              rating={prod.rating}
              numReviews={prod.numReviews}
              reviewFunc={() => void 0}
            />
          </Card.Text>
          <Card.Text as="h3">${prod.price}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;
