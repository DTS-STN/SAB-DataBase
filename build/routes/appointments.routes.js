"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _appointments = _interopRequireDefault(require("../models/appointments.model"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // GET


router.get('/appointments', function (req, res) {
  if (!req.query.appointmentId) {
    return res.status(400).send('Missing URL parameter: appointmentId');
  }

  _appointments["default"].findOne({
    appointmentId: req.query.appointmentId
  }).then(function (doc) {
    res.json(doc);
  })["catch"](function (err) {
    res.status(500).json(err);
  });
}); //post

router.post('/appointments', function (req, res) {
  if (!req.body) {
    return res.status(400).send('Request body is missing');
  }

  if (!req.body.appointmentId) {} //json format to test on postman and issomonia
  // {
  //     "locationId" : "hello1234",
  //         "locationAddress" : "jotaru@kujo.com",
  //             "cic" : "ab123456789",
  //                 "date" : "2019-09-21",
  // }


  var model = new _appointments["default"](req.body);
  model.save().then(function (doc) {
    if (!doc || doc.length === 0) {
      return res.status(500).send(doc);
    }

    res.status(201).send(doc);
  })["catch"](function (err) {
    res.status(500).json(err);
  });
});
var _default = router;
exports["default"] = _default;