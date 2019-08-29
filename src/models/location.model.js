import mongoose, { Schema } from 'mongoose';
import BioKitModel from './biokits.model';

const BioKitSchema = BioKitModel.schema;

const LocationSchema = new Schema({
  locationId: {
    type: String,
    unique: true
  },
  locationName: String,
  locationRegion: String,
  locationType: String,
  locationAddress: String,
  locationCity: String,
  postalCode: String,
  locationProvince: String,
  locationProvinceFr: String,
  hours: String,
  closures: [
    {
      periodStart: Date,
      periodEnd: Date
    }
  ],
  bioKitAmount: Number,
  bioKits: {
    type: [BioKitSchema],
    default: undefined
  }
});

export default mongoose.model('Locations', LocationSchema);
