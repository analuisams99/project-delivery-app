import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import FormCheckout from '../../components/FormCheckout';
import { getSellers } from '../../services/api';
import TableCheckout from '../../components/TableCheckout';

function Checkout() {
  const navigate = useNavigate();
  const [sellers, setSellers] = useState([]);
  const [seller, setSeller] = useState('');
  const [address, setAddress] = useState('');
  const [houseNum, setHouseNum] = useState(0);
  const [cartList, setCartList] = useState([]);
  const [userName, setUserName] = useState('');
  const [finalSaleProducts, setFinalSaleProducts] = useState([]);

  const valitadeUser = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      localStorage.clear();
      navigate('/login');
    }
    const allSellers = await getSellers(user.token);
    if (!allSellers[0]) {
      localStorage.clear();
      navigate('/login');
    }
    setUserName(user.name);
    return allSellers;
  };

  const getAllSellers = async () => {
    const sellersList = await valitadeUser();
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart || cart.length === 0) {
      navigate('/customer/products');
    }
    setSellers(sellersList);
    setCartList(cart);
    setFinalSaleProducts([cart.filter((e) => e.quantity > 0)]);
  };

  const removeProduct = (id) => {
    const lista = [...cartList];
    const productId = lista.findIndex((e) => e.id === id);
    lista[productId].quantity = 0;
    setCartList([...lista]);
    setFinalSaleProducts([lista.filter((e) => e.quantity > 0)]);
  };

  const handleSubmitBtn = async () => {
    const response = await postNewSales(token, salesData);
    if (!response.token) {
      setErrorMessage(true);
      return 'fail';
    }
    navigate(`/customer/orders/${response.id}`);
  };

  useEffect(() => {
    getAllSellers();
  }, []);

  const buttons = [
    { name: 'Produtos',
      role: 'customer/products',
      dataId: 'customer_products__element-navbar-link-products' },
    { name: 'Meus pedidos',
      role: 'customer/orders',
      dataId: 'customer_products__element-navbar-link-orders' },
  ];

  return (
    <div className="flex flex-col bg-slate-200">
      <Header buttons={ buttons } userName={ userName } />
      <div
        className="flex flex-col max-w-2xl mx-auto py-16 px-4 sm:px-6
          lg:max-w-7xl lg:px-8"
      >
        <div className="flex mb-12 justify-start bg-slate-200 md:mx-4">
          <h2
            className="text-2xl md:text-3xl font-medium tracking-tight text-gray-700"
          >
            Finalizar pedido
          </h2>
          <div>
            <TableCheckout
              orders={ finalSaleProducts }
              removeProducts={ removeProduct }
            />
          </div>
        </div>
        <div>
          <p>Pedidos</p>
        </div>
        <FormCheckout
          seller={ seller }
          setSeller={ setSeller }
          address={ address }
          setAddress={ setAddress }
          houseNum={ houseNum }
          setHouseNum={ setHouseNum }
          sellers={ sellers }
          handleSubmitBtn={ handleSubmitBtn }
        />
      </div>
    </div>
  );
}

export default Checkout;
