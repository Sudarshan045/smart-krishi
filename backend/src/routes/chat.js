// src/routes/chat.js
import { Router } from 'express';
import {
  saveMessage, getChatHistory, clearChatHistory, submitFeedback,
} from '../controllers/chatController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Chat history + save requires login
router.use(requireAuth);

router.post('/message', saveMessage);
router.get('/history', getChatHistory);
router.delete('/history', clearChatHistory);
router.patch('/messages/:id/feedback', submitFeedback);

export default router;
