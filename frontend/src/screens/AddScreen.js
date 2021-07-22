import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Form, Row, Button } from 'react-bootstrap';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const AddScreen = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDesc] = useState('');
  const [price, setPrice] = useState(0);
  const [countInStock, setStock] = useState(0);
  const [image, setImage] = useState('');

  const history = useHistory();
  const user = useSelector((state) => state.user);
  if (!user.isAdmin) {
    history.push('/');
  }

  const uploadHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
      const { data } = await axios.post('/api/imgs/imgUpload', formData);
      setImage(data.image);
    } catch (error) {
      console.log(error);
    }
  };

  const prodHandler = async (e) => {
    e.preventDefault();
    const product = {
      name,
      brand,
      category,
      description,
      price,
      countInStock,
      image,
      user: user.id,
    };
    try {
      const { data } = await axios.post('/api/products/addNew', product);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form action="#" onSubmit={prodHandler}>
      <Form.Row>
        <Form.Group controlId="ProductName">
          <Form.Label>Product Name:</Form.Label>
          <Form.Control
            required
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>
      </Form.Row>
      <Row>
        <Col>
          <Form.Label>Brand:</Form.Label>
          <Form.Control
            required
            onChange={(event) => setBrand(event.target.value)}
          />
        </Col>
        <Col>
          <Form.Label>Category:</Form.Label>
          <Form.Control
            required
            onChange={(event) => setCategory(event.target.value)}
          />
        </Col>
      </Row>
      <Form.Group controlId="DescrArea">
        <Form.Label>Description:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          onChange={(event) => setDesc(event.target.value)}
        />
      </Form.Group>
      <Row></Row>
      <Row>
        <Form.Group as={Col} controlId="formGridPrice">
          <Form.Label>Price:</Form.Label>
          <Form.Control
            required
            onChange={(event) => setPrice(event.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formStock">
          <Form.Label>Count in Stock:</Form.Label>
          <Form.Control
            required
            defaultValue="1"
            onChange={(event) => setStock(event.target.value)}
          />
        </Form.Group>
      </Row>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Product Image</Form.Label>
        <Form.Control type="file" onChange={uploadHandler} />
      </Form.Group>
      <Button type="submit">Add Product</Button>
    </Form>
  );
};

export default AddScreen;

// user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
// name: { type: String, required: true },
// image: { type: String, required: true },
// brand: { type: String, required: true },
// category: { type: String, required: true },
// description: { type: String, required: true },
// price: { type: Number, required: true },
// countInStock: { type: Number, required: true },
// rating: { type: Number, required: true, default: 0 },
// numReviews: { type: Number, required: true, default: 0 },
// reviews: [reviewSchema],
