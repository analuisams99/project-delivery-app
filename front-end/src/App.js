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
  NotFound,
} from './pages';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Navigate to="/login" /> } />
      <Route exact path="/login" element={ <Login /> } />
      <Route exact path="/register" element={ <Register /> } />
      <Route exact path="/customer/products" element={ <Products /> } />
      <Route exact path="/customer/checkout" element={ <Checkout /> } />
      <Route exact path="/customer/orders" element={ <CustomerOrders /> } />
      <Route exact path="/customer/orders/:id" element={ <CustomerOrderDetails /> } />
      <Route exact path="/seller/orders" element={ <SellerOrders /> } />
      <Route exact path="/seller/orders/:id" element={ <SellerOrderDetails /> } />
      <Route exact path="/admin/manage" element={ <AdminManage /> } />
      <Route exact path="/admin/manage" element={ <AdminManage /> } />
      <Route path="/*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
