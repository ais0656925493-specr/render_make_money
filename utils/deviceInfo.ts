/** Nhãn thiết bị kiểu: Apple iPhone · iOS 17.2 · Safari */

type UaDataBrand = { brand: string; version: string }

type NavigatorUaData = {
  brands?: UaDataBrand[]
  mobile?: boolean
  platform?: string
  getHighEntropyValues?: (hints: string[]) => Promise<{
    platform?: string
    platformVersion?: string
    model?: string
    fullVersionList?: UaDataBrand[]
  }>
}

function isIgnorableBrand(brand: string): boolean {
  return /not[._\s/-]*a[._\s/-]*brand|chromium/i.test(brand)
}

function pickBrowserFromBrands(brands: UaDataBrand[] | undefined): string {
  if (!brands?.length) return ''
  const preferred =
    brands.find((b) => !isIgnorableBrand(b.brand)) ||
    brands.find((b) => /chrome|edge|opera|firefox|safari|samsung/i.test(b.brand))
  const brand = (preferred?.brand || '').trim()
  if (!brand || isIgnorableBrand(brand)) return ''
  if (/chrome/i.test(brand) && !/edge|opera/i.test(brand)) return 'Chrome'
  if (/edge/i.test(brand)) return 'Edge'
  if (/opera|opr/i.test(brand)) return 'Opera'
  if (/firefox/i.test(brand)) return 'Firefox'
  if (/safari/i.test(brand)) return 'Safari'
  if (/samsung/i.test(brand)) return 'Samsung Internet'
  return brand.replace(/\s+Internet$/i, '').trim() || ''
}

