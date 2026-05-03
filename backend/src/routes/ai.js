// src/routes/ai.js
import { Router } from 'express';
import { getAIResponse, analyzeCropImage } from '../services/aiService.js';

const router = Router();

/**
 * POST /api/ai/chat
 * Public — Get AI response for a farming question
 * Body: { message: string, history: [{role, content}], language: 'en'|'mr' }
 */
router.post('/chat', async (req, res) => {
  try {
    const { message, history = [], language = 'en' } = req.body;

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({
        success: false,
        message: "Field 'message' is required and must be a non-empty string.",
      });
    }

    const aiReply = await getAIResponse(message.trim(), history, language);

    res.json({
      success: true,
      reply: aiReply,
    });
  } catch (err) {
    console.error('AI chat route error:', err);
    res.status(500).json({
      success: false,
      message: 'AI service error. Please try again.',
    });
  }
});

/**
 * POST /api/ai/analyze-image
 * Public — Analyze crop image for disease
 * Body: { image: base64_string }
 */
router.post('/analyze-image', async (req, res) => {
  try {
    const { image, crop, symptoms } = req.body;

    if (!image || typeof image !== 'string') {
      return res.status(400).json({
        success: false,
        message: "Field 'image' is required and must be a base64 string.",
      });
    }

    const analysisResult = await analyzeCropImage(image, crop, symptoms);

    res.json({
      success: true,
      data: analysisResult,
    });
  } catch (err) {
    console.error('AI image analysis route error:', err);
    res.status(500).json({
      success: false,
      message: 'AI image analysis failed. Please try again.',
    });
  }
});

export default router;
