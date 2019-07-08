import { Schema } from 'mongoose';

const AppointmentSchema = new Schema({
  appointmentId: String,
  clientEmail: String,
  locationId: String,
  stationId: String,
  cic: String,
  date: Date,
  timeSlot: String,
  dateSubmitted: String,
  cancelledByClient: Boolean,
  cancelledByLocation: Boolean
});
