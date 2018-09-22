const Joi = require('joi');

/** Request Parameter Schemas **/
const addressPartsParams = {
  street: Joi.string().required(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  zipcode: Joi.string().optional(),
};

/** API Validation Schemas **/
const geocodeApiSchema = {
  params: addressPartsParams,
};


module.exports = {
  geocodeApiSchema,
};