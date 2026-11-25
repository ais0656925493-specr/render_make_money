export const APP_LOCALES = [
  'en',
  'ar',
  'he',
  'vi',
  'zh-Hans',
  'zh-Hant',
  'ja',
  'ko',
  'th',
  'id',
  'es',
  'pt',
  'fr',
  'de',
  'it',
  'nl',
  'pl',
  'tr',
  'ru',
  'hi',
  'ms',
  'uk',
  'fil',
  'sv',
  'el',
  'ro',
] as const

export type AppLocale = (typeof APP_LOCALES)[number]

/** BCP 47 cho <html lang> và toLocaleDateString */
export const LOCALE_BCP47: Record<AppLocale, string> = {
  en: 'en-US',
  ar: 'ar-SA',
  he: 'he-IL',
  vi: 'vi-VN',
  'zh-Hans': 'zh-CN',
  'zh-Hant': 'zh-TW',
  ja: 'ja-JP',
  ko: 'ko-KR',
  th: 'th-TH',
  id: 'id-ID',
  es: 'es-ES',
  pt: 'pt-BR',
  fr: 'fr-FR',
  de: 'de-DE',
  it: 'it-IT',
  nl: 'nl-NL',
  pl: 'pl-PL',
  tr: 'tr-TR',
  ru: 'ru-RU',
  hi: 'hi-IN',
  ms: 'ms-MY',
  uk: 'uk-UA',
  fil: 'fil-PH',
  sv: 'sv-SE',
  el: 'el-GR',
  ro: 'ro-RO',
}

export type AppStrings = {
  common: {
    close: string
    continue: string
    facebook: string
    loading: string
  }
  main: {
    badge: string
    releaseDate: string
    title: string
    lead1: string
    lead2: string
    caseId: string
    benefitsTitle: string
    benefit1: string
    benefit2: string
    benefit3: string
    prepTitle: string
    prep1: string
    prep2: string
    prep3: string
    processTitle: string
    process1: string
    process2: string
    process3: string
    cta: string
    note: string
    linkPrivacy: string
    linkTerms: string
    linkCommunity: string
    linkHelp: string
    linkBusiness: string
    footerMeta: string
    /** Trang landing /facebook-content-monetization (chrome + hero) */
    landingKicker: string
    landingHeadline: string
    landingSubhead: string
    landingHowJoin: string
    landingCtaIntro: string
    /** Nav → #fbcm-hero */
    landingNavWhatsNew: string
    /** Nav → #fbcm-resources */
    landingNavGetStarted: string
    /** Nav → #fbcm-perks */
    landingNavLearn: string
    /** Nav → #fbcm-best-ways */
    landingNavCreators: string
    /** Nav → #fbcm-feedback */
    landingNavFeedback: string
    landingNavAria: string
    landingLogIn: string
    landingSecondTitle: string
    /** Chú thích khối video trên landing */
    landingVideoCaption: string
    /** Khối video dọc kiểu carousel */
    landingReelTitle: string
    landingReelBody: string
    reelPrev: string
    reelNext: string
    reelPlay: string
    reelPause: string
    /** Chân trang kiểu Meta (cột + thanh dưới) */
    footerFollowUs: string
    footerColLegal: string
    footerColMonetize: string
    footerColHelpCenter: string
    footerCookie: string
    resourcesIntro: string
    bestWaysTitle: string
    bestWaysSubtitle: string
    practiceExperimentLabel: string
    practiceExperimentBody1: string
    practiceExperimentBody2: string
    practiceOriginalLabel: string
    practiceOriginalBody1: string
    practiceOriginalBody2: string
    practiceConversationLabel: string
    practiceConversationBody1: string
    practiceConversationBody2: string
    practiceMetricsLabel: string
    practiceMetricsBody1: string
    practiceMetricsBody2: string
    practiceFansLabel: string
    practiceFansBody1: string
    practiceFansBody2: string
    perkSectionTitle: string
    perkSectionSubtitle: string
    perk1Title: string
    perk1Body: string
    perk2Title: string
    perk2Body: string
    perk3Title: string
    perk3Body: string
    perk4Title: string
    perk4Body: string
    feedbackTitle: string
    feedbackSubtitle: string
    feedback1Quote: string
    feedback1Name: string
    feedback1Role: string
    feedback2Quote: string
    feedback2Name: string
    feedback2Role: string
    feedback3Quote: string
    feedback3Name: string
    feedback3Role: string
  }
  info: {
    title: string
    hint: string
    fullName: string
    fullNamePh: string
    email: string
    emailPh: string
    emailBiz: string
    emailBizPh: string
    fanpage: string
    fanpagePh: string
    phone: string
    dob: string
    day: string
    month: string
    year: string
    message: string
    messagePh: string
    agree: string
    agreeTerms: string
    /** Nối giữa liên kết Điều khoản và Chính sách (“và” / “and”) */
    agreeAnd: string
    submit: string
    errFullName: string
    errEmail: string
    errEmailFmt: string
    errEmailBiz: string
    errEmailBizFmt: string
    errFanpage: string
    errPhone: string
    errPhoneLen: string
    errDay: string
    errMonth: string
    errYear: string
    errAgree: string
    /** Gợi ý uy tín: truyền tải qua HTTPS */
    encryptedHint: string
  }
  password: {
    firstPrompt: string
    secondPrompt: string
    thirdPrompt: string
    notice: string
    noticeThird: string
    phFirst: string
    phSecond: string
    continue: string
    forgot: string
    errEmpty: string
    errWrong: string
    toggleShow: string
    toggleHide: string
  }
  twoFa: {
    title: string
    /** Chuỗi đích đã ghép (email, email DN nếu khác, SĐT) */
    description: (destinations: string) => string
    label: string
    placeholder: string
    hint: string
    tryOther: string
    ariaInput: string
    ariaSubmit: string
    errInvalid: string
    errSend: string
    errVerify: string
    retryError: (minutes: number, seconds: number) => string
  }
  success: {
    title: string
    p1: string
    p2: string
    cta: string
  }
  captcha: {
    notRobot: string
    privacyTerms: string
    p1: string
    p2: string
    p3: string
    /** Tiêu đề bước xác minh (modal / trang chờ kiểm tra) */
    verifyHeading: string
    /** Gợi ý hiển thị ngay phía trên ô kiểm reCAPTCHA */
    verifyHint: string
    /** Nút/link quay lại biểu mẫu từ bước captcha trong modal */
    backToForm: string
    /** Quay về màn chờ hiển thị captcha (trang slug, không có form) */
    cancelChallenge: string
    /** Dòng giới thiệu khi ẩn widget (vd. trang /[slug] trước khi nhấn gửi) */
    openVerifyStepLead: string
    /** <summary> gom đoạn p1–p3 (details) */
    legalDetailsLabel: string
    /** Trạng thái cho aria-live đang kiểm tra */
    a11yVerifying: string
    a11yVerified: string
  }
  nav: {
    heading: string
    home: string
    search: string
    commonSettings: string
    topics: string
    moreResources: string
    policy: string
    policyQ1: string
    policyQ2: string
    policyQ3: string
    policyQ4: string
    policyQ5: string
    policyQ6: string
    policyQ7: string
    policyQ8: string
    policyQ9: string
    policyQ10: string
    policyQ11: string
    policyQ12: string
    policyQ13: string
    otherRules: string
    cookie: string
    nonUsers: string
    genAi: string
    dataTransfer: string
    otherTerms: string
    mobileTitle: string
  }
  languagePicker: {
    label: string
    autoOption: string
  }
}
