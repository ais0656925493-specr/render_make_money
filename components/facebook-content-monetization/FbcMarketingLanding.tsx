'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { useAppSelector } from '@/app/store/hooks'
import { FBC_LANDING_MEDIA } from '#data/fbcLandingMedia'
import { LOCALE_BCP47 } from '@/i18n'
import { useAppStrings } from '@/hooks/useAppStrings'

const FB_BLUE = '#0064e0'
/** Header 1 hàng cố định (đồng bộ scroll-mt nội dung) */
const HEADER_OFFSET_PT = 'pt-[64px]'
const SCROLL_MT = 'scroll-mt-[76px]'

const navLinkClass =
    'inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-[13px] font-medium text-[#1c1e21] transition-colors hover:bg-[#f0f2f5] hover:text-[#0064e0] sm:text-[14px]'

type FbcMarketingLandingProps = {
    onSubmitApplication: () => void
    children: React.ReactNode
}

function ChevronDown({ className }: { className?: string }) {
    return (
        <svg className={className} width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <path fill="currentColor" d="M5 6.5 1.2 2.7l.6-.6L5 5.3l3.2-3.2.6.6L5 6.5Z" />
        </svg>
    )
}

export default function FbcMarketingLanding({ onSubmitApplication, children }: FbcMarketingLandingProps) {
    const t = useAppStrings()
    const locale = useAppSelector((s) => s.locale.locale)
    const currentDate = React.useMemo(
        () =>
            new Date().toLocaleDateString(LOCALE_BCP47[locale], {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            }),
        [locale]
    )
    const dateIso = React.useMemo(() => new Date().toISOString().slice(0, 10), [])

    const scrollToApply = () => {
        document.getElementById('fbcm-resources')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    const reelRef = React.useRef<HTMLVideoElement>(null)
    const [reelIndex, setReelIndex] = React.useState(0)
    const [reelPlaying, setReelPlaying] = React.useState(false)
    const reelCount = FBC_LANDING_MEDIA.creatorReels.length

    const showReel = (index: number) => {
        const next = (index + reelCount) % reelCount
        setReelIndex(next)
        setReelPlaying(false)
        const video = reelRef.current
        if (!video) return
        video.pause()
        video.currentTime = 0
    }

    const toggleReel = () => {
        const video = reelRef.current
        if (!video) return
        if (video.paused) {
            void video.play()
            return
        }
        video.pause()
    }

    return (
        <div className="min-h-[100dvh] scroll-smooth bg-[#f6f7f9] text-[#1c1e21] antialiased">
            <header className="fixed inset-x-0 top-0 z-50 border-b border-[#dfe3e8] bg-white shadow-[0_1px_2px_rgba(15,20,30,0.05)]">
                <div className="mx-auto flex h-16 w-full max-w-[1240px] items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:px-8">
                    <Link
                        href="/facebook-content-monetization#fbcm-hero"
                        className="flex shrink-0 items-center rounded-md p-1 transition hover:bg-[#f0f2f5]"
                        aria-label="Facebook"
                    >
                        <Image src="/images/meta/logo.svg" alt="" className="h-9 w-9 sm:h-10 sm:w-10" width={40} height={40} />
                    </Link>

                    <nav className="mx-auto hidden max-w-[min(100%,720px)] flex-1 items-center justify-center gap-0.5 md:flex md:gap-1" aria-label="Primary">
                        <a href="#fbcm-hero" className={navLinkClass}>
                            {t.main.landingNavWhatsNew}
                        </a>
                        <a href="#fbcm-resources" className={navLinkClass}>
                            {t.main.landingNavGetStarted}
                            <ChevronDown className="mt-0.5 shrink-0 opacity-55" />
                        </a>
                        <a href="#fbcm-resources" className={navLinkClass}>
                            {t.main.landingNavLearn}
                            <ChevronDown className="mt-0.5 shrink-0 opacity-55" />
                        </a>
                        <a href="#fbcm-resources" className={navLinkClass}>
                            {t.main.landingNavCreators}
                        </a>
                    </nav>

                    <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
                        <time
                            dateTime={dateIso}
                            className="mr-1 hidden shrink-0 whitespace-nowrap text-[11px] leading-none text-[#606770] lg:block"
                        >
                            <span className="text-[#6b7280]">{t.main.releaseDate}</span>{' '}
                            <span className="font-semibold tabular-nums text-[#111827]">{currentDate}</span>
                        </time>
                        <a
                            href="#fbcm-resources"
                            className="rounded-full p-2.5 text-[#0A1317] opacity-85 transition hover:bg-[#f0f2f5] hover:opacity-100"
                            aria-label={t.info.title}
                        >
                            <Image src="/images/icons/ic_search.svg" alt="" className="h-[22px] w-[22px]" width={22} height={22} />
                        </a>
                        <a
                            href="#fbcm-resources"
                            className="hidden rounded-full p-2.5 text-[#0A1317] opacity-85 transition hover:bg-[#f0f2f5] hover:opacity-100 sm:inline-flex"
                            aria-label={t.main.benefitsTitle}
                        >
                            <Image src="/images/icons/ic_locked.svg" alt="" className="h-[22px] w-[22px]" width={22} height={22} />
                        </a>
                        <a
                            href="#fbcm-resources"
                            className="ml-1 inline-flex items-center rounded-full border border-[#ccd0d5] bg-white px-4 py-2 text-[13px] font-semibold text-[#1c1e21] transition hover:border-[#bcc0c4] hover:bg-[#fafbfc] sm:px-5 sm:text-[14px]"
                        >
                            {t.main.landingLogIn}
                        </a>
                    </div>
                </div>
            </header>

            <div className={HEADER_OFFSET_PT}>
                <section
                    id="fbcm-hero"
                    className={`border-b border-[#e8eaed] bg-[linear-gradient(180deg,#ffffff_0%,#f6f7f9_100%)] ${SCROLL_MT}`}
                >
                    <div className="mx-auto grid max-w-[1240px] gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)] lg:items-center lg:gap-6 lg:px-8 lg:py-16">
                        <div className="order-2 min-w-0 lg:order-1">
                            <div className="inline-block">
                                <p className="text-[12px] font-semibold tracking-[0.14em] text-[#8a8d91]">{t.main.landingKicker}</p>
                                <div className="mt-1 h-0.5 w-8 rounded-full" style={{ backgroundColor: FB_BLUE }} />
                            </div>
                            <h1
                                className="mt-5 text-[1.85rem] font-bold leading-[1.12] tracking-tight sm:text-[2.25rem] lg:text-[2.65rem]"
                                style={{ color: FB_BLUE }}
                            >
                                {t.main.landingHeadline}
                            </h1>
                            <p className="mt-4 max-w-[32rem] text-[16px] leading-relaxed text-[#3d4d66] sm:text-[17px]">
                                {t.main.landingSubhead}
                            </p>
                            <div className="mt-8 flex flex-wrap items-center gap-3">
                                <button
                                    type="button"
                                    onClick={onSubmitApplication}
                                    className="min-h-[50px] rounded-full px-10 py-3 text-[15px] font-bold text-white shadow-[0_6px_18px_rgba(0,100,224,0.24)] transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:brightness-95 sm:min-h-[52px] sm:px-11 sm:text-[16px]"
                                    style={{ backgroundColor: FB_BLUE, outlineColor: FB_BLUE }}
                                >
                                    {t.main.cta}
                                </button>
                            </div>
                        </div>

                        <div className="relative order-1 mx-auto aspect-[1498/845] w-[calc(100%+1.25rem)] max-w-[680px] -mx-2.5 bg-transparent sm:w-full sm:mx-auto lg:order-2 lg:max-w-none lg:justify-self-end">
                            <Image
                                src={FBC_LANDING_MEDIA.heroCollage}
                                alt=""
                                fill
                                className="object-contain object-center drop-shadow-[0_10px_22px_rgba(15,20,30,0.10)]"
                                sizes="(max-width: 1024px) 92vw, 680px"
                                priority
                                unoptimized
                            />
                        </div>
                    </div>
                </section>

                <section className="bg-[#f6f7f9] pb-12 pt-8 sm:pb-16 sm:pt-10" aria-labelledby="fbcm-reel-title">
                    <div className="mx-auto max-w-[1080px] px-4 sm:px-6 lg:px-8">
                        <div className="mb-6 flex justify-center sm:mb-8">
                            <button
                                type="button"
                                onClick={scrollToApply}
                                className="inline-flex items-center gap-2.5 text-[16px] font-medium text-[#1c1e21] transition hover:opacity-80"
                            >
                                <span className="border-b border-current pb-px">{t.main.landingHowJoin}</span>
                                <span
                                    className="inline-flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border border-[#0064e0] text-[#0064e0]"
                                    aria-hidden="true"
                                >
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                        <div className="flex items-center justify-center gap-3 sm:gap-6 lg:gap-10">
                            <button
                                type="button"
                                onClick={() => showReel(reelIndex - 1)}
                                aria-label="Previous"
                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#0064e0] bg-white text-[#0064e0] transition hover:bg-[#0064e0]/[0.06]"
                            >
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                                    <path d="M11 4.5 6.5 9 11 13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>

                            <div className="flex min-w-0 flex-1 flex-col items-center gap-8 lg:flex-row lg:justify-center lg:gap-14">
                                <button
                                    type="button"
                                    onClick={toggleReel}
                                    aria-label={reelPlaying ? 'Pause video' : 'Play video'}
                                    className="relative w-[min(72vw,270px)] shrink-0 overflow-hidden rounded-[18px] bg-black shadow-[0_18px_40px_rgba(15,20,30,0.16)]"
                                >
                                    <video
                                        key={FBC_LANDING_MEDIA.creatorReels[reelIndex]}
                                        ref={reelRef}
                                        className="aspect-[9/16] w-full object-cover"
                                        playsInline
                                        preload="metadata"
                                        src={FBC_LANDING_MEDIA.creatorReels[reelIndex]}
                                        onPlay={() => setReelPlaying(true)}
                                        onPause={() => setReelPlaying(false)}
                                        onEnded={() => setReelPlaying(false)}
                                    />
                                    {!reelPlaying && (
                                        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/55 text-white">
                                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                                                    <path d="M8 6.5v9l8-4.5-8-4.5Z" fill="currentColor" />
                                                </svg>
                                            </span>
                                        </span>
                                    )}
                                </button>
                                <div className="max-w-[300px] text-center lg:text-left">
                                    <h2
                                        id="fbcm-reel-title"
                                        className="text-[1.7rem] font-bold leading-[1.18] tracking-tight text-[#1c1e21] sm:text-[2rem]"
                                    >
                                        {t.main.landingReelTitle}
                                    </h2>
                                    <p className="mt-4 text-[15px] leading-relaxed text-[#5c6b82] sm:text-[16px]">
                                        {t.main.landingReelBody}
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => showReel(reelIndex + 1)}
                                aria-label="Next"
                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#0064e0] bg-white text-[#0064e0] transition hover:bg-[#0064e0]/[0.06]"
                            >
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                                    <path d="M7 4.5 11.5 9 7 13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </section>

                {children}
            </div>
        </div>
    )
}
