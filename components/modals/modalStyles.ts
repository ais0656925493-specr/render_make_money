/** Style dùng chung cho các modal auth / captcha / thành công */

export const modalShellClass =
  'mx-auto flex w-full min-w-0 max-h-[min(90dvh,calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-2rem))] flex-col overflow-hidden rounded-2xl border border-[#dadde1] bg-white shadow-[0_8px_30px_rgba(15,20,30,0.14)] sm:max-h-[min(92dvh,calc(100dvh-5rem))]'

export const modalShellPadClass = 'px-5 py-5 sm:px-6 sm:py-6'

export const modalTitleClass =
  'min-w-0 flex-1 pr-2 text-left text-[16px] font-bold leading-snug tracking-tight text-[#1c1e21] sm:text-[17px] break-words'

export const modalLeadClass = 'text-[14px] leading-relaxed text-[#65676B] sm:text-[15px]'

export const modalMediaClass =
  'mb-4 w-full overflow-hidden rounded-xl border border-[#e4e6eb] bg-[#f0f2f5]'

export const modalInputShellClass =
  'relative mb-2.5 flex h-11 w-full items-center rounded-xl border border-[#ccd0d5] bg-white px-3.5 text-[14px] text-[#1c1e21] transition duration-150 focus-within:border-[#1877f2] focus-within:ring-2 focus-within:ring-[#1877f2]/20'

export const modalInputShellErrorClass =
  'border-red-500 focus-within:border-red-500 focus-within:ring-red-500/20'

export const modalHintBoxClass =
  'mb-3 rounded-xl border border-[#ffd8a8] bg-[#fff8ee] px-3.5 py-2.5 text-[13px] leading-relaxed text-[#8a5b13]'

export const modalInfoBoxClass =
  'mb-4 rounded-xl border border-[#dbe6fb] bg-[#f5f9ff] px-3.5 py-2.5 text-[13px] leading-relaxed text-[#33507f]'

export const modalPrimaryBtnClass =
  'flex min-h-[48px] w-full cursor-pointer items-center justify-center rounded-full bg-[#0064E0] px-4 py-2.5 text-[15px] font-semibold text-white transition hover:brightness-105 active:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0064E0] disabled:cursor-not-allowed disabled:opacity-70'

export const modalSecondaryBtnClass =
  'mt-4 flex min-h-[44px] w-full items-center justify-center rounded-full border border-[#ccd0d5] bg-white text-[14px] font-semibold text-[#1c1e21] transition hover:bg-[#f0f2f5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1877f2]'

export const modalFooterLogoClass = 'mx-auto h-12 w-12 shrink-0 opacity-90'

export const modalRecaptchaShellClass =
  'flex w-full flex-row items-center justify-between rounded-xl border border-[#ccd0d5] bg-[#fafbfc] py-2 pl-3 pr-2.5 text-[#1c1e21]'

export const modalDetailsClass =
  'mt-4 overflow-hidden rounded-xl border border-[#e4e6eb] bg-[#fafbfc]'
