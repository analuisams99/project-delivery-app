import React from 'react';
import Header from '../../components/Header';

function CustomerOrderDetails() {
  const user = JSON.parse(localStorage.getItem('user'));

  const productsButton = {
    name: 'Produtos',
    testId: 'customer_products__element-navbar-link-products',
    role: 'customer/products',
  };
  const ordersButton = {
    name: 'Meus Pedidos',
    testId: 'customer_products__element-navbar-link-orders',
    role: 'customer/orders',
  };

  return (
    <div>
      <Header buttons={ [productsButton, ordersButton] } userName={ user.name } />
      <h1>CustomerOrderDetails</h1>
    </div>
  );
}

export default CustomerOrderDetails;
