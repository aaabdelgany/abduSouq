import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.min.css';
import './index.css';
import App from './App';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import prodReducer from './reducers/prodReducer';
import userReducer from './reducers/userReducer';
import cartReducer from './reducers/cartReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducers = combineReducers({ products: prodReducer, user: userReducer,cart: cartReducer});
const store = createStore(reducers, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
