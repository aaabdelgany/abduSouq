import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import LoginScreen from './screens/LoginScreen';
import CartScreen from './screens/CartScreen';
import AddScreen from './screens/AddScreen';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { useSelector } from 'react-redux';

function App() {
  // const user = useSelector((state) => state.user);
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="py-3">
          <Container>
            <Switch>
              <Route path="/products/:id" component={ProductScreen} />
              <Route path="/login" component={LoginScreen} />
              <Route path="/logout" component={HomeScreen} />
              <Route path="/add" component={AddScreen} />
              <Route path="/cart" component={CartScreen} />
              <Route path="/" component={HomeScreen} />
            </Switch>
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