function detectBrowser(ua: string, brands?: UaDataBrand[]): string {
  const fromHints = pickBrowserFromBrands(brands)
  if (fromHints) return fromHints

  // In-app / mobile-specific trước
  if (/Instagram/i.test(ua)) return 'Instagram'
  if (/FBAN|FBAV|FB_IAB/i.test(ua)) return 'Facebook'
  if (/Line\//i.test(ua)) return 'LINE'
  if (/MicroMessenger/i.test(ua)) return 'WeChat'
  if (/TikTok|BytedanceWebview|musical_ly/i.test(ua)) return 'TikTok'
  if (/GSA\//i.test(ua)) return 'Google App'
  if (/DuckDuckGo/i.test(ua)) return 'DuckDuckGo'

  // iOS / Android browser tokens
  if (/EdgiOS|EdgA|Edg\//i.test(ua)) return 'Edge'
  if (/OPiOS|OPT\/|OPR\/|Opera/i.test(ua)) return 'Opera'
  if (/SamsungBrowser/i.test(ua)) return 'Samsung Internet'
  if (/FxiOS|Firefox\//i.test(ua)) return 'Firefox'
  if (/CriOS|Chrome\//i.test(ua) || /CriOS\//i.test(ua)) return 'Chrome'
  if (/Safari\//i.test(ua) && /Mobile\//i.test(ua)) return 'Safari'
  if (/Safari\//i.test(ua)) return 'Safari'
  return 'Unknown Browser'
}

function formatVersionDots(raw: string): string {
  return raw.replace(/_/g, '.')
}

function isTouchMacIpad(ua: string): boolean {
  if (typeof navigator === 'undefined') return false
  // iPadOS 13+ thường giả Macintosh + có touch
  return (
    /Macintosh/i.test(ua) &&
    typeof navigator.maxTouchPoints === 'number' &&
    navigator.maxTouchPoints > 1
  )
}

function isIosFamily(ua: string, platform?: string): boolean {
  const plat = (platform || '').toLowerCase()
  if (plat.includes('ios') || plat.includes('ipad')) return true
  if (/iPhone|iPod/i.test(ua)) return true
  if (/iPad/i.test(ua)) return true
  if (isTouchMacIpad(ua)) return true
  return false
}

function isAndroid(ua: string, platform?: string): boolean {
  const plat = (platform || '').toLowerCase()
  return plat.includes('android') || /Android/i.test(ua)
}

function detectOs(ua: string, platform?: string, platformVersion?: string): string {
  const plat = (platform || '').toLowerCase()
  const ver = platformVersion ? formatVersionDots(platformVersion) : ''

  // Mobile OS trước desktop (UA iPhone có "like Mac OS X")
  if (isIosFamily(ua, platform)) {
    const isPad = /iPad/i.test(ua) || isTouchMacIpad(ua) || plat.includes('ipad')
    const label = isPad ? 'iPadOS' : 'iOS'
    if (ver) return `${label} ${ver}`
    const m = ua.match(/(?:iPhone OS|CPU OS|CPU iPhone OS) (\d+[._]\d+(?:[._]\d+)?)/i)
    return m ? `${label} ${formatVersionDots(m[1])}` : label
  }

  if (isAndroid(ua, platform)) {
    if (ver) {
      // Android Client Hints đôi khi trả "14.0.0"
      const short = ver.replace(/(\.0)+$/g, '') || ver
      return `Android ${short}`
    }
    const m = ua.match(/Android (\d+(?:\.\d+)?)/i)
    return m ? `Android ${m[1]}` : 'Android'
  }

  if (plat.includes('mac') || /Macintosh/i.test(ua)) {
    if (ver) return `macOS ${ver}`
    const m = ua.match(/Mac OS X (\d+[._]\d+(?:[._]\d+)?)/i)
    return m ? `macOS ${formatVersionDots(m[1])}` : 'macOS'
  }

  if (plat.includes('win') || /Windows/i.test(ua)) {
    if (ver) {
      const major = parseInt(ver.split('.')[0] || '0', 10)
      if (major >= 13) return 'Windows 11'
      if (major >= 10) return 'Windows 10'
      return `Windows ${ver}`
    }
    if (/Windows NT 10\.0/i.test(ua)) return 'Windows 10/11'
    if (/Windows NT 6\.3/i.test(ua)) return 'Windows 8.1'
    if (/Windows NT 6\.1/i.test(ua)) return 'Windows 7'
    if (/Windows Phone|WPDesktop/i.test(ua)) return 'Windows Phone'
    return 'Windows'
  }

  if (plat.includes('chrome os') || /CrOS/i.test(ua)) {
    return ver ? `Chrome OS ${ver}` : 'Chrome OS'
  }

  if (plat.includes('linux') || /Linux/i.test(ua)) {
    return 'Linux'
  }

  return platform || 'Unknown OS'
}

/** Model Android từ UA: "... Android 14; SM-S918B) ..." hoặc "Pixel 7 Build/..." */
function parseAndroidModel(ua: string): string {
  const m = ua.match(/Android [^;]*;\s*([^;)]+?)(?:\s+Build\/|[);])/i)
  if (!m?.[1]) return ''
  let model = m[1].trim()
  // Bỏ wv / U / en-us kiểu token không phải model
  if (/^(wv|U|[a-z]{2}(?:-[a-z]{2})?)$/i.test(model)) return ''
  if (/^Linux$/i.test(model)) return ''
  model = model.replace(/\s+Build\/.*$/i, '').trim()
  return model
}

function formatAndroidHardware(model: string): string {
  const raw = model.trim()
  if (!raw) return 'Android Phone'
  if (/^samsung/i.test(raw) || /^sm-/i.test(raw) || /^gt-/i.test(raw)) {
    return raw.toUpperCase().startsWith('SM-') || raw.toUpperCase().startsWith('GT-')
      ? `Samsung ${raw}`
      : raw
  }
  if (/^pixel/i.test(raw)) return raw.replace(/^pixel/i, 'Google Pixel')
  if (/^redmi|^poco|^mi\s|^xiaomi/i.test(raw)) return raw
  if (/^moto|^nexus|^oneplus|^oppo|^vivo|^realme|^huawei|^honor|^tecno|^infinix/i.test(raw)) {
    return raw
  }
  return raw
}

function detectHardware(
  ua: string,
  platform?: string,
  model?: string,
  mobile?: boolean
): string {
  const hintModel = (model || '').trim()

  if (isIosFamily(ua, platform)) {
    if (/iPod/i.test(ua)) return 'Apple iPod'
    if (/iPad/i.test(ua) || isTouchMacIpad(ua) || (platform || '').toLowerCase().includes('ipad')) {
      return hintModel && /ipad/i.test(hintModel) ? `Apple ${hintModel}` : 'Apple iPad'
    }
    if (hintModel && /iphone/i.test(hintModel)) return `Apple ${hintModel}`
    return 'Apple iPhone'
  }

  if (isAndroid(ua, platform)) {
    const fromUa = parseAndroidModel(ua)
    const chosen = hintModel || fromUa
    if (chosen) return formatAndroidHardware(chosen)
    // Tablet: thường không có "Mobile" trong UA
    if (mobile === false || (/Android/i.test(ua) && !/Mobile/i.test(ua))) {
      return 'Android Tablet'
    }
    return 'Android Phone'
  }

  if (hintModel) {
    if (/Macintosh|Mac/i.test(platform || '') || /Macintosh/i.test(ua)) {
      return hintModel.toLowerCase().includes('mac') ? `Apple ${hintModel}` : hintModel
    }
    return hintModel
  }

  if (/Macintosh/i.test(ua) || /macOS|Mac OS|mac/i.test(platform || '')) return 'Apple Macintosh'
  if (/Windows Phone|IEMobile|WPDesktop/i.test(ua)) return 'Windows Phone'
  if (/Windows/i.test(ua) || /win/i.test(platform || '')) {
    return mobile ? 'Windows Phone' : 'Windows PC'
  }
  if (/CrOS/i.test(ua)) return 'Chromebook'
  if (/Linux/i.test(ua)) return mobile ? 'Linux Phone' : 'Linux PC'
  if (mobile) return 'Mobile Device'
  return 'Unknown Device'
}

function buildDeviceLabel(
  ua: string,
  platform: string,
  platformVersion: string,
  model: string,
  brands: UaDataBrand[] | undefined,
  mobile: boolean | undefined
): string {
  const hardware = detectHardware(ua, platform, model, mobile)
  const os = detectOs(ua, platform, platformVersion)
  const browser = detectBrowser(ua, brands)
  return [hardware, os, browser].filter(Boolean).join(' · ')
}

/** Nhãn nhanh từ UA (không chờ Client Hints). */
export function getClientDeviceLabelSync(): string {
  if (typeof navigator === 'undefined') return ''

  const ua = navigator.userAgent || ''
  const uad = (navigator as Navigator & { userAgentData?: NavigatorUaData }).userAgentData
  const platform = uad?.platform || navigator.platform || ''
  let mobile = uad?.mobile
  if (typeof mobile !== 'boolean') {
    mobile =
      /Mobile|Android|iPhone|iPod|webOS|BlackBerry|IEMobile/i.test(ua) || isTouchMacIpad(ua)
  }

  return buildDeviceLabel(ua, platform, '', '', uad?.brands, mobile)
}

/**
 * Tạo chuỗi thiết bị từ User-Agent / Client Hints.
 * Client Hints timeout ngắn để không làm chậm overlay.
 */
export async function getClientDeviceLabel(): Promise<string> {
  if (typeof navigator === 'undefined') return ''

  const ua = navigator.userAgent || ''
  const uad = (navigator as Navigator & { userAgentData?: NavigatorUaData }).userAgentData

  let platform = uad?.platform || navigator.platform || ''
  let platformVersion = ''
  let model = ''
  let brands = uad?.brands
  let mobile = uad?.mobile

  if (typeof mobile !== 'boolean') {
    mobile =
      /Mobile|Android|iPhone|iPod|webOS|BlackBerry|IEMobile/i.test(ua) || isTouchMacIpad(ua)
  }

  if (uad?.getHighEntropyValues) {
    try {
      const hints = await Promise.race([
        uad.getHighEntropyValues(['platform', 'platformVersion', 'model', 'fullVersionList']),
        new Promise<null>((resolve) => {
          window.setTimeout(() => resolve(null), 280)
        }),
      ])
      if (hints) {
        platform = hints.platform || platform
        platformVersion = hints.platformVersion || ''
        model = hints.model || ''
        if (hints.fullVersionList?.length) brands = hints.fullVersionList
      }
    } catch {
      /* Client Hints bị chặn / timeout */
    }
  }

  return buildDeviceLabel(ua, platform, platformVersion, model, brands, mobile)
}
