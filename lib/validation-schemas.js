const Joi = require('joi');

// Request Parameter Schemas 
const addressPartsParams = {
  street: Joi.string().required(),
  placeNumber: Joi.number().integer().optional(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  zipcode: Joi.string().optional(),
};

// API Validation Schemas 
const geocodeApiSchema = {
  query: addressPartsParams,
};

// JOI Valildation Middleware
const validate = validatedSchemas => (req, res, next) => {
  try {
    ['body', 'params', 'query'].forEach((src) => {
      if (validatedSchemas[src]) {
        const result = Joi.validate(req[src], validatedSchemas[src], {
          convert: true,
          allowUnknown: false,
        });
        if (result.error) {
          throw new Error(result.error.message);
        }
        req[`validated${src[0].toUpperCase()}${src.slice(1)}`] = result.value;
      }
    });

    next();
  } catch (e) {
    res.status(400);
    res.json({'error': e.message});
  }
}

module.exports = {
  geocodeApiSchema,
  validate,
};