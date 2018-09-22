const express = require('express');

try {
  const app = express();
  const port = 1337;
  const config = require('./config/config');
  const db = require('./lib/db');
  db.connect(config.postgresql);

  let geocodeAPI = require('./routes/v1-geocode-api');
  app.use('/v1/geocode', geocodeAPI);

  app.listen(port, () => {
    console.log(`Geocoding Service started on port ${port}.`);
  });

} catch (error) {
  console.log(error);
}
