import mongoose, { Schema } from 'mongoose';

const BioKitSchema = new Schema();

BioKitSchema.add({
  bioKitId: String,
  timeSlots: [
    {
      time: String,
      closed: Boolean
    }
  ]
});

export default mongoose.model('BioKits', BioKitSchema);
