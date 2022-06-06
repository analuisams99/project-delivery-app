import React from 'react';
import Header from '../../components/Header';

const handleClick = () => {
  return console.log("role");
};

function CustomerOrders() {
  const productsButton = {
    name: 'Produtos',
    testId: 'customer_products__element-navbar-link-products',
    role: handleClick(),
  };
  const ordersButton = {
    name: 'Meus Pedidos',
    testId: 'customer_products__element-navbar-link-orders',
    role: handleClick(),
  };

  return (
    <div>
      <Header buttons={ [productsButton, ordersButton] } userName="aaa" />
      <h1>CustomerOrders</h1>
    </div>
  );
}

export default CustomerOrders;
