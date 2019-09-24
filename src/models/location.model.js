import mongoose, { Schema } from 'mongoose';
import BioKitModel from './biokits.model';

const BioKitSchema = BioKitModel.schema;

const LocationSchema = new Schema({
  locationId: {
    type: String,
    unique: true
  },
  locationName: String,
  locationAddress: String,
  locationCity: String,
  postalCode: String,
  locationProvince: String,
  timezone: String,
  hours: String,
  defaultClosures: String,
  customClosures: String,
  bioKitAmount: Number,
  bioKits: {
    type: [BioKitSchema],
    default: undefined
  }
});

export default mongoose.model('Locations', LocationSchema);
