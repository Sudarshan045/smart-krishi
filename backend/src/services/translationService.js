import { translate } from '@vitalets/google-translate-api';
import NodeCache from 'node-cache';
import mongoose from 'mongoose';
import { applyFarmingGlossary } from '../utils/farmingGlossary.js';

// In-memory cache (TTL: 7 days in seconds)
const memoryCache = new NodeCache({ stdTTL: 604800, checkperiod: 3600 });

// MongoDB schema for persistent translation cache
const translationCacheSchema = new mongoose.Schema({
  sourceText: { type: String, required: true },
  targetLang: { type: String, required: true, default: 'mr' },
  translatedText: { type: String, required: true },
  context: { type: String, default: 'farming' },
  createdAt: { type: Date, default: Date.now }
});

translationCacheSchema.index({ sourceText: 1, targetLang: 1 }, { unique: true });

let TranslationCache;
try {
  TranslationCache = mongoose.model('TranslationCache');
} catch {
  TranslationCache = mongoose.model('TranslationCache', translationCacheSchema);
}

/**
 * Translate text using Google Translate ML + farming glossary post-processing
 * Priority: Memory Cache → MongoDB Cache → Google Translate + Glossary
 */
export async function translateText(text, targetLang = 'mr') {
  if (!text || text.trim() === '') return text;

  const cacheKey = `${targetLang}:${text.trim().substring(0, 100)}`;

  // 1. Check memory cache first (fastest)
  const memCached = memoryCache.get(cacheKey);
  if (memCached) {
    return memCached;
  }

  // 2. Check MongoDB cache
  try {
    const dbCached = await TranslationCache.findOne({
      sourceText: text.trim(),
      targetLang
    });
    if (dbCached) {
      memoryCache.set(cacheKey, dbCached.translatedText);
      return dbCached.translatedText;
    }
  } catch (dbErr) {
    console.warn('DB cache lookup failed:', dbErr.message);
  }

  console.log(`Translating fresh: "${text.substring(0, 30)}"`);

  // 3. Call Google Translate ML
  try {
    // Direct call to Google Translate Mobile API (more reliable than some libraries)
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    const data = await response.json();
    
    let translated = "";
    if (data && data[0]) {
      translated = data[0].map(s => s[0]).join("");
    } else {
      throw new Error("Invalid response from Google Translate");
    }

    console.log(`ML Translation (Direct): "${text.substring(0, 30)}..." -> "${translated.substring(0, 30)}..." (${targetLang})`);

    // 4. Post-process: Apply farming glossary to make it farmer-friendly
    if (targetLang === 'mr') {
      const beforeGlossary = translated;
      translated = applyFarmingGlossary(translated);
      if (beforeGlossary !== translated) {
        console.log(`Glossary applied: "${beforeGlossary.substring(0, 20)}" -> "${translated.substring(0, 20)}"`);
      }
    }

    // 5. Save to memory cache and MongoDB
    memoryCache.set(cacheKey, translated);
    try {
      await TranslationCache.create({
        sourceText: text.trim(),
        targetLang,
        translatedText: translated,
        context: 'farming'
      });
    } catch (saveErr) {
      // Ignore duplicate key errors (race condition)
      if (saveErr.code !== 11000) {
        console.warn('Failed to cache translation to DB:', saveErr.message);
      }
    }

    return translated;

  } catch (translateErr) {
    console.error('Google Translate ML failed:', translateErr.message);
    // On failure, return the original text
    return text;
  }
}

/**
 * Batch translate multiple strings at once
 */
export async function translateBatch(texts, targetLang = 'mr') {
  const results = await Promise.all(
    texts.map(text => translateText(text, targetLang))
  );
  return results;
}
