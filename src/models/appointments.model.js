import mongoose, { Schema } from 'mongoose';

const AppointmentSchema = new Schema({
  appointmentId: {
    type: String,
    unique: true
  },
  clientEmail: String,
  locationId: String,
  bioKitId: String,
  bil: String,
  date: Date,
  timeSlot: String,
  dateSubmitted: Date,
  cancelledByClient: Boolean,
  cancelledByLocation: Boolean
});

export default mongoose.model('Appointments', AppointmentSchema);
