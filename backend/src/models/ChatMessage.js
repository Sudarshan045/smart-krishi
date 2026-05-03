// src/models/ChatMessage.js
import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    // Session grouping — useful for future conversation threading
    session_id: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true,
    },
    message: {
      type: String,
      required: [true, 'Message content is required'],
      maxlength: [5000, 'Message cannot exceed 5000 characters'],
    },
    // Category detected from the message (for analytics)
    category: {
      type: String,
      enum: ['soil', 'pest', 'irrigation', 'fertilizer', 'harvest', 'schemes', 'weather', 'market', 'general', null],
      default: null,
    },
    // Track if response was helpful (future feature)
    feedback: {
      type: String,
      enum: ['positive', 'negative', null],
      default: null,
    },
    language: {
      type: String,
      enum: ['en', 'mr'],
      default: 'en',
    },
  },
  {
    timestamps: true,
  }
);

chatMessageSchema.index({ user_id: 1, session_id: 1, createdAt: 1 });
chatMessageSchema.index({ createdAt: -1 });

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);
export default ChatMessage;
