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

// @route   POST api/locations
// @desc    Create an Location
// @access  Public for now
router.post('/locations', (req, res) => {
  const newLocation = new LocationsModel({
    locationId: req.body.locationId,
    locationAddress: req.body.locationAddress,
    locationCity: req.body.locationCity,
    locationRegion: req.body.locationRegion,
    locationRegionFr: req.body.locationRegionFr,
    postalCode: req.body.postalCode,
    accomodations: req.body.accomodations,
    hours: req.body.hours,
    //closures: req.body.closures[],
    //bioKits: req.body.bioKits[]
  });
 
  newLocation.save().then(local => res.json(local));
 });
 
export default router;
