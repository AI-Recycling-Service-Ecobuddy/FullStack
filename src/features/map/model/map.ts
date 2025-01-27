import mongoose, { models, Schema } from "mongoose";

const MapSchema = new Schema(
  {
    imgUrl: {
        type:String,
        required: true,
    },

    lng: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },
    id: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      lat: {
        type: String,
        required: true,
      },

   
  },
  {
    collection:'map'
  }
);

const Map = mongoose.models.Map || mongoose.model("Map", MapSchema);

export default Map;
