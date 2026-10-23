// Single source of truth for SEO / AEO / GEO data.
// Used by: vite.config.js (JSON-LD + <noscript> fallback) and src/components/ui/faq.jsx.
// Changing your domain? Update SITE.url here, then find/replace the old URL in
// public/robots.txt, public/sitemap.xml and public/llms.txt.

export const SITE = {
  url: 'https://farhanaslam.vercel.app',
  name: 'Farhan Aslam',
  alternateNames: ['Dev Farhan', 'M. Farhan Aslam', 'farhanwebstudio'],
  jobTitle: 'UI/UX Designer & Full-Stack Web Developer',
  email: 'farhanaslam1992@gmail.com',
  city: 'Karachi',
  region: 'Sindh',
  country: 'PK',
  description:
    'Farhan Aslam is a freelance UI/UX designer and full-stack web developer based in Karachi, Pakistan, building conversion-focused websites for coaches, consultants, SaaS founders, startups and e-commerce brands.',
  sameAs: [
    'https://github.com/devFarhan3',
    'https://www.linkedin.com/in/m-farhan-aslam/',
    'https://www.instagram.com/farhanwebstudio/',
  ],
  knowsAbout: [
    'UI/UX design',
    'Web design',
    'Figma',
    'React',
    'Next.js',
    'Tailwind CSS',
    'Bootstrap',
    'PHP',
    'Laravel',
    'Node.js',
    'Conversion rate optimization',
    'Landing page design',
    'Design systems',
    'Technical SEO',
  ],
  areaServed: ['United Arab Emirates', 'Australia', 'United Kingdom', 'United States', 'Pakistan'],
  services: [
    { name: 'UI/UX Design', description: 'Wireframes, prototypes and pixel-perfect Figma handoffs for websites, landing pages and SaaS products.' },
    { name: 'Frontend Development', description: 'Fast, responsive interfaces built with React, Next.js, Tailwind CSS and Bootstrap.' },
    { name: 'Backend Development', description: 'Scalable server-side logic and database architecture with PHP, Laravel and Node.js.' },
    { name: 'SEO Optimization', description: 'Technical SEO, structured data and performance tuning to improve organic visibility.' },
  ],
}

export const FAQ_ITEMS = [
  {
    q: 'Who is Farhan Aslam?',
    a: 'Farhan Aslam (also known as Dev Farhan) is a freelance UI/UX designer and full-stack web developer based in Karachi, Pakistan. He has 4+ years of experience designing in Figma and building with React, Next.js and PHP/Laravel, creating conversion-focused websites for coaches, consultants, SaaS founders, startups, agencies and e-commerce brands.',
  },
  {
    q: 'What services does Farhan offer?',
    a: 'Four core services: UI/UX design (wireframes to pixel-perfect Figma handoffs), frontend development (React, Next.js, Tailwind CSS, Bootstrap), backend development (PHP, Laravel, Node.js) and SEO optimization. Most projects combine design and development so one person owns the result from first sketch to launch.',
  },
  {
    q: 'Which countries and industries does Farhan work with?',
    a: 'Farhan works remotely with clients in the UAE, Australia, the UK and the USA. Past projects include real estate, digital marketing agencies, IT solutions, e-commerce, waterproofing and technical services, sports and SaaS.',
  },
  {
    q: 'How does the process work from brief to launch?',
    a: 'Four steps: (1) a 30-minute discovery call to understand goals, audience and timeline; (2) a proposal with clear deliverables, timeline and fixed pricing that you approve before design starts; (3) design and build with regular progress updates over Loom or Slack; (4) launch, handoff and 2 weeks of free support.',
  },
  {
    q: 'Is Farhan available for freelance work or full-time remote roles?',
    a: 'Yes. Farhan is currently available for freelance projects and full-time remote opportunities in UI/UX design and frontend or full-stack development.',
  },
  {
    q: 'How quickly does Farhan respond to project inquiries?',
    a: 'Farhan replies to project inquiries within 24 hours. The fastest ways to reach him are the contact form on this site, email, or WhatsApp.',
  },
  {
    q: 'Which tools and technologies does Farhan use?',
    a: 'Design: Figma, Adobe XD, Google Stitch and Framer. Frontend: React.js, Next.js, Tailwind CSS, TypeScript and Bootstrap. Backend: PHP, Laravel and Node.js. Also Webflow and Three.js for interactive experiences.',
  },
  {
    q: 'Are the websites Farhan builds SEO-ready?',
    a: 'Yes. SEO optimization is one of his services. Sites ship with semantic HTML, optimized meta tags, structured data, sitemap and robots files, analytics setup and performance tuning, so they are easy for Google and AI search engines to understand.',
  },
  {
    q: 'How can I hire Farhan or request a quote?',
    a: 'Send project details through the contact form on this page, email farhanaslam1992@gmail.com, or message him on WhatsApp. He will respond within 24 hours and propose a scope, timeline and fixed price.',
  },
]

// Projects exposed to search engines as structured data. Keep in sync with PROJECTS in App.jsx.
export const PROJECTS_SEO = [
  { name: 'Digital Marketing Agency Landing Page', category: 'UI/UX Design', url: 'https://www.figma.com/proto/4dHiIHo8ojlAHdDBMmzv2C/Digital-marketing-Agency-Landing-Page--Community-?node-id=1-312' },
  { name: 'MarcVista Website Landing Page', category: 'UI/UX Design', url: 'https://www.figma.com/proto/ZQKCt3KLCFGDsflu2fN1go/marcvista--revamp?node-id=26-64' },
  { name: 'Scentora Perfumes Landing Page Redesign', category: 'UI/UX Design', url: 'https://stitch.withgoogle.com/projects/13687823106060746206' },
  { name: 'Architectural Reliable | Plumbing & HVAC', category: 'UI/UX Design', url: 'https://stitch.withgoogle.com/preview/7854888921496668012?node-id=c97344ee66804590bc651c4efda1ed76' },
  { name: 'Diamond Living | Real Estate Website', category: 'Web Design', url: 'https://diamondliving.ae/' },
  { name: 'Techweck | IT Solutions Company', category: 'Web Design', url: 'https://www.techweck.com/' },
  { name: 'Elite Rugby', category: 'Web Design', url: 'https://elite-rugby-website.vercel.app/' },
  { name: '1Dirham | Digital Marketing Agency', category: 'Web Design', url: 'https://1dirham.ae/' },
  { name: 'Shield Group | Waterproofing & Insulation', category: 'Web Design', url: 'https://shieldgroup.ae/' },
  { name: 'Tareeq Al Suraa | Technical Services', category: 'Web Design', url: 'https://tareeqalsuraa.com/' },
]
