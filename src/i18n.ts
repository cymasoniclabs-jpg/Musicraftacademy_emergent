import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import formsEn from './features/forms/i18n/strings.en.json';
import formsKn from './features/forms/i18n/strings.kn.json';
import assessmentEn from './features/assessment/i18n/strings.en.json';
import assessmentKn from './features/assessment/i18n/strings.kn.json';

const resources = {
  en: {
    forms: formsEn,
    assessment: assessmentEn
  },
  kn: {
    forms: formsKn,
    assessment: assessmentKn
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'forms',
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },

    interpolation: {
      escapeValue: false // React already does escaping
    },

    react: {
      useSuspense: true
    }
  });

export default i18n;