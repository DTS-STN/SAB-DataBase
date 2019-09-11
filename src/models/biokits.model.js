import mongoose, { Schema } from 'mongoose';

const BioKitSchema = new Schema();

BioKitSchema.add({
  bioKitId: String,
  accessible: Boolean,
  private: Boolean,
  available: Boolean
});

export default mongoose.model('BioKits', BioKitSchema);
