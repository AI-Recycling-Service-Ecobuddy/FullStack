import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  id: { type: String, required: true },
  content: { type: String, required: true },
  role: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ChatSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  messages: [MessageSchema],
  createdAt: { type: Date, default: Date.now },
}, {
  timestamps: true,
  collection: "chat",
  versionKey: false,
});

export const Chat = mongoose.models.Chat || mongoose.model('Chat', ChatSchema);