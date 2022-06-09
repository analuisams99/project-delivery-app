import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import TableDetails from '../../components/TableDetails';
import {
  getOrderDetails,
  patchDelivered,
  patchPrepare,
  patchToDeliver,
} from '../../services/api';
import DetailOrderHeader from '../../components/DetailOrderHeader';

function CustomerOrderDetails() {
  const navigate = useNavigate();
  const searchParams = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const [orderStatus, setOrderStatus] = useState('');
  const [order, setOrder] = useState({
    id: '',
    Seller: { name: '' },
    saleDate: '',
    Products: [],
    totalPrice: '',
    status: '',
  });

  const convertPrice = (priceWithDot) => {
    const priceWithComma = priceWithDot.toString().replace('.', ',');
    return priceWithComma;
  };
  const getOrderInfo = async () => {
    if (!user) {
      localStorage.clear();
      navigate('/login');
    }
    const orderInfo = await getOrderDetails(user.token, searchParams.id);
    if (orderInfo.statusText) {
      navigate('/notfound');
      // console.log(orderInfo);
    }
    setOrder(orderInfo);
    setOrderStatus(orderInfo.status);
    return orderInfo;
  };

  const handleDeliveredBtn = async () => {
    await patchDelivered(user.token, searchParams.id);
    setOrderStatus('Entregue');
  };

  const handlePrepareBtn = async () => {
    await patchPrepare(user.token, searchParams.id);
    setOrderStatus('Preparando');
  };

  const handleToDeliverBtn = async () => {
    await patchToDeliver(user.token, searchParams.id);
    setOrderStatus('Em Trânsito');
  };

  const productsButton = {
    name: 'Produtos',
    dataId: 'customer_products__element-navbar-link-products',
    role: 'customer/products',
  };
  const ordersButton = {
    name: 'Meus Pedidos',
    dataId: 'customer_products__element-navbar-link-orders',
    role: 'customer/orders',
  };
  const sellerOrdersButton = {
    name: 'Pedidos',
    dataId: 'customer_products__element-navbar-link-orders',
    role: 'seller/orders',
  };

  useEffect(() => {
    getOrderInfo();
  }, []);

  return (
    <div>
      <Header
        buttons={ user.role === 'seller'
          ? [sellerOrdersButton]
          : [productsButton, ordersButton] }
        userName={ user.name }
      />
      <h1>CustomerOrderDetails</h1>
      <div className="flex flex-col">
        <DetailOrderHeader
          order={ order }
          handleDeliveredBtn={ handleDeliveredBtn }
          userRole={ user.role }
          handlePrepareBtn={ handlePrepareBtn }
          handleToDeliverBtn={ handleToDeliverBtn }
          orderStatus={ orderStatus }
        />
        <div>
          <TableDetails orders={ order.Products } role={ user.role } />
        </div>
        <div data-testid={ `${user.role}_order_details__element-order-total-price` }>
          Total:
          { convertPrice(order.totalPrice) }
        </div>
      </div>
    </div>
  );
}

export default CustomerOrderDetails;
