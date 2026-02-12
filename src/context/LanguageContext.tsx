'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import translations from '@/src/data/translations';

export type LanguageCode = 'en' | 'hi' | 'kn' | 'bn' | 'mr' | 'ta';

type TranslationKey =
  | 'heroTitle'
  | 'heroSubtitle'
  | 'searchPlaceholder'
  | 'loginBtn'
  | 'bookBtn'
  | 'voiceBtn'
  // Navbar
  | 'navHome'
  | 'navFindServices'
  | 'navRegister'
  // Footer
  | 'brandTagline'
  | 'footerQuickLinks'
  | 'footerHome'
  | 'footerFindServices'
  | 'footerRegister'
  | 'footerContact'
  | 'footerEmailLine'
  | 'footerPhoneLine'
  | 'footerMadeWithLove'
  | 'footerCopyright'
  // Home - How it works & features
  | 'howItWorksTitle'
  | 'howItWorksSubtitle'
  | 'howStep1Title'
  | 'howStep1Body'
  | 'howStep2Title'
  | 'howStep2Body'
  | 'howStep3Title'
  | 'howStep3Body'
  | 'featuresTitle'
  | 'featureVerifiedTitle'
  | 'featureVerifiedBody'
  | 'featureEasyBookingTitle'
  | 'featureEasyBookingBody'
  | 'featureSupportWomenTitle'
  | 'featureSupportWomenBody'
  | 'featureTrustedTitle'
  | 'featureTrustedBody'
  // Home - CTA / hero buttons
  | 'ctaReadyTitle'
  | 'ctaReadySubtitle'
  | 'ctaFindServicesBtn'
  | 'ctaRegisterNowBtn'
  | 'heroFindServicesBtn'
  | 'heroRegisterProviderBtn'
  // Find Services
  | 'findTitle'
  | 'findSubtitle'
  | 'reviewsLabel'
  | 'emptyStateNoProviders'
  // Register page
  | 'registerTitle'
  | 'registerSubtitle'
  | 'regFullNameLabel'
  | 'regFullNamePlaceholder'
  | 'regWhatsappLabel'
  | 'regWhatsappPlaceholder'
  | 'regEmailLabel'
  | 'regEmailPlaceholder'
  | 'regServiceTypeLabel'
  | 'regServiceTypePlaceholder'
  | 'regServiceTailoring'
  | 'regServiceMehendi'
  | 'regServiceCooking'
  | 'regServiceBeauty'
  | 'regServiceOther'
  | 'regLocationLabel'
  | 'regLocationPlaceholder'
  | 'regExperienceLabel'
  | 'regExperiencePlaceholder'
  | 'regAboutServiceLabel'
  | 'regAboutServicePlaceholder'
  | 'regSubmitBtn'
  | 'regDisclaimer'
  | 'regSuccessTitle'
  | 'regSuccessBody'
  | 'reviewsTitle'
  | 'addReviewTitle'
  | 'nameLabel'
  | 'ratingLabel'
  | 'commentLabel'
  | 'submitReviewBtn'
  | 'reviewSubmittedMsg'
  | 'viewReviewsBtn'
  | 'closeBtn'
  | 'noReviews';

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'skillsakhi_language';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('en');

  // Load saved language on first client render
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
      if (saved && translations[saved]) setLanguageState(saved);
    } catch {
      // ignore
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const t = useMemo(() => {
    return (key: TranslationKey) => {
      const langTable = translations[language] || translations.en;
      return (langTable && langTable[key]) || translations.en[key] || key;
    };
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage, t }),
    [language, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}

