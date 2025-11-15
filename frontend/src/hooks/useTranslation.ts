import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';

export type Language = 'en' | 'cs' | 'zh';

type Translations = {
  navigation: Record<string, string>;
  homepage: Record<string, string>;
};

type TranslationState = {
  data: Translations;
  loaded: boolean;
};

const emptyTranslations: Translations = { navigation: {}, homepage: {} };

export function useTranslation() {
  const { language } = useLanguage();
  const [state, setState] = useState<TranslationState>({
    data: emptyTranslations,
    loaded: false,
  });

  useEffect(() => {
    let cancelled = false;

    async function loadTranslations() {
      try {
        const response = await fetch(`/locales/${language}.json`);
        const json = await response.json();
        if (!cancelled) {
          setState({ data: json, loaded: true });
        }
      } catch (error) {
        console.error(`Failed to load translations for ${language}:`, error);
        if (!cancelled) {
          setState({ data: emptyTranslations, loaded: false });
        }
      }
    }

    loadTranslations();
    return () => {
      cancelled = true;
    };
  }, [language]);

  return {
    t: state.data,
    language,
  };
}
