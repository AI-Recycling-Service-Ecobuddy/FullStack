import mongoose, { models } from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'register',
    versionKey: false,
  },
);

const UserModel = models?.User || mongoose.model('User', UserSchema);
export default UserModel;
