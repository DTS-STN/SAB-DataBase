"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _helmet = _interopRequireDefault(require("helmet"));

var _hidePoweredBy = _interopRequireDefault(require("hide-powered-by"));

var _dontSniffMimetype = _interopRequireDefault(require("dont-sniff-mimetype"));

var _express = _interopRequireDefault(require("express"));

var _locations = _interopRequireDefault(require("./routes/locations.routes"));

var _appointments = _interopRequireDefault(require("./routes/appointments.routes"));

var _path = _interopRequireDefault(require("path"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require('dotenv').config();

var app = (0, _express["default"])();

_mongoose["default"].connect(process.env.CONNECTION_STRING);

_mongoose["default"].connection.once('open', function () {
  console.log('connection has been made');
}).on('error', function (error) {
  console.log("Connection error: ".concat(error));
}); // Helmet options for production environment


if (process.env.NODE_ENV === 'production') {
  app.use((0, _helmet["default"])());
  app.use((0, _hidePoweredBy["default"])());
  app.use((0, _dontSniffMimetype["default"])());
} // Parser for request handlers


app.use(_bodyParser["default"].json()); // See the request on console

app.use(function (req, res, next) {
  console.log("".concat(new Date().toString(), " => ").concat(req.originalUrl), req.body);
  next(); // breaks the pipeline request
}); // Routes or route modules for the app to use

app.use(_locations["default"]);
app.use(_appointments["default"]); //handler for 404 - resources not found

app.use(function (req, res, next) {
  res.status(404).send('we think you are lost');
}); // Handler for Error 500

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.sendFile(_path["default"].join(__dirname, '../public/500.html'));
}); // Server port

var PORT = process.env.PORT || 4001;
app.listen(PORT, function () {
  return console.info("Server has started on ".concat(PORT));
});