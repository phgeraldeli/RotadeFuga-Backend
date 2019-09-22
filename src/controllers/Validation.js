// VALIDATION
const Joi = require("@hapi/joi");

//Register Validation
const registerValidation = data => {
  const schema = {
    user: Joi.string()
      .min(5)
      .required(),
    password: Joi.string()
      .min(5)
      .required()
  };

  return Joi.validate(data, schema);
};

const loginValidation =  data => {
    const schema = {
      user: Joi.string()
        .min(5)
        .required(),
      password: Joi.string()
        .min(5)
        .required()
    };
  
    return Joi.validate(data, schema);
  };
  

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;