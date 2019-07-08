import { Schema } from 'mongoose';

const AppointmentSchema = new Schema({
  appointmentId: {
    type: String,
    unique: true
  },
  clientEmail: String,
  locationId: String,
  bioKitId: String,
  cic: {
    type: String,
    unique: false
  },
  date: Date,
  timeSlot: String,
  dateSubmitted: String,
  cancelledByClient: Boolean,
  cancelledByLocation: Boolean
});

export default mongoose.model('Appointments', AppointmentSchema);
