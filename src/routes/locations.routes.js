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
function respondToFind(res, err, errMsg, object) {
  if (err) {
    res.status(errMsg.code).send({ error: err, message: errMsg.msg });
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

// @route   GET /locationsByProv/id/city
// @desc    Find all locations by Province, where City is an optional parameter
// @access  Public for now
router.get('/locationsByProv/:id/:city?', (req, res) => {
  const provinceId = req.params.id;
  const cityName = req.params.city;
  if (!cityName) {
    LocationsModel.aggregate(
      [
        { $match: { locationProvince: provinceId } },
        {
          $group: {
            value: '$locationCity',
            name: { $first: '$locationCity' }
          }
        },
        { $sort: { locationCity: -1 } }
      ],
      (err, locationDoc) =>
        respondToFind(res, err, couldNotGetLocation, locationDoc)
    );
  } else {
    LocationsModel.find(
      { locationProvince: provinceId, locationCity: cityName },
      (err, locationDoc) =>
        respondToFind(res, err, couldNotGetLocation, locationDoc)
    );
  }
});

// @route   POST /locations
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
