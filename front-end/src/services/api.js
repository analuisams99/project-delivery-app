import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

const postLogin = async (loginData) => {
  try {
    const { data } = await api.post('/login', loginData, {
      headers: { schema: 'loginSchema' },
    });
    return data;
  } catch (error) {
    return error.response;
  }
};

const postVerifyLogin = async (token) => {
  try {
    const { data } = await api.post('/login/verify', {}, {
      headers: { authorization: token },
    });
    return data;
  } catch (error) {
    return error.response;
  }
};

const postRegister = async (registerData) => {
  try {
    const { data } = await api.post('/users', registerData, {
      headers: { schema: 'newUserSchema' },
    });
    return data;
  } catch (error) {
    return error.response;
  }
};

const getProducts = async (token) => {
  try {
    const { data } = await api.get('/products', {
      headers: { authorization: token },
    });
    return data;
  } catch (error) {
    return error.response;
  }
};

const getCustomerOrders = async (token, id) => {
  try {
    const { data } = await api.get(`/sales/costumer/${id}`, {
      headers: { authorization: token },
    });
    return data;
  } catch (error) {
    return error.response;
  }
};

const getOrderDetails = async (token, id) => { // passar o id da venda, não do usuário
  try {
    const { data } = await api.get(`/sales/${id}`, {
      headers: { authorization: token },
    });
    return data;
  } catch (error) {
    return error.response;
  }
};

const postNewSales = async (token, salesData) => {
  try {
    const { data } = await api.post('/sales', salesData, {
      headers: { authorization: token, schema: 'salesSchema' },
    });
    return data;
  } catch (error) {
    return error.response;
  }
};

const patchDelivered = async (token, id) => {
  try {
    const { data } = await api.patch(`/sales/delivered/${id}`, {
      headers: { authorization: token },
    });
    return data;
  } catch (error) {
    return error.response;
  }
};

const patchPrepare = async (token, id) => {
  try {
    const { data } = await api.patch(`/sales/prepare/${id}`, {
      headers: { authorization: token },
    });
    return data;
  } catch (error) {
    return error.response;
  }
};

const patchToDeliver = async (token, id) => {
  try {
    const { data } = await api.patch(`/sales/todeliver/${id}`, {
      headers: { authorization: token },
    });
    return data;
  } catch (error) {
    return error.response;
  }
};

const getSellerOrders = async (token, id) => {
  try {
    const { data } = await api.get(`/sales/seller/${id}`, {
      headers: { authorization: token },
    });
    return data;
  } catch (error) {
    return error.response;
  }
};

const getUsers = async (token) => {
  try {
    const { data } = await api.get('/users', {
      headers: { authorization: token },
    });
    return data;
  } catch (error) {
    return error.response;
  }
};

const getSellers = async (token) => {
  try {
    const { data } = await api.get('/users/sellers', {
      headers: { authorization: token },
    });
    return data;
  } catch (error) {
    return error.response;
  }
};

const deleteUser = async (token, id) => {
  try {
    const { data } = await api.delete(`/users/${id}`, {
      headers: { authorization: token },
    });
    return data;
  } catch (error) {
    return error.response;
  }
};

const postUserAdmin = async (token, userData) => {
  try {
    const { data } = await api.post('/users/admin', userData, {
      headers: { authorization: token, schema: 'adminSchema' },
    });
    return data;
  } catch (error) {
    return error.response;
  }
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
  postVerifyLogin,
};
