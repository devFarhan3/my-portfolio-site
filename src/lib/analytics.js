// Custom conversion tracking using Google Analytics 4 (gtag.js).
// Base tag is loaded in index.html with ID G-6XCSRKXF80.
// GA4 "Enhanced measurement" tracks page views, scrolls, and file downloads.
// The helpers below add tracking for leads, WhatsApp, email and project clicks.

export function track(eventName, params = {}) {
  if (typeof window.gtag !== 'function') return
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
  if (window.__gaInitialised) return
  window.__gaInitialised = true

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
