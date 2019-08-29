import mongoose, { Schema } from 'mongoose';
import BioKitModel from './biokits.model';

const BioKitSchema = BioKitModel.schema;

const LocationSchema = new Schema({
  locationId: {
    type: String,
    unique: true
  },
  locationRegion: String,
  locationType: String,
  locationAddress: String,
  locationCity: String,
  locationProvince: String,
  locationProvinceFr: String,
  hours: String,
  closures: [
    {
      periodStart: Date,
      periodEnd: Date
    }
  ],
  bioKits: {
    type: [BioKitSchema],
    default: undefined
  }
});

export default mongoose.model('Locations', LocationSchema);
