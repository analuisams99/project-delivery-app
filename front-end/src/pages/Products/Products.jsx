import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { getProducts } from '../../services/api';

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const userName = JSON.parse(localStorage.getItem('user')).name;

  const getAllProducts = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const allProducts = await getProducts(user.token);
    if (!allProducts[0]) {
      localStorage.clear();
      navigate('/login');
    }
    setProducts(allProducts);
  };

  const sendToProducts = () => {
    navigate('/customer/products');
  };

  const sendToOrders = () => {
    navigate('/customer/orders');
  };

  const buttons = [
    { name: 'Produtos',
      role: sendToProducts,
      dataId: 'customer_products__element-navbar-link-products' },
    { name: 'Meus pedidos',
      role: sendToOrders,
      dataId: 'customer_products__element-navbar-link-orders' },
  ];

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  return (
    <div>
      <Header buttons={ buttons } userName={ userName } />
      {products.map((e) => (
        <p key={ e.name }>
          { e.name }
        </p>))}
    </div>
  );
}

export default Products;
