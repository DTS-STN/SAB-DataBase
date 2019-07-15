import mongoose, { Schema } from 'mongoose';
import BioKitModel from './biokits.model';

const BioKitSchema = BioKitModel.schema;

const LocationSchema = new Schema({
  locationId: {
    type: String,
    unique: true
  },
  locationAddress: String,
  locationCity: String,
  locationRegion: String,
  postalCode: String,
  accomodations: Boolean,
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
