import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Message from '../components/Message';
const LoginScreen = () => {
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
      window.localStorage.setItem('loggedIn', jwt);
      history.push('/');
    } catch (error) {
      console.log('authentication error!');
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
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" onClick={() => login()}>
        Submit
      </Button>
    </Form>
  );
};

export default LoginScreen;
