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
  locationRegionFr: String,
  postalCode: String,
  accomodations: Boolean,
  hours: String,
  closures: [
    {
      type: String
    }
  ],
  bioKit: [BioKitSchema]
});

export default mongoose.model('Locations', LocationSchema);
