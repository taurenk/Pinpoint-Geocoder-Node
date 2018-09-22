const express = require('express');
let api = express.Router();

api.get('/docker', async (req, res) => {
  try {
    res.json({ok});
  } catch (error) {
    console.log(error);
    res.json({error: err});
  }
});

module.exports = api;