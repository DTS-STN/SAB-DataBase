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
  bil: String,
  confirmation: String,
  date: Date,
  dateConfirmed: Date,
  expires: Date,
  maintenance: Boolean,
  cancelledByClient: Boolean,
  cancelledByLocation: Boolean
});

export default mongoose.model('Appointments', AppointmentSchema);
