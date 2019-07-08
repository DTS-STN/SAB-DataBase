import LocationsModel from '../models/location.model';
import express from 'express';

let router = express.Router();

// Get All Locations
router.get('/locations', (req, res) => {
  LocationsModel.find((err, locations) => {
    if (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
    } else {
      res
        .status(200)
        .type('application/json')
        .send(locations);
    }
  });
});

// Get One Location
router.get('/locations/:id', (req, res) => {
  const locationId = req.params.id;
  LocationsModel.findById(locationId, (err, locationDoc) => {
    if (err) {
      res.status(403).send({ error: err, message: 'Could not get location' });
    } else {
      res
        .status(200)
        .type('application/json')
        .send(locationDoc);
    }
  });
});

// Update a Location
router.put('/locations/update/:id', (req, res) => {
  const locationId = req.params.id;
  const newLocationData = req.body;
  if (newLocationData === null || newLocationData === undefined) {
    res
      .status(403)
      .send({ error: 'No location information in body of request.' });
  }
  LocationsModel.findByIdAndUpdate(locationId, newLocationData, err => {
    if (err) {
      res
        .status(403)
        .send({ error: err, message: 'Could not update location' });
    } else {
      res
        .status(200)
        .type('application/json')
        .send(newLocationData);
    }
  });
});

export default router;
