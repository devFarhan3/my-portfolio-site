// Google Analytics 4 (gtag.js). Loads only in production and only when
// VITE_GA_MEASUREMENT_ID is set (e.g. G-XXXXXXXXXX), so dev traffic never pollutes reports.
//
// GA4 "Enhanced measurement" already tracks: page views, scrolls, outbound clicks,
// file downloads (your CV PDF) and site search. The events below add the conversions
// that matter for a freelancer: leads, WhatsApp, email and project clicks.

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

export const analyticsEnabled = Boolean(GA_ID) && import.meta.env.PROD

export function track(eventName, params = {}) {
  if (!analyticsEnabled || typeof window.gtag !== 'function') return
  window.gtag('event', eventName, params)
}

function classifyLink(a) {
  const href = a.getAttribute('href') || ''
  if (href.startsWith('mailto:')) return ['email_click', { link_url: href }]
  if (href.includes('wa.me') || href.includes('whatsapp.com')) return ['whatsapp_click', { link_url: href }]
  if (href.toLowerCase().endsWith('.pdf')) return ['cv_download', { link_url: href }]
  if (href.startsWith('#')) {
    const target = href.slice(1)
    if (target === 'contact') return ['cta_click', { cta_target: 'contact' }]
    if (target === 'work') return ['cta_click', { cta_target: 'work' }]
    return null
  }
  if (/linkedin\.com|github\.com|instagram\.com/.test(href)) return ['social_click', { link_url: href }]
  if (/^https?:/.test(href) && !href.includes(location.hostname)) {
    return ['project_click', { link_url: href, link_text: (a.textContent || '').trim().slice(0, 80) }]
  }
  return null
}

export function initAnalytics() {
  if (!analyticsEnabled || window.__gaInitialised) return
  window.__gaInitialised = true

  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(s)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID)

  // One delegated listener covers every link on the page, including ones React renders later.
  document.addEventListener(
    'click',
    (e) => {
      const a = e.target.closest && e.target.closest('a[href]')
      if (!a) return
      const hit = classifyLink(a)
      if (hit) track(hit[0], hit[1])
    },
    { passive: true }
  )
}
