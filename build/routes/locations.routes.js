"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _location = _interopRequireDefault(require("../models/location.model"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // Get All Locations


router.get('/locations', function (req, res) {
  _location["default"].find(function (err, locations) {
    if (err) {
      res.status(500).send({
        error: err,
        message: 'Internal server error'
      });
    } else {
      res.status(200).type('application/json').send(locations);
    }
  });
}); // Get One Location

router.get('/locations/:id', function (req, res) {
  var locationId = req.params.id;

  _location["default"].findById(locationId, function (err, locationDoc) {
    if (err) {
      res.status(403).send({
        error: err,
        message: 'Could not get location'
      });
    } else {
      res.status(200).type('application/json').send(locationDoc);
    }
  });
}); // Update a Location

router.put('/locations/update/:id', function (req, res) {
  var locationId = req.params.id;
  var newLocationData = req.body;

  if (newLocationData === null || newLocationData === undefined) {
    res.status(403).send({
      error: 'No location information in body of request.'
    });
  }

  _location["default"].findByIdAndUpdate(locationId, newLocationData, function (err) {
    if (err) {
      res.status(403).send({
        error: err,
        message: 'Could not update location'
      });
    } else {
      res.status(200).type('application/json').send(newLocationData);
    }
  });
});
var _default = router;
exports["default"] = _default;