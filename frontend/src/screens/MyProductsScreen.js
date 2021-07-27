import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

const MyProductsScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = JSON.parse(window.localStorage.getItem('loggedIn')).id;
  const myProds = useSelector((state) =>
    state.products.filter((prod) => prod.user === user)
  );

  if (myProds.length === 0) {
    history.push('/');
  }

  const newPrice = async (e, prod) => {
    const newProd = prod;
    if (e[0] === '$') {
      newProd.price = Number(e.slice(1));
    } else {
      newProd.price = Number(e);
    }
    console.log(newProd);
    try {
      const ok = await axios.post('/api/products/update', newProd);
      console.log(ok.data);
    } catch (error) {
      console.log(error);
    }
  };

  const newStock = async (e, prod) => {
    const newProd = prod;
    newProd.countInStock = e;
    try {
      await axios.post('/api/products/update', newProd);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Row>
      <Col md={12}>
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
                <Col md={2}>
                  <Form.Control
                    value={item.qty}
                    defaultValue={`$${item.price}`}
                    onBlur={(e) => newPrice(e.target.value, item)}
                  ></Form.Control>
                </Col>
                <Col md={2}>
                  <Form.Control
                    value={item.qty}
                    defaultValue={item.countInStock}
                    onBlur={(e) => newStock(e.target.value, item)}
                  ></Form.Control>
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
