import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

const Header = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state)=>state.cart);
  const cartItems = cart.reduce((acc, item) => acc + item.qty, 0)

  const dispatch = useDispatch();

  const clearLog = () => {
    dispatch({ type: 'LOGOUT' });
    window.localStorage.removeItem('loggedIn');
  };

  const SignIn = () => {
    if (user.name) {
      return (
        <LinkContainer to="/" onClick={clearLog}>
          <Nav.Link>
            <i className="fas fa-user"></i>
            Sign out ({user.name})
          </Nav.Link>
        </LinkContainer>
      );
    } else {
      return (
        <LinkContainer to="/login">
          <Nav.Link>
            <i className="fas fa-user"></i>
            Sign In
          </Nav.Link>
        </LinkContainer>
      );
    }
  };
  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>AbduSouq</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>Cart ({cart.length===0 ? '' : cartItems})
                </Nav.Link>
              </LinkContainer>
              <SignIn />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
