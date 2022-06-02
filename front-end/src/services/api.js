import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

const postLogin = async (loginData) => {
  const { data } = await api.post('/login', loginData, {
    headers: { schema: 'loginSchema' },
  });
  return data;
};

const postRegister = async (registerData) => {
  const { data } = await api.post('/register', registerData, {
    headers: { schema: 'newUserSchema' },
  });
  return data;
};

const getProducts = async (token) => {
  const { data } = await api.get('/products', {}, {
    headers: { authorization: token },
  });
  return data;
};

const getCustomerOrders = async (token, id) => {
  const { data } = await api.get(`/sales/customer/${id}`, {}, {
    headers: { authorization: token },
  });
  return data;
};

const getOrderDetails = async (token, id) => { // passar o id da venda, não do usuário
  const { data } = await api.get(`/sales/${id}`, {}, {
    headers: { authorization: token },
  });
  return data;
};

const postNewSales = async (token, salesData) => {
  const { data } = await api.post('/sales', salesData, {
    headers: { authorization: token, schema: 'salesSchema' },
  });
  return data;
};

const patchDelivered = async (token, id) => {
  const { data } = await api.patch(`/sales/delivered/${id}`, {}, {
    headers: { authorization: token },
  });
  return data;
};

const patchPrepare = async (token, id) => {
  const { data } = await api.patch(`/sales/prepare/${id}`, {}, {
    headers: { authorization: token },
  });
  return data;
};

const patchToDeliver = async (token, id) => {
  const { data } = await api.patch(`/sales/todeliver/${id}`, {}, {
    headers: { authorization: token },
  });
  return data;
};

const getSellerOrders = async (token, id) => {
  const { data } = await api.get(`/sales/seller/${id}`, {}, {
    headers: { authorization: token },
  });
  return data;
};

const getUsers = async (token) => {
  const { data } = await api.get('/users', {}, {
    headers: { authorization: token },
  });
  return data;
};

const getSellers = async (token) => {
  const { data } = await api.get('/users/sellers', {}, {
    headers: { authorization: token },
  });
  return data;
};

const deleteUser = async (token, id) => {
  const { data } = await api.delete(`/users/${id}`, {}, {
    headers: { authorization: token },
  });
  return data;
};

const postUserAdmin = async (token, userData) => {
  const { data } = await api.post('/users/admin', userData, {
    headers: { authorization: token, schema: 'adminSchema' },
  });
  return data;
};

export {
  postLogin,
  postRegister,
  getProducts,
  getCustomerOrders,
  getOrderDetails,
  postNewSales,
  patchDelivered,
  patchPrepare,
  patchToDeliver,
  getSellerOrders,
  getUsers,
  getSellers,
  deleteUser,
  postUserAdmin,
};
