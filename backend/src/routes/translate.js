import express from 'express';
import { translateText, translateBatch } from '../services/translationService.js';

const router = express.Router();

/**
 * POST /api/translate
 * Translate a single text or array of texts to Marathi (or back to English)
 * 
 * Body: { text: string, lang: 'mr' | 'en' }
 *   OR  { texts: string[], lang: 'mr' | 'en' }
 */
router.post('/', async (req, res) => {
  try {
    const { text, texts, lang = 'mr' } = req.body;

    // Validate
    if (!text && (!texts || !Array.isArray(texts))) {
      return res.status(400).json({
        success: false,
        message: "Provide 'text' (string) or 'texts' (array)"
      });
    }

    if (lang !== 'mr' && lang !== 'en') {
      return res.status(400).json({
        success: false,
        message: "lang must be 'mr' or 'en'"
      });
    }

    // Batch mode
    if (texts && Array.isArray(texts)) {
      const translated = await translateBatch(texts, lang);
      return res.json({ success: true, translations: translated });
    }

    // Single mode
    const translated = await translateText(text, lang);
    return res.json({ success: true, translatedText: translated });

  } catch (err) {
    console.error('Translation route error:', err);
    res.status(500).json({
      success: false,
      message: 'Translation failed. Please try again.'
    });
  }
});

/**
 * GET /api/translate/health
 * Check if translation service is working
 */
router.get('/health', async (req, res) => {
  try {
    const test = await translateText('Hello farmer', 'mr');
    res.json({ success: true, test, message: 'Translation service is running ✅' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Translation service is down ❌' });
  }
});

export default router;
