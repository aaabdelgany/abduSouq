import React from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import Message from '../components/Message';
import { useSelector, useDispatch } from 'react-redux';

const MyProductsScreen = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(window.localStorage.getItem('loggedIn')).id;
  const myProds = useSelector((state) =>
    state.products.filter((prod) => prod.user === user)
  );
  console.log(myProds);
  return (
    <Row>
      <Col md={8}>
        <h1>My Products</h1>
        <ListGroup variant="flush">
          {myProds.map((item) => (
            <ListGroup.Item key={item._id}>
              <Row>
                <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid rounded />
                </Col>
                <Col md={3}>
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </Col>
                <Col md={2}>${item.price}</Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={item.qty}
                    onChange={(e) =>
                      dispatch({
                        type: 'UPDATE',
                        data: { id: item._id, qty: Number(e.target.value) },
                      })
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => dispatch({ type: 'REMOVE', data: item._id })}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    </Row>
  );
};

export default MyProductsScreen;
