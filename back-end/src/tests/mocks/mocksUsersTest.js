const loginValid = {        
  email: 'zebirita@email.com',
  password: '$#zebirita#$',
};

const loginInvalid = {        
  email: 'zebirita@email.com',
  password: '123456879',
};
const userInvalid = {        
  email: 'invalid@email.com',
  password: '123456879',
};

const findUserMock = {
  id: 3,
  name: "Cliente Zé Birita",
  email: "zebirita@email.com",
  role: "customer",
  password: '1c37466c159755ce1fa181bd247cb925',
};

const customerUser = {
  id: 3,
  name: "Cliente Zé Birita",
  email: "zebirita@email.com",
  role: "customer",  
};


const adminUser ={ 
  id: 1,
  name: "Delivery App Admin",
  email: "adm@deliveryapp.com",
  role: "administrator"
}

const validCostumer = {        
  name: 'Roberto dos Santos',
  email: 'mattos@gmail.com',
  password: '00000000536',
};

module.exports = { 
  validCostumer,
  findUserMock,
  loginValid,
  loginInvalid,
  adminUser,
  customerUser,
  userInvalid,
}