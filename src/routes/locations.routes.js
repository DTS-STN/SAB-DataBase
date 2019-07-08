import LocationsModel from '../models/location.model';
import express from 'express';

let router = express.Router();

// Get Locations
router.get('/locations', (req, res) => {
  LocationsModel.find((err, locations) => {
    if (err) {
      res.sendStatus(500).send({ error: 'Internal Server Error' });
    } else {
      res.json(locations);
    }
  });
});

export default router;
