import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Product from '../components/Product';
const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProds = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };
    fetchProds();
  }, []);
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((prod) => (
          <Col sm={12} md={6} lg={4} xl={3} key={prod._id}>
            <Product prod={prod} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
