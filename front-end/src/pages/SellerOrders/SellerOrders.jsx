import React from 'react';
import Header from '../../components/Header';

function SellerOrders() {
  const userJSON = localStorage.getItem('user');
  const user = JSON.parse(userJSON);

  const ordersButton = {
    name: 'Pedidos',
    testId: 'customer_products__element-navbar-link-orders',
    role: 'seller/orders',
  };

  return (
    <div>
      <Header buttons={ [ordersButton] } userName={ user.name } />
      <h1>SellerOrders</h1>
    </div>
  );
}

export default SellerOrders;
