const LoginService = require('../services/loginService');

const login = async (req, res) => { 
  try {
    const { email, password } = req.body; 
    const response = await LoginService.login(email, password);
    
    if ('error' in response) {
      return res.status(400).json(response);
    }
    return res.status(200).json(response);   
    } catch (err) {
    res.status(500).json({ error: err.message });   
  }
};

module.exports = {
  login,
}; 