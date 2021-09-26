import React, { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import axios from 'axios';
import Product from '../components/Product';
import { useSelector, useDispatch } from 'react-redux';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  useEffect(() => {
    const fetchProds = async () => {
      const { data } = await axios.get('/api/products');
      dispatch({ type: 'INIT', data });
    };
    fetchProds();
  }, [dispatch]);
  return (
    <>
      <h1>Latest Products</h1>
      <Row sm={12} md={6} lg={4} xl={3}>
        {products.map((prod) => (
          <Product prod={prod} />
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
