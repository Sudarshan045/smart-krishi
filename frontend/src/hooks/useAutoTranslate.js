import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { mlTranslate, mlTranslateBatch } from '../services/translationService';

// Global in-memory cache to avoid duplicate network calls across components
const translationMemCache = new Map();

/**
 * useAutoTranslate - React hook for automatic ML-powered translation
 * 
 * Usage:
 *   const { text } = useAutoTranslate("Hello farmer");
 *   const { texts } = useAutoTranslateBatch(["Hello", "Test your soil"]);
 * 
 * - Uses ML backend (Google Translate + farming glossary)
 * - Caches results in memory to prevent repeated API calls
 * - Falls back to original text on error
 * - Only triggers translation when language is Marathi
 */
export function useAutoTranslate(originalText) {
  const { language } = useLanguage();
  const [text, setText] = useState(originalText);
  const [loading, setLoading] = useState(false);
  const cachedRef = useRef(null);

  useEffect(() => {
    if (language === 'en') {
      setText(originalText);
      return;
    }

    if (!originalText) return;

    const cacheKey = `mr:${originalText}`;

    // Check memory cache first
    if (translationMemCache.has(cacheKey)) {
      setText(translationMemCache.get(cacheKey));
      return;
    }

    let cancelled = false;
    setLoading(true);

    mlTranslate(originalText, 'mr')
      .then(translated => {
        if (!cancelled) {
          translationMemCache.set(cacheKey, translated);
          setText(translated);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setText(originalText); // Fallback to original
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [language, originalText]);

  return { text, loading };
}

/**
 * useAutoTranslateBatch - Translate multiple strings efficiently in one API call
 * Returns an array of translated strings in the same order as input
 */
export function useAutoTranslateBatch(originalTexts = []) {
  const { language } = useLanguage();
  const [texts, setTexts] = useState(originalTexts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (language === 'en') {
      setTexts(originalTexts);
      return;
    }

    if (!originalTexts.length) return;

    // Separate cached vs uncached
    const results = [];
    const toFetch = [];
    const toFetchIdx = [];

    originalTexts.forEach((t, i) => {
      const key = `mr:${t}`;
      if (translationMemCache.has(key)) {
        results[i] = translationMemCache.get(key);
      } else {
        results[i] = t; // Placeholder
        toFetch.push(t);
        toFetchIdx.push(i);
      }
    });

    // If all cached, render immediately
    if (toFetch.length === 0) {
      setTexts([...results]);
      return;
    }

    let cancelled = false;
    setLoading(true);

    mlTranslateBatch(toFetch, 'mr')
      .then(translated => {
        if (!cancelled) {
          translated.forEach((t, j) => {
            const origIdx = toFetchIdx[j];
            results[origIdx] = t;
            translationMemCache.set(`mr:${originalTexts[origIdx]}`, t);
          });
          setTexts([...results]);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setTexts(originalTexts);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [language]);

  return { texts, loading };
}
