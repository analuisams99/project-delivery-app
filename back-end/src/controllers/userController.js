const UserService = require('../services/userService');

const noUserDataMessage = { message: 'No users in data base' };

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

const createUserAdmin = async (req, res) => { 
  try {
    const { name, email, password, role } = req.body; 
    const response = await UserService.createUserAdmin(name, email, password, role);
    
    if ('error' in response) {
      return res.status(400).json(response);
    }
    return res.status(201).json({ id: response.id, ...req.body });   
    } catch (err) {
    res.status(500).json({ error: err.message });   
  }
};

const getUsers = async (req, res) => { 
  try {
    const response = await UserService.getUsers();
    if (!response) {
      return res.status(400).json(noUserDataMessage);
    }
    return res.status(200).json(response);   
    } catch (err) {
    res.status(500).json({ error: err.message });   
  }
};

const getSellers = async (req, res) => { 
  try {
    const response = await UserService.getSellers();
    
    if (!response) {
      return res.status(400).json(noUserDataMessage);
    }
    return res.status(200).json(response);   
    } catch (err) {
    res.status(500).json({ error: err.message });   
  }
};

const deleteUser = async (req, res) => { 
  try {
    const { id } = req.params;
    const response = await UserService.deleteUser(id);
    
    if (!response) {
      return res.status(400).json(noUserDataMessage);
    }
    return res.status(200).send();   
    } catch (err) {
    res.status(500).json({ error: err.message });   
  }
};

module.exports = {
  login,
  createUser,
  getUsers,
  getSellers,
  deleteUser,
  createUserAdmin,
}; 