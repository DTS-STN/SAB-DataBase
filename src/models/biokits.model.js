import mongoose, { Schema } from 'mongoose';

const BioKitSchema = new Schema();

BioKitSchema.add({
  bioKitId: String,
  accessible: Boolean
});

export default mongoose.model('BioKits', BioKitSchema);
