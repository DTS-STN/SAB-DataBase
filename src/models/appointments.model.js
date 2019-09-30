import mongoose, { Schema } from 'mongoose';

const AppointmentSchema = new Schema({
  clientEmail: String,
  locationId: String,
  bioKitId: String,
  bil: String,
  confirmation: String,
  date: Date,
  dateConfirmed: Date,
  expires: Date,
  maintenance: Boolean,
  privateAccessible: Boolean,
  cancelledByClient: Boolean,
  cancelledByLocation: Boolean
});

AppointmentSchema.index({ expires: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('Appointments', AppointmentSchema);
