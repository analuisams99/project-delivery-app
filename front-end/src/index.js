import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
// import { 
//   Register,
//   Products,
//   Checkout,
//   CustomerOrders,
//   CustomerOrderDetails,
//   SellerOrders,
//   SellerOrderDetails,
//   AdminManage,
// } from './pages';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);

reportWebVitals();
