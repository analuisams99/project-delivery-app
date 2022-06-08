import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { getProducts } from '../../services/api';
import Product from '../../components/Product';

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const userName = JSON.parse(localStorage.getItem('user')).name;

  const getAllProducts = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const allProducts = await getProducts(user.token);
    if (!allProducts[0]) {
      localStorage.clear();
      navigate('/login');
    }
    const newProducts = allProducts.map((e) => ({ ...e, quantity: 0 }));
    setProducts(newProducts);
    setIsLoading(false);
    return newProducts;
  };

  const sendToCheckout = () => {
    localStorage.setItem('cart', JSON.stringify(products));
    localStorage.setItem('totalPrice', totalPrice);
    navigate('/customer/checkout');
  };

  const totalPriceSum = (arr) => (
    arr.reduce((acc, curr) => (curr.quantity * +curr.price) + acc, 0)
  );

  const addToCart = (id, value) => {
    const newArray = [...products];
    const teste = newArray.findIndex((e) => e.id === id);
    newArray[teste].quantity = value;
    setProducts([...newArray]);
    setTotalPrice(totalPriceSum(newArray).toFixed(2));
  };

  const buttons = [
    { name: 'Produtos',
      role: 'customer/products',
      dataId: 'customer_products__element-navbar-link-products' },
    { name: 'Meus pedidos',
      role: 'customer/orders',
      dataId: 'customer_products__element-navbar-link-orders' },
  ];

  const convertPrice = (priceWithDot) => {
    const priceWithComma = priceWithDot.toString().replace('.', ',');
    return priceWithComma;
  };

  const setCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) {
      return localStorage.setItem('cart', JSON.stringify([]));
    }
    setTotalPrice(totalPriceSum(cart).toFixed(2));

    return setProducts(cart);
  };

  useEffect(() => {
    getAllProducts();
    setCart();
  }, []);

  return (
    <div className="flex flex-col bg-slate-200">
      <Header buttons={ buttons } userName={ userName } />
      <div
        className="max-w-2xl mx-auto py-16 px-4 sm:px-6
          lg:max-w-7xl lg:px-8"
      >
        <div className="flex mb-12 justify-between bg-slate-200 md:mx-4">
          <h2
            className="text-2xl md:text-3xl font-medium tracking-tight text-gray-700"
          >
            Produtos
          </h2>
          <button
            type="button"
            onClick={ sendToCheckout }
            data-testid="customer_products__button-cart"
            disabled={ totalPrice === 0 }
            className="py-2 px-4 border border-transparent text-sm font-medium
              rounded-md text-white bg-indigo-600 disabled:bg-indigo-400
              hover:bg-indigo-700"
          >
            Ver carrinho:
            {' '}
            R$
            {' '}
            <span
              data-testid="customer_products__checkout-bottom-value"
            >
              {convertPrice(totalPrice)}
            </span>
          </button>
        </div>
        <div
          className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6
          sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
        >
          {!isLoading && products
            .map((e) => (
              <Product key={ e.id } product={ e } addToCart={ addToCart } />))}
        </div>
      </div>
    </div>
  );
}

export default Products;
