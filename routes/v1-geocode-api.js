const express = require('express');
let api = express.Router();
const db = require('../lib/db');
const {geocodeUSAddress} = require('../lib/geocoder');

api.get('/test', async (req, res) => {
  try {
    res.json({'ok': 'ok'});
  } catch (error) {
    console.log(error);
    res.json({error: err});
  }
});


api.get('/us-address', async (req, res) => {
  try {
    // TODO; JOI validate middleware
    let street = req.query.street;
    let placeNumber = req.query.placeNumber ? parseInt(req.query.placeNumber) : null;
    let city = req.query.city;
    let state = req.query.state;
    let zipcode = req.query.zipcode;
    console.log('req.query = ', req.query);
    await geocodeUSAddress(db, street, placeNumber, city, state, zipcode);
    res.json({'ok': 'ok'});
  } catch (error) {
    console.log(error);
    res.json({error: err});
  }
});

module.exports = api;