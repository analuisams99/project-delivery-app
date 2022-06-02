const UserService = require('../services/userService');

const login = async (req, res) => { 
  try {
    const { email, password } = req.body; 
    const response = await UserService.login(email, password);
    
    if ('error' in response) {
      return res.status(400).json(response);
    }
    return res.status(200).json(response);   
    } catch (err) {
    res.status(500).json({ error: err.message });   
  }
};

const createUser = async (req, res) => { 
  try {
    const { name, email, password } = req.body; 
    const response = await UserService.createUser(name, email, password);
    
    if ('error' in response) {
      return res.status(400).json(response);
    }
    return res.status(201).json(response);   
    } catch (err) {
    res.status(500).json({ error: err.message });   
  }
};

const getUsers = async (req, res) => { 
  try {
    const response = await UserService.getUsers();
    
    if (!response) {
      return res.status(400).json({ message: 'No users in data base' });
    }
    return res.status(201).json(response);   
    } catch (err) {
    res.status(500).json({ error: err.message });   
  }
};

const getSellers = async (req, res) => { 
  try {
    const response = await UserService.getSellers();
    
    if (!response) {
      return res.status(400).json({ message: 'No users in data base' });
    }
    return res.status(201).json(response);   
    } catch (err) {
    res.status(500).json({ error: err.message });   
  }
};

module.exports = {
  login,
  createUser,
  getUsers,
  getSellers,
}; 