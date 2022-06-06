const { User } = require('../database/models');

const loginExists = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });   
  if (!user) return res.status(404).json({ error: 'User not found' });
  next();
 };

 const userUnexists = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });   
  if (user) return res.status(409).json({ error: 'User already created' });
  next();
 };

 module.exports = {
   loginExists,
   userUnexists,
 };
