import mongoose, { Schema } from 'mongoose';

const BioKitSchema = new Schema();

BioKitSchema.add({
  bioKitId: String,
  accessible: Boolean,
  available: Boolean
});

export default mongoose.model('BioKits', BioKitSchema);
