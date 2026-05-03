// src/controllers/chatController.js
import { v4 as uuidv4 } from 'uuid';
import ChatMessage from '../models/ChatMessage.js';

/**
 * POST /api/chat/message
 * Protected — Save a chat message + AI response pair
 */
export const saveMessage = async (req, res, next) => {
  try {
    const { userMessage, assistantResponse, sessionId, category, language } = req.body;

    if (!userMessage || !assistantResponse) {
      return res.status(400).json({
        success: false,
        message: 'Both userMessage and assistantResponse are required',
      });
    }

    const sid = sessionId || uuidv4();

    // Save both user message and assistant response in one transaction
    const [userMsg, assistantMsg] = await Promise.all([
      ChatMessage.create({
        user_id: req.user._id,
        session_id: sid,
        role: 'user',
        message: userMessage.slice(0, 5000),
        category: category || null,
        language: language || 'en',
      }),
      ChatMessage.create({
        user_id: req.user._id,
        session_id: sid,
        role: 'assistant',
        message: assistantResponse.slice(0, 5000),
        category: category || null,
        language: language || 'en',
      }),
    ]);

    res.status(201).json({
      success: true,
      session_id: sid,
      messages: [userMsg, assistantMsg],
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/chat/history
 * Protected — Get paginated chat history for the user
 */
export const getChatHistory = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 20);
    const skip = (page - 1) * limit;
    const { session_id } = req.query;

    const filter = { user_id: req.user._id };
    if (session_id) filter.session_id = session_id;

    const [messages, total] = await Promise.all([
      ChatMessage.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      ChatMessage.countDocuments(filter),
    ]);

    // List distinct sessions
    const sessions = await ChatMessage.distinct('session_id', { user_id: req.user._id });

    res.status(200).json({
      success: true,
      total_sessions: sessions.length,
      messages,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/chat/history
 * Protected — Delete all chat history for the user
 */
export const clearChatHistory = async (req, res, next) => {
  try {
    await ChatMessage.deleteMany({ user_id: req.user._id });
    res.status(200).json({ success: true, message: 'Chat history cleared' });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/chat/messages/:id/feedback
 * Protected — Mark a message as helpful/not helpful
 */
export const submitFeedback = async (req, res, next) => {
  try {
    const { feedback } = req.body;
    if (!['positive', 'negative'].includes(feedback)) {
      return res.status(400).json({ success: false, message: 'Feedback must be positive or negative' });
    }

    const message = await ChatMessage.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user._id },
      { feedback },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    res.status(200).json({ success: true, message });
  } catch (error) {
    next(error);
  }
};
