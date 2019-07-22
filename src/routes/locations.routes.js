import LocationsModel from '../models/location.model';
import express from 'express';

let router = express.Router();

const couldNotGetLocation = {
  code: 403,
  msg: 'Could not get location'
};

const internalServerError = {
  code: 500,
  msg: 'Internal server error'
};

// Get All Locations
router.get('/locations', (req, res) => {
  LocationsModel.find((err, locations) =>
    respondToFind(res, err, internalServerError, locations)
  );
});

// Deal with the results of a database query
function respondToFind(res, err, errmsg, object) {
  if (err) {
    res.status(errmsg.code).send({ error: err, message: errmsg.msg });
  } else {
    res
      .status(200)
      .type('application/json')
      .send(object);
  }
}

// Get One Location
router.get('/locations/:id', (req, res) => {
  const locationId = req.params.id;
  LocationsModel.findById(locationId, (err, locationDoc) =>
    respondToFind(res, err, couldNotGetLocation, locationDoc)
  );
});

// @route   GET api/locations
// @desc    Find all locations by Province
// @access  Public for now
router.get('/locationsbyprov/:id', (req, res) => {
  const provinceId = req.params.id;
  LocationsModel.find({ locationProvinceId: provinceId }, (err, locationDoc) =>
    respondToFind(res, err, couldNotGetLocation, locationDoc)
  );
});

// @route   POST api/locations
// @desc    Create an Office Location
// @access  Public for now
router.post('/locations', (req, res) => {
  const newLocation = new LocationsModel({
    locationId: req.body.locationId,
    locationAddress: req.body.locationAddress,
    locationCity: req.body.locationCity,
    locationProvinceId: req.body.locationId,
    locationProvince: req.body.locationProvince,
    locationProvinceFr: req.body.locationProvinceFr,
    hours: req.body.hours,
    closures: undefined,
    bioKits: undefined
  });

  newLocation.save().then(location => res.json(location));
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
