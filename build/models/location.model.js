"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _biokits = _interopRequireDefault(require("./biokits.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var BioKitSchema = _biokits["default"].schema;
var DateRangeSchema = new _mongoose.Schema({
  periodStart: Date,
  periodEnd: Date
});
var LocationSchema = new _mongoose.Schema({
  locationId: {
    type: String,
    unique: true
  },
  locationAddress: String,
  locationCity: String,
  locationRegion: String,
  locationRegionFr: String,
  postalCode: String,
  accomodations: Boolean,
  hours: String,
  closures: {
    type: [DateRangeSchema],
    "default": undefined
  },
  bioKits: {
    type: [BioKitSchema],
    "default": undefined
  }
});

var _default = _mongoose["default"].model('Locations', LocationSchema);

exports["default"] = _default;