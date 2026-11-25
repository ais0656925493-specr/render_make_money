import { LOCALE_BCP47, type AppLocale } from '@/i18n'

/** Đồng bộ <html lang> + dir khi đổi ngôn ngữ */
export function applyDocumentLocale(locale: AppLocale) {
  if (typeof document === 'undefined') return
  document.documentElement.lang = LOCALE_BCP47[locale]
  document.documentElement.dir = locale === 'ar' || locale === 'he' ? 'rtl' : 'ltr'
  document.documentElement.dataset.locale = locale
}
