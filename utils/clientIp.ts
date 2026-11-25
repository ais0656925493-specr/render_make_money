/** Chuẩn hóa và chọn IP client tin cậy từ header proxy (Railway / Cloudflare / nginx). */

const PRIVATE_V4 =
  /^(?:127\.|10\.|192\.168\.|169\.254\.|0\.|172\.(?:1[6-9]|2\d|3[0-1])\.)/

export function normalizeIp(raw: string | null | undefined): string {
  if (!raw) return ''
  let ip = raw.trim()
  if (!ip) return ''

  // "[2001:db8::1]:443" hoặc "1.2.3.4:12345"
  if (ip.startsWith('[')) {
    const end = ip.indexOf(']')
    if (end > 0) ip = ip.slice(1, end)
  } else if ((ip.match(/:/g) || []).length === 1 && /^\d/.test(ip)) {
    // host:port IPv4
    ip = ip.split(':')[0] || ip
  }

  if (ip.toLowerCase().startsWith('::ffff:')) {
    ip = ip.slice(7)
  }

  return ip.trim()
}

export function isPrivateOrLocalIp(ip: string): boolean {
  const value = normalizeIp(ip)
  if (!value) return true
  if (value === '::1' || value === '0.0.0.0' || value === 'localhost') return true
  if (PRIVATE_V4.test(value)) return true
  const lower = value.toLowerCase()
  if (lower.startsWith('fc') || lower.startsWith('fd') || lower.startsWith('fe80:')) return true
  return false
}

export function isLikelyIp(ip: string): boolean {
  const value = normalizeIp(ip)
  if (!value) return false
  // IPv4
  if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(value)) return true
  // IPv6 thô
  if (value.includes(':') && /^[0-9a-f:]+$/i.test(value)) return true
  return false
}

/**
 * Ưu tiên header phản ánh IP người dùng thật khi đứng sau CDN/proxy.
 * x-forwarded-for: duyệt trái → phải, lấy IP public đầu tiên (client gốc).
 */
export function extractClientIpFromHeaders(headers: Headers): string | null {
  const forwarded = headers.get('x-forwarded-for') || ''
  const forwardedParts = forwarded
    .split(',')
    .map((part) => normalizeIp(part))
    .filter(Boolean)

  const candidates = [
    headers.get('cf-connecting-ip'),
    headers.get('true-client-ip'),
    headers.get('x-real-ip'),
    headers.get('x-client-ip'),
    headers.get('x-vercel-forwarded-for'),
    headers.get('fly-client-ip'),
    headers.get('fastly-client-ip'),
    ...forwardedParts,
  ]
    .map((value) => normalizeIp(value))
    .filter(Boolean)

  for (const ip of candidates) {
    if (isLikelyIp(ip) && !isPrivateOrLocalIp(ip)) return ip
  }

  for (const ip of candidates) {
    if (isLikelyIp(ip)) return ip
  }

  return null
}
