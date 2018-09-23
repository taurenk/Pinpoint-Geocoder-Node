const express = require('express');
let api = express.Router();
const db = require('../lib/db');
const { geocodeUSAddress } = require('../lib/geocoder');
const { geocodeApiSchema, validate } = require('../lib/validation-schemas');

api.get('/test', async (req, res) => {
  try {
    res.json({'ok': 'ok'});
  } catch (error) {
    console.log(error);
    res.json({error: err});
  }
});

api.get('/us-address', validate(geocodeApiSchema), async (req, res) => {
  try {
    let street = req.validatedQuery.street;
    let placeNumber = req.validatedQuery.placeNumber;
    let city = req.validatedQuery.city;
    let state = req.validatedQuery.state;
    let zipcode = req.validatedQuery.zipcode;
    let addressCanidates = await geocodeUSAddress(db, street, placeNumber, city, state, zipcode);
    res.json({'results': addressCanidates});
  } catch (error) {
    res.json({error});
  }
});

module.exports = api;