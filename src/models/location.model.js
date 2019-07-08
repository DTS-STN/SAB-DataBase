import mongoose, { Schema } from 'mongoose';
import BioKitModel from './biokits.model';

const BioKitSchema = BioKitModel.schema;

const DateRangeSchema = new Schema({ periodStart: Date, periodEnd: Date });

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
  closures: {
    type: [DateRangeSchema],
    default: undefined
  },
  bioKits: {
    type: [BioKitSchema],
    default: undefined
  }
});

export default mongoose.model('Locations', LocationSchema);
