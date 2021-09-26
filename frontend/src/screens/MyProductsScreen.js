import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Image, ListGroup, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const MyProductsScreen = () => {
  const history = useHistory();
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
  const placeholder = '/images/reacticon.jpeg';

  return (
    <Row>
      <Col md={12}>
        <h1>My Products</h1>
        <ListGroup variant="flush">
          {myProds.map((item) => (
            <ListGroup.Item key={item._id}>
              <Row>
                <Col md={2}>
                  <Image
                    src={
                      item.image.slice(8, 13) === 'image'
                        ? placeholder
                        : item.image
                    }
                    alt={item.name}
                    fluid
                    rounded
                  />
                </Col>
                <Col md={3}>
                  <Link to={`/products/${item._id}`}>{item.name}</Link>
                </Col>
                <Col md={3}>
                  <Form.Control
                    value={item.qty}
                    defaultValue={`$${item.price}`}
                    onBlur={(e) => newPrice(e.target.value, item)}
                  ></Form.Control>
                </Col>
                <Col md={3}>
                  <Form.Control
                    value={item.qty}
                    defaultValue={item.countInStock}
                    onBlur={(e) => newStock(e.target.value, item)}
                  ></Form.Control>
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
