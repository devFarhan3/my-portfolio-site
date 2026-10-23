import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { SITE, FAQ_ITEMS, PROJECTS_SEO } from './src/data/seo.js'

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function buildJsonLd() {
  const personId = `${SITE.url}/#person`
  const person = {
    '@type': 'Person',
    '@id': personId,
    name: SITE.name,
    alternateName: SITE.alternateNames,
    url: `${SITE.url}/`,
    image: `${SITE.url}/og-image.png`,
    jobTitle: SITE.jobTitle,
    description: SITE.description,
    email: `mailto:${SITE.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
    knowsAbout: SITE.knowsAbout,
    sameAs: SITE.sameAs,
  }

  const service = {
    '@type': 'ProfessionalService',
    '@id': `${SITE.url}/#service`,
    name: `${SITE.name} | UI/UX Design & Web Development`,
    url: `${SITE.url}/`,
    image: `${SITE.url}/og-image.png`,
    description: SITE.description,
    founder: { '@id': personId },
    provider: { '@id': personId },
    address: person.address,
    areaServed: SITE.areaServed.map((name) => ({ '@type': 'Country', name })),
    serviceType: SITE.services.map((s) => s.name),
    sameAs: SITE.sameAs,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Design & development services',
      itemListElement: SITE.services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, description: s.description },
      })),
    },
  }

  const website = {
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: `${SITE.url}/`,
    name: `${SITE.name} Portfolio`,
    inLanguage: 'en',
    publisher: { '@id': personId },
  }

  const page = {
    '@type': 'ProfilePage',
    '@id': `${SITE.url}/#webpage`,
    url: `${SITE.url}/`,
    name: `${SITE.name} | UI/UX Designer & Web Developer`,
    isPartOf: { '@id': `${SITE.url}/#website` },
    about: { '@id': personId },
    mainEntity: { '@id': personId },
    inLanguage: 'en',
    primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE.url}/og-image.png`, width: 1200, height: 630 },
  }

  const projects = {
    '@type': 'ItemList',
    '@id': `${SITE.url}/#projects`,
    name: 'Selected portfolio projects',
    itemListElement: PROJECTS_SEO.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        name: p.name,
        genre: p.category,
        url: p.url,
        creator: { '@id': personId },
      },
    })),
  }

  const faq = {
    '@type': 'FAQPage',
    '@id': `${SITE.url}/#faq`,
    mainEntity: FAQ_ITEMS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return { '@context': 'https://schema.org', '@graph': [person, service, website, page, projects, faq] }
}

// Content for crawlers / AI bots that don't run JavaScript (most AI crawlers).
function buildNoscript() {
  return `<noscript>
    <header><h1>${esc(SITE.name)} - ${esc(SITE.jobTitle)}</h1>
    <p>${esc(SITE.description)}</p></header>
    <main>
      <h2>Services</h2>
      <ul>${SITE.services.map((s) => `<li><strong>${esc(s.name)}</strong>: ${esc(s.description)}</li>`).join('')}</ul>
      <h2>Selected projects</h2>
      <ul>${PROJECTS_SEO.map((p) => `<li><a href="${esc(p.url)}">${esc(p.name)}</a> (${esc(p.category)})</li>`).join('')}</ul>
      <h2>Frequently asked questions</h2>
      ${FAQ_ITEMS.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}
      <h2>Contact</h2>
      <p>Email: <a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></p>
      <ul>${SITE.sameAs.map((u) => `<li><a href="${esc(u)}">${esc(u)}</a></li>`).join('')}</ul>
    </main>
  </noscript>`
}

function seoPlugin() {
  return {
    name: 'seo-inject',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const jsonLd = `<script type="application/ld+json">${JSON.stringify(buildJsonLd())}</script>`
        return html
          .replaceAll('%SITE_URL%', SITE.url)
          .replace('<!--SEO_JSONLD-->', jsonLd)
          .replace('<!--SEO_NOSCRIPT-->', buildNoscript())
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoPlugin()],
})
