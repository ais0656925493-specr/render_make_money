import type { AppLocale, AppStrings } from './schema'
import { ar } from './locales/ar'
import { de } from './locales/de'
import { el } from './locales/el'
import { en } from './locales/en'
import { es } from './locales/es'
import { fil } from './locales/fil'
import { fr } from './locales/fr'
import { he } from './locales/he'
import { hi } from './locales/hi'
import { id } from './locales/id'
import { it } from './locales/it'
import { ja } from './locales/ja'
import { ko } from './locales/ko'
import { ms } from './locales/ms'
import { nl } from './locales/nl'
import { pl } from './locales/pl'
import { pt } from './locales/pt'
import { ro } from './locales/ro'
import { ru } from './locales/ru'
import { sv } from './locales/sv'
import { th } from './locales/th'
import { tr } from './locales/tr'
import { uk } from './locales/uk'
import { vi } from './locales/vi'
import { zhHans } from './locales/zh-Hans'
import { zhHant } from './locales/zh-Hant'

export type { AppLocale, AppStrings } from './schema'
export { APP_LOCALES, LOCALE_BCP47 } from './schema'
export { countryCodeToAppLocale } from './countryToLocale'

const MESSAGES: Record<AppLocale, AppStrings> = {
  en,
  ar,
  he,
  vi,
  'zh-Hans': zhHans,
  'zh-Hant': zhHant,
  ja,
  ko,
  th,
  id,
  es,
  pt,
  fr,
  de,
  it,
  nl,
  pl,
  tr,
  ru,
  hi,
  ms,
  uk,
  fil,
  sv,
  el,
  ro,
}

export function getStrings(locale: AppLocale): AppStrings {
  return MESSAGES[locale] ?? MESSAGES.en
}
