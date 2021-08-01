import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Message from '../components/Message';
import { useDispatch } from 'react-redux';
const LoginScreen = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();
  const login = async () => {
    try {
      const jwt = await axios.post('/users/login', {
        email: username,
        password,
      });
      window.localStorage.setItem('loggedIn', JSON.stringify(jwt.data));
      const data = {
        name: jwt.data.name,
        isAdmin: jwt.data.isAdmin,
      };
      dispatch({ type: 'LOGIN', data });
      history.push('/');
    } catch (error) {
      setError('loginError');
      setTimeout(() => setError(''), 5000);
    }
  };
  return (
    <Form>
      <Message message={error} />
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(event) => setUsername(event.target.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Group>

      <Button variant="primary" onClick={() => login()}>
        Submit
      </Button>
    </Form>
  );
};

export default LoginScreen;
