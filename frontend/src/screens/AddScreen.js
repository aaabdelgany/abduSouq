import React from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Form, Row, Button } from 'react-bootstrap';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const AddScreen = () => {
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
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form>
      <Form.Row>
        <Form.Group controlId="ProductName">
          <Form.Label>Product Name:</Form.Label>
          <Form.Control required />
        </Form.Group>
      </Form.Row>
      <Row>
        <Col>
          <Form.Label>Brand:</Form.Label>
          <Form.Control required />
        </Col>
        <Col>
          <Form.Label>Category:</Form.Label>

          <Form.Control required />
        </Col>
      </Row>
      <Form.Group controlId="DescrArea">
        <Form.Label>Description:</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Row></Row>
      <Row>
        <Form.Group as={Col} controlId="formGridPrice">
          <Form.Label>Price:</Form.Label>
          <Form.Control required />
        </Form.Group>
        <Form.Group as={Col} controlId="formStock">
          <Form.Label>Count in Stock:</Form.Label>
          <Form.Control required defaultValue="1" />
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
