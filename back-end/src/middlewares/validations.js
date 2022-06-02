const Joi = require('joi');

const errorMessages = {
  'any.required': '400|{#label} is a required field',
  'string.empty': '400|{#label} is not allowed to be empty',
  'string.email': '400|{#label} must be a valid email',
  'string.min': '400|{#label} length is not correct',
  'string.valid': '400|{#label} must be valid',
  'number.empty': '400|{#label} is not allowed to be empty',

};

const newUserSchema = Joi.object({
    name: Joi.string().empty().min(12).required(),
    email: Joi.string().empty().email().required(),
    password: Joi.string().empty().min(6).required(), 
  }).messages(errorMessages);

const adminSchema = Joi.object({
    name: Joi.string().empty().min(12).required(),
    email: Joi.string().empty().email().required(),
    password: Joi.string().empty().min(6).required(),
    role: Joi.string().empty().valid('customer', 'seller', 'administrator').required(),
  }).messages(errorMessages);

const loginSchema = Joi.object({
    email: Joi.string().empty().email().required(),
    password: Joi.string().empty().min(6).required(),
  }).messages(errorMessages);
  
 const salesSchema = Joi.object({
    userId: Joi.number().empty().required(),
    sellerId: Joi.number().empty().required(),
    totalPrice: Joi.number().empty().required(),
    deliveryAddress: Joi.string().empty().required(),
    deliveryNumber: Joi.string().empty().required(),
    products: Joi.array().items(
     Joi.object().keys(
       {
         productId: Joi.number().empty().required(),
         quantity: Joi.number().empty().min(1).required(),
       },
     ), 
    ),
  }).messages(errorMessages);

const schemas = { newUserSchema, loginSchema, salesSchema, adminSchema };

// const validateSchema = async (schema, data) => schema.validate(data);

module.exports = async (req, res, next) => {
    const { body } = req;
    const { schema } = req.headers;
    
    if (!Object.keys(schemas).includes(schema)) { 
      return res.status(400).json({ message: 'Header must be valid' });
    } 
    
    const { error } = schemas[schema].validate({ ...body });
    
    if (error) {
      const [status, message] = error.message.split('|');  
      return res.status(status).json({ message });
    }
   next();
};
