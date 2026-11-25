'use client'

import React from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { setLocale } from '@/app/store/slices/localeSlice'
import { APP_LOCALES, type AppLocale } from '@/i18n/schema'
import { LOCALE_OPTION_LABELS } from '@/i18n/localeOptionLabels'
import { useAppStrings } from '@/hooks/useAppStrings'
import { applyDocumentLocale } from '@/utils/applyDocumentLocale'
import { readSessionDisplayLocale, writeSessionDisplayLocale } from '@/utils/facebookContentMonetizationDisplayLocale'

const selectBase =
  'w-full cursor-pointer border bg-white font-medium leading-tight text-[#1f2a45] outline-none transition duration-150 hover:border-[#1877f2] focus-visible:ring-2 focus-visible:ring-[#1877f2]/30'

export default function PrivacyLanguagePicker({
  variant = 'default',
}: {
  variant?: 'default' | 'header'
}) {
  const t = useAppStrings()
  const dispatch = useAppDispatch()
  const currentLocale = useAppSelector((s) => s.locale.locale)

  const [pickerValue, setPickerValue] = React.useState<AppLocale>(currentLocale)
  const [open, setOpen] = React.useState(false)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const listRef = React.useRef<HTMLDivElement>(null)
  const listId = `facebook-content-monetization-display-lang-${variant}-list`
  const hydratedRef = React.useRef(false)

  React.useEffect(() => {
    if (hydratedRef.current) {
      setPickerValue(currentLocale)
      return
    }
    hydratedRef.current = true
    const sessionLocale = readSessionDisplayLocale()
    if (sessionLocale) {
      setPickerValue(sessionLocale)
      dispatch(setLocale(sessionLocale))
      applyDocumentLocale(sessionLocale)
      return
    }
    setPickerValue(currentLocale)
    applyDocumentLocale(currentLocale)
  }, [currentLocale, dispatch])

  React.useEffect(() => {
    if (!open) return
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  React.useEffect(() => {
    if (!open) return
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [open])

  const chooseLocale = (locale: AppLocale) => {
    writeSessionDisplayLocale(locale)
    setPickerValue(locale)
    dispatch(setLocale(locale))
    applyDocumentLocale(locale)
    setOpen(false)
  }

  const isHeader = variant === 'header'
  const selectClass = isHeader
    ? 'ml-0.5 min-h-[34px] w-[34vw] max-w-[148px] min-w-0 cursor-pointer rounded-full border border-[#ccd0d5] bg-white px-2.5 py-1.5 text-[12px] font-semibold leading-tight text-[#1c1e21] outline-none transition hover:border-[#bcc0c4] hover:bg-[#fafbfc] sm:ml-1 sm:w-auto sm:max-w-[200px] sm:px-4 sm:py-2 sm:text-[14px]'
    : `${selectBase} min-h-[34px] rounded-[10px] border-[#dbe9ff] px-[10px] py-[5px] text-[11px] shadow-sm sm:min-h-[36px] sm:px-[11px] sm:text-[12px]`

  return (
    <div className={isHeader ? 'w-auto min-w-0' : 'mx-auto w-full'}>
      <div
        ref={rootRef}
        className={
          isHeader
            ? 'relative w-auto'
            : 'relative mx-auto w-full max-w-[220px] min-w-0 sm:max-w-[240px]'
        }
      >
        <button
          id={`facebook-content-monetization-display-lang-${variant}`}
          type="button"
          className={`${selectClass} flex items-center justify-between gap-2 text-left`}
          aria-label={t.languagePicker.label}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="min-w-0 truncate">{LOCALE_OPTION_LABELS[pickerValue]}</span>
          <svg className={`h-3 w-3 shrink-0 opacity-70 transition ${open ? 'rotate-180' : ''}`} viewBox="0 0 12 12" aria-hidden="true">
            <path d="M2.2 4.2 6 8l3.8-3.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {open ? (
          <div
            ref={listRef}
            id={listId}
            role="listbox"
            aria-label={t.languagePicker.label}
            className="absolute right-0 z-[80] mt-1 max-h-[220px] w-[220px] overflow-y-scroll rounded-xl border border-[#ccd0d5] bg-white py-1 text-left shadow-[0_8px_24px_rgba(15,20,30,0.16)] [scrollbar-color:#65676B_#e4e6eb] [scrollbar-width:auto] [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#65676B] [&::-webkit-scrollbar-track]:bg-[#e4e6eb]"
          >
            {APP_LOCALES.map((code) => {
              const selected = code === pickerValue
              return (
                <button
                  key={code}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={`block w-full px-3 py-2 text-left text-[13px] leading-tight ${
                    selected ? 'bg-[#e7f3ff] font-semibold text-[#0064e0]' : 'text-[#1c1e21] hover:bg-[#f0f2f5]'
                  }`}
                  onClick={() => chooseLocale(code)}
                >
                  {LOCALE_OPTION_LABELS[code]}
                </button>
              )
            })}
          </div>
        ) : null}
      </div>
    </div>
  )
}
