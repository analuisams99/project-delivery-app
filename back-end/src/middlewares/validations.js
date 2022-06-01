const Joi = require('joi');

const errorMessages = {
  'any.required': '400|{#label} is a required field',
  'any.empty': '400|{{#label}} is not allowed to be empty',
  'string.email': '400|{#label} must be a valid email',
  'string.min': '400|{#label} length is not correct',
  'string.valid': '400|{#label} must be valid',
};

const schemas = {  
  newUserSchema: Joi.object({
    name: Joi.string().min(12).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(), 
  }).messages(errorMessages),

  adminSchema: Joi.object({
    name: Joi.string().min(12).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('customer', 'seller', 'admin').required(),
  }).messages(errorMessages),

  loginSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).messages(errorMessages),
  
  salesSchema: Joi.object({
    userId: Joi.number().required(),
    sellerId: Joi.number().required(),
    totalPrice: Joi.number().required(),
    deliveryAddress: Joi.string().required(),
    deliveryNumber: Joi.string().required(),
    products: Joi.array().items(
     Joi.object().keys(
       {
         productId: Joi.number().required(),
         quantity: Joi.number().min(1).required(),
       },
     ), 
    ),
  }).messages(errorMessages),
};

const validateSchema = async (schema, data) => schema.validate(data);

module.exports = async (req, res, next) => {
    const { body } = req;
    const { schema } = req.headers;
    
    if (!Object.keys(schemas).includes(schema)) { 
      return res.status(400).json({ message: 'Header must be valid' });
    } 
    const { error } = validateSchema(schemas[schema], body);

  if (error) {
    const [status, message] = error.message.split('|');  
    return res.status(status).json({ message });
  }
   next();
};
