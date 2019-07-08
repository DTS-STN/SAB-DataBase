import LocationsModel from '../models/location.model';
import express from 'express';

let router = express.Router();

// Get All Locations
router.get('/locations', (req, res) => {
  LocationsModel.find((err, locations) => {
    if (err) {
      res.sendStatus(500).send({ error: 'Internal Server Error' });
    } else {
      res.status(200).send(locations);
    }
  });
});

// Get One Location
router.get('/locations/:id', (req, res) => {
  const locationId = req.params.id;
  LocationsModel.findById(locationId, (err, locationDoc) => {
    if (err) {
      res.sendStatus(403).send({ error: 'Could not find the location' });
    } else {
      res.status(200).send(locationDoc);
    }
  });
});

// Update a Location
router.put('/locations/:id', (req, res) => {
  const locationId = req.params.id;
  LocationsModel.findByIdAndUpdate(locationId, (err, updatedLocationDoc) => {
    if (err) {
      res.sendStatus(403).send({ error: 'Could not update location' });
    } else {
      res.statusCode(200).send(updatedLocationDoc);
    }
  });
});

export default router;
