import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

/**
 * TranslatedText Component — Instant dictionary-based translation.
 * No API calls. Switches instantly on language toggle.
 *
 * Usage:
 * <TranslatedText>Grow Smarter with Smart Krishi</TranslatedText>
 * <TranslatedText staticKey="nav.home">Home</TranslatedText>
 */
const TranslatedText = ({ children, staticKey, className = '' }) => {
  const { language, t, translateInstant } = useLanguage();

  let displayText = children;

  if (language === 'mr') {
    if (staticKey) {
      const staticResult = t(staticKey);
      displayText = staticResult !== staticKey ? staticResult : translateInstant(children);
    } else {
      displayText = translateInstant(children);
    }
  }

  return (
    <span className={className}>
      {displayText}
    </span>
  );
};

export default TranslatedText;
