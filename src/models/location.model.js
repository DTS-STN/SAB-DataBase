import mongoose, { Schema } from 'mongoose';

const LocationSchema = new Schema({
  locationId: String,
  locationAddress: String,
  locationCity: String,
  locationRegion: String,
  locationRegionFr: String,
  posstalCode: String,
  accomodations: Boolean,
  hours: String,
  closures: [
    {
      type: String
    }
  ],
  bioKit: [BioKitSchema]
});

const BioKitSchema = new Schema({
  stationId: String,
  timeSlots: [
    {
      time: String,
      closed: Boolean
    }
  ]
});
