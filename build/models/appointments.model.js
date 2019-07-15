"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var AppointmentSchema = new _mongoose.Schema({
  appointmentId: {
    type: String,
    unique: true
  },
  clientEmail: String,
  locationId: String,
  bioKitId: String,
  cic: String,
  date: Date,
  timeSlot: String,
  dateSubmitted: String,
  cancelledByClient: Boolean,
  cancelledByLocation: Boolean
});

var _default = _mongoose["default"].model('Appointments', AppointmentSchema);

exports["default"] = _default;