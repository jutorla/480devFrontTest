export type SupportedLang = 'en' | 'es';

export const getLang = (lang: string): SupportedLang => {
  return lang === 'es' ? 'es' : 'en';
};