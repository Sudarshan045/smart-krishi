import apiClient from './apiClient';

/**
 * Translate a single piece of text using the ML backend
 */
export async function mlTranslate(text, lang = 'mr') {
  const { data } = await apiClient.post('/translate', { text, lang });
  return data.translatedText;
}

/**
 * Batch translate multiple strings at once (faster - single API call)
 */
export async function mlTranslateBatch(texts, lang = 'mr') {
  const { data } = await apiClient.post('/translate', { texts, lang });
  return data.translations;
}
