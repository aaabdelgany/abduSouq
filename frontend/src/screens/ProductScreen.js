import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useSelector } from 'react-redux';

const ProductScreen = ({ match }) => {
  const prod = useSelector((state) =>
    state.find((p) => p._id === match.params.id)
  );
  return (
    <>
      <Link className="btn btn-light my-3 " to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={prod.image} alt={prod.name} fluid />
        </Col>

        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{prod.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={prod.rating} numReviews={prod.numReviews} />
            </ListGroup.Item>
            <ListGroup.Item>Price: $ {prod.price}</ListGroup.Item>
            <ListGroup.Item>Description: {prod.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong> ${prod.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      ${prod.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={prod.countInStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
