import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
const ProductScreen = ({ match }) => {
  const user = JSON.parse(window.localStorage.getItem('loggedIn'));
  const dispatch = useDispatch();
  const history = useHistory();

  const prod = useSelector((state) =>
    state.products.find((p) => p._id === match.params.id)
  );
  const submitReview = async (reviewValue) => {
    const reviewItem = { id: user.id, reviewValue };
    let rating =
      (prod.rating * prod.numReviews + reviewValue) / (prod.numReviews + 1);
    let numReviews = prod.numReviews + 1;
    const reviews = prod.reviews.filter((review) => review.id !== user.id);
    console.log(reviews);
    console.log(prod.reviews);
    if (reviews.length < prod.reviews.length) {
      const oldVal = prod.reviews.find((rev) => rev.id === user.id);
      rating = (rating * numReviews - oldVal.reviewValue) / (numReviews - 1);
      numReviews = numReviews - 1;
    }
    reviews.push(reviewItem);
    const newProd = {
      ...prod,
      rating,
      numReviews,
      reviews,
    };

    try {
      const modProd = await axios.post('/api/products/update', newProd);
      dispatch({ type: 'MODIFY', data: modProd.data });
    } catch (error) {
      console.log(error);
    }
  };
  if (typeof prod == 'undefined') {
    history.push('/');
  }
  const addToCart = async (product) => {
    await dispatch({ type: 'ADD', data: product });
  };

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
              <Rating
                rating={prod.rating}
                numReviews={prod.numReviews}
                reviewFunc={submitReview}
              />
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
                  onClick={() => addToCart(prod)}
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
