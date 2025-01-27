import mongoose, { models, Schema } from 'mongoose';

const recycleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    context: {
      type: String,
      required: true,
    },

    subcontext: {
      type: String,
      required: true,
    },

    imgUrl: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'recycledetail',
  },
);

const RecycleDetailModel =
  models.RecycleDetail || mongoose.model('RecycleDetail', recycleSchema);

export default RecycleDetailModel;
