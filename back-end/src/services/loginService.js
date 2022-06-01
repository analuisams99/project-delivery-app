const md5 = require('md5');
const { User } = require('../database/models');
const { createToken } = require('../middlewares/tokenAuth');

const login = async (loginEmail, loginPassword) => { 
   const { name, password, role } = await User.findOne({ where: { email: loginEmail } });
   if (password === md5(loginPassword)) { 
      return { token: createToken({ name, email: loginEmail, role }) };
   }
   return { error: 'Invalid password' };
};

module.exports = {
  login,
};