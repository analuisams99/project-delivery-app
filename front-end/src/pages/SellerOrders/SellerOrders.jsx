import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import OrdersCard from '../../components/OrdersCard';
import { getSellerOrders } from '../../services/api';

function SellerOrders() {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = JSON.parse(localStorage.getItem('userId'));
  const [orders, setOrders] = useState([]);

  const ordersButton = {
    name: 'Pedidos',
    dataId: 'customer_products__element-navbar-link-orders',
    role: 'seller/orders',
  };

  const getAllOrders = async () => {
    const allOrders = await getSellerOrders(user.token, userId.id);
    setOrders(allOrders);
  };

  const SELLER = 'seller';

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div>
      <Header buttons={ [ordersButton] } userName={ user.name } />
      {
        !orders.status
          ? <OrdersCard orders={ orders } role={ SELLER } />
          : <p>Nenhum produto encontrado</p>
      }
    </div>
  );
}

export default SellerOrders;
