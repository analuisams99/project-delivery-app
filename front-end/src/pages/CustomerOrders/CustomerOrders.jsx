import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import OrdersCard from '../../components/OrdersCard';
import { getCustomerOrders } from '../../services/api';

function CustomerOrders() {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = JSON.parse(localStorage.getItem('userId'));
  const [orders, setOrders] = useState([]);

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

  const getAllOrders = async () => {
    const allOrders = await getCustomerOrders(user.token, userId.id);
    setOrders(allOrders);
  };

  const CUSTOMER = 'customer';

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div>
      <Header buttons={ [productsButton, ordersButton] } userName={ user.name } />
      { !orders.status
        ? <OrdersCard orders={ orders } role={ CUSTOMER } />
        : <p>Nenhum produto encontrado</p> }
    </div>
  );
}

export default CustomerOrders;
