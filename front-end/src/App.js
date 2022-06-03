import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import {
  Login,
  Register,
  Products,
  Checkout,
  CustomerOrders,
  CustomerOrderDetails,
  SellerOrders,
  SellerOrderDetails,
  AdminManage,
} from './pages';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Navigate to="/login" /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/customer/products" element={ <Products /> } />
      <Route path="/customer/checkout" element={ <Checkout /> } />
      <Route path="/customer/orders" element={ <CustomerOrders /> } />
      <Route path="/customer/orders/:id" element={ <CustomerOrderDetails /> } />
      <Route path="/seller/orders" element={ <SellerOrders /> } />
      <Route path="/seller/orders/:id" element={ <SellerOrderDetails /> } />
      <Route path="/admin/manage" element={ <AdminManage /> } />
    </Routes>
  );
}

export default App;
