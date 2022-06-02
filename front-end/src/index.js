import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import App from './App';
import { 
  Register,
  Products,
  Checkout,
  CustomerOrders,
  CustomerOrderDetails,
  SellerOrders,
  SellerOrderDetails,
  AdminManage,
} from './pages';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<App />} />
      <Route path="/" element={<Navigate to = "/login" replace />} />
      <Route path="/register" element={<Register />} />
      <Route path="/customer/products" element={<Products />} />
      <Route path="/customer/checkout" element={<Checkout />} />
      <Route path="/customer/orders" element={<CustomerOrders />} />
      <Route path="/customer/orders/:id" element={<CustomerOrderDetails />} />
      <Route path="/seller/orders" element={<SellerOrders />} />
      <Route path="/seller/orders/:id" element={<SellerOrderDetails />} />
      <Route path="/admin/manage" element={<AdminManage />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root'),
);

reportWebVitals();
