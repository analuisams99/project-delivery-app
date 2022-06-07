import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { getProducts } from '../../services/api';
import Product from '../../components/Product';

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userName = JSON.parse(localStorage.getItem('user')).name;

  const getAllProducts = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const allProducts = await getProducts(user.token);
    if (!allProducts[0]) {
      localStorage.clear();
      navigate('/login');
    }
    setProducts(allProducts);
    setIsLoading(false);
  };

  const buttons = [
    { name: 'Produtos',
      role: '/customer/products',
      dataId: 'customer_products__element-navbar-link-products' },
    { name: 'Meus pedidos',
      role: '/customer/orders',
      dataId: 'customer_products__element-navbar-link-orders' },
  ];

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  return (
    <div className="bg-white">
      <Header buttons={ buttons } userName={ userName } />
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Produtos</h2>
        <div
          className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6
          sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
        >
          {!isLoading && products.map((e) => <Product key={ e.id } product={ e } />)}
        </div>
      </div>
    </div>
  );
}

export default Products;
