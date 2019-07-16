import mongoose, { Schema } from 'mongoose';

const AppointmentSchema = new Schema({
  appointmentId: {
    type: String,
    unique: true
  },
  clientEmail: String,
  phoneNumber: Number,
  locationId: String,
  bioKitId: String,
  cic: String,
  date: Date,
  timeSlot: String,
  dateSubmitted: Date,
  cancelledByClient: Boolean,
  cancelledByLocation: Boolean
});

export default mongoose.model('Appointments', AppointmentSchema);
