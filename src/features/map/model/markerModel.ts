import mongoose, { Schema } from 'mongoose';

const MapSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'map',
  },
);

const MarkerModel = mongoose.models.Map || mongoose.model('Map', MapSchema);

export default MarkerModel;
