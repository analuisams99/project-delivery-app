import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { getProducts } from '../../services/api';

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    console.log(token);
    const allProducts = await getProducts(token);
    console.log(allProducts);
    if (!allProducts.name) {
      localStorage.clear();
      navigate('/login');
      return 'fail';
    }
    return allProducts;
  };

  useEffect(() => {
    getAllProducts();
  });
  return (
    <div>
      {/* <Header buttons={} userName={} /> */}
      <h1>Products.</h1>
    </div>
  );
}

export default Products;
