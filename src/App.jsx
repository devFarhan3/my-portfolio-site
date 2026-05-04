import React, { useRef, useState, useEffect, lazy, Suspense } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { Testimonials } from './components/ui/testimonials'
import { GlassHero } from './components/ui/glass-hero'
import { GlassAbout } from './components/ui/glass-about'
import logoSrc from './assets/logo.png'
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
} from './components/ui/animated-slideshow'

// --- Error Boundary ---
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Spline Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// --- Design System Constants ---
const EASING = [0.25, 0.1, 0.25, 1]

const RotatingText = () => {
  const words = ['Experiences.', 'Interfaces.', 'Solutions.', 'Products.']
  const [index, setIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let timer
    const currentWord = words[index]

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(currentWord.substring(0, displayText.length - 1))
      }, 50)
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentWord.substring(0, displayText.length + 1))
      }, 100)
    }

    if (!isDeleting && displayText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setIndex((prev) => (prev + 1) % words.length)
    }

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, index])

  return (
    <span className="text-accent relative">
      {displayText}
    </span>
  )
}

// --- Components ---

const Navbar = () => {
  const { scrollY } = useScroll()
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setHasScrolled(latest > 20)
    })
    return () => unsubscribe()
  }, [scrollY])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 h-[48px] bg-white/72 backdrop-blur-[20px] saturate-[180%] transition-colors duration-200 ${hasScrolled ? 'border-b border-black/[0.08]' : 'border-b border-transparent'
        }`}
    >
      <div className="max-w-[980px] mx-auto h-full px-6 flex items-center justify-between">
        <a href="#" className="flex-shrink-0">
          <img src={logoSrc} alt="Farhan Aslam" className="h-[32px] w-auto" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {['Work', 'Testimonials', 'About', 'Skills', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[12px] text-text-2 hover:text-text-1 transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </div>

        <button className="bg-accent text-text-1 text-[12px] font-semibold px-4 py-1.5 rounded-full hover:bg-[#C49A42] hover:scale-[0.97] transition-all duration-200">
          Available for work ↗
        </button>
      </div>
    </motion.nav>
  )
}

const Hero = () => {
  const [heroLoaded, setHeroLoaded] = useState(false)
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroY = useTransform(scrollY, [0, 400], [0, -60])

  const heroVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } }
  }

  const itemVariant = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASING }
    }
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center pt-24 md:pt-[120px] pb-10 md:pb-[60px] bg-white">
      <motion.div
        variants={heroVariants}
        initial="hidden"
        animate="show"
        style={{ opacity: heroOpacity, y: heroY }}
        className="w-full"
      >
        <motion.div variants={itemVariant} className="flex items-center justify-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
          <span className="text-[12px] uppercase tracking-widest text-text-2 font-medium">
            UI/UX Designer & Frontend Developer
          </span>
        </motion.div>

        <motion.h1 variants={itemVariant} className="text-[clamp(48px,7vw,82px)] font-bold leading-[1.0] hero-h1">
          <span className="text-text-1 block">Designing</span>
          <span className="block h-[1.1em]">
            <RotatingText />
          </span>
        </motion.h1>

        <motion.p variants={itemVariant} className="text-[21px] text-text-2 max-w-[500px] mx-auto mt-6 leading-[1.5]">
          Crafting minimal, functional interfaces that feel as good as they look.
        </motion.p>

        <motion.div variants={itemVariant} className="mt-10 flex items-center justify-center gap-4">
          <button className="bg-text-1 text-white px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-black hover:scale-[1.02] transition-all duration-200">
            View my work
          </button>
          <button className="border border-text-1 text-text-1 px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-text-1 hover:text-white hover:scale-[1.02] transition-all duration-200">
            Get in touch →
          </button>
        </motion.div>

      </motion.div>
    </section>
  )
}

const SectionLabel = ({ text }) => (
  <motion.p
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="text-[11px] uppercase tracking-[0.1em] text-text-2 mb-12 flex items-center gap-2"
  >
    <span className="text-accent">●</span> {text}
  </motion.p>
)

const SLIDES = [
  {
    id: 'slide-1',
    title: 'frontend dev',
    imageUrl:
      'https://images.unsplash.com/photo-1654618977232-a6c6dea9d1e8?q=80&w=2486&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'slide-2',
    title: 'backend dev',
    imageUrl:
      'https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'slide-3',
    title: 'UI UX design',
    imageUrl:
      'https://images.unsplash.com/photo-1688733720228-4f7a18681c4f?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'slide-4',
    title: 'video editing',
    imageUrl:
      'https://images.unsplash.com/photo-1574717025058-2f8737d2e2b7?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'slide-5',
    title: 'SEO optimization',
    imageUrl:
      'https://images.unsplash.com/photo-1726066012698-bb7a3abce786?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
]

const ServicesSlider = () => {
  return (
    <section id="services" className="bg-white">
      <HoverSlider className="min-h-[50vh] md:min-h-[70vh] place-content-center py-16 md:py-[140px] px-6 md:px-12 bg-white">
        <div className="max-w-[980px] mx-auto">
          <SectionLabel text="My Services" />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 md:gap-16">
            <div className="flex flex-col space-y-3 md:space-y-5">
              {SLIDES.map((slide, index) => (
                <TextStaggerHover
                  key={slide.id}
                  index={index}
                  className="cursor-pointer text-[clamp(20px,4vw,38px)] font-bold uppercase tracking-[-0.03em] text-text-1"
                  text={slide.title}
                />
              ))}
            </div>
            <HoverSliderImageWrap className="w-full md:w-[480px] aspect-[4/3] rounded-card overflow-hidden flex-shrink-0">
              {SLIDES.map((slide, index) => (
                <div key={slide.id}>
                  <HoverSliderImage
                    index={index}
                    imageUrl={slide.imageUrl}
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="size-full object-cover rounded-card"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              ))}
            </HoverSliderImageWrap>
          </div>
        </div>
      </HoverSlider>
    </section>
  )
}


const PROJECTS = [
  // --- UI/UX Design ---
  {
    id: 'uiux-1',
    category: 'UI/UX Design',
    tag: 'Figma · Mobile App',
    title: 'Banking App Redesign',
    description: 'Complete UI/UX overhaul for a modern banking experience — focused on accessibility, trust, and speed.',
    link: 'https://figma.com',
    linkLabel: 'View on Figma',
    featured: true,
  },
  {
    id: 'uiux-2',
    category: 'UI/UX Design',
    tag: 'Figma · Dashboard',
    title: 'E-Commerce Dashboard',
    description: 'Admin panel with real-time analytics, inventory management, and clean data visualization.',
    link: 'https://dribbble.com',
    linkLabel: 'View on Dribbble',
  },
  {
    id: 'uiux-3',
    category: 'UI/UX Design',
    tag: 'Adobe XD · SaaS',
    title: 'SaaS Landing Page',
    description: 'Conversion-optimized landing page design for a project management tool.',
    link: 'https://behance.net',
    linkLabel: 'View on Behance',
  },
  // --- Web Design ---
  {
    id: 'web-1',
    category: 'Web Design',
    tag: 'React · Tailwind CSS',
    title: 'Elite Rugby',
    description: 'High-performance landing page with dynamic animations and a bold dark-mode design system.',
    link: 'https://elite-rugby-website.vercel.app/',
    linkLabel: 'View Live ↗',
    featured: true,
  },
  {
    id: 'web-2',
    category: 'Web Design',
    tag: 'Next.js · Framer Motion',
    title: 'Agency Portfolio',
    description: 'A minimal, Apple-inspired creative agency site with smooth scroll animations.',
    link: 'https://example.com',
    linkLabel: 'View Live ↗',
  },
  {
    id: 'web-3',
    category: 'Web Design',
    tag: 'React · Vite',
    title: 'Restaurant Website',
    description: 'Elegant restaurant website with online reservations and a responsive menu gallery.',
    link: 'https://example.com',
    linkLabel: 'View Live ↗',
  },
]

const TABS = ['All', 'UI/UX Design', 'Web Design']

const Work = () => {
  const [activeTab, setActiveTab] = useState('All')

  const cardVariant = {
    hidden: { opacity: 0, y: 32 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASING }
    }
  }

  const filtered = activeTab === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeTab)

  const featured = filtered.find((p) => p.featured)
  const rest = filtered.filter((p) => !p.featured)

  return (
    <section id="work" className="py-16 md:py-[140px] px-6 bg-white max-w-[980px] mx-auto">
      <SectionLabel text="Selected Work" />

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-10 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-[13px] font-medium px-4 py-2 rounded-full border transition-all duration-200 ${activeTab === tab
              ? 'bg-text-1 text-white border-text-1'
              : 'bg-transparent text-text-2 border-black/[0.08] hover:border-black/20 hover:text-text-1'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: EASING }}
          className="space-y-5"
        >
          {/* Featured Project */}
          {featured && (
            <motion.div
              variants={cardVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="bg-surface rounded-card p-7 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 items-center hover:scale-[1.008] transition-transform duration-400 ease-out group"
            >
              <div className="w-full md:w-1/2">
                <p className="text-[11px] text-text-2 uppercase tracking-wider mb-4">{featured.tag}</p>
                <h3 className="text-[24px] md:text-[28px] font-bold text-text-1 mb-3">{featured.title}</h3>
                <p className="text-[15px] text-text-2 max-w-[380px] leading-relaxed mb-6">
                  {featured.description}
                </p>
                <a
                  href={featured.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[14px] text-accent font-semibold hover:tracking-[0.02em] transition-all duration-200"
                >
                  {featured.linkLabel}
                </a>
              </div>
              <div className="w-full md:flex-1 aspect-[16/9] bg-[#E0E0E5] rounded-img overflow-hidden" />
            </motion.div>
          )}

          {/* Project Grid */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {rest.map((project) => (
                <motion.div
                  key={project.id}
                  variants={cardVariant}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="bg-surface rounded-card p-7 md:p-8 hover:scale-[1.01] transition-transform duration-350 ease-out group"
                >
                  <div className="aspect-[4/3] bg-[#E0E0E5] rounded-[12px] mb-6 overflow-hidden" />
                  <p className="text-[11px] text-text-2 uppercase tracking-wider">{project.tag}</p>
                  <h3 className="text-[20px] md:text-[22px] font-bold text-text-1 mt-2">{project.title}</h3>
                  <p className="text-[14px] text-text-2 mt-2 leading-relaxed">
                    {project.description}
                  </p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[13px] text-accent font-semibold mt-4 hover:tracking-[0.02em] transition-all duration-200"
                  >
                    {project.linkLabel}
                  </a>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}


const Stat = ({ number, label }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isInView) {
      let start = 0
      const end = parseInt(number)
      if (isNaN(end)) return

      const duration = 1200
      const increment = end / (duration / 16)

      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)
      return () => clearInterval(timer)
    }
  }, [isInView, number])

  return (
    <div ref={ref} className="text-center md:text-left">
      <div className="text-[68px] font-bold text-text-1 tracking-[-0.04em]">
        {count}{number.includes('+') ? '+' : ''}
      </div>
      <div className="text-[13px] text-text-2 mt-2 uppercase tracking-widest">{label}</div>
    </div>
  )
}

const About = () => {
  return (
    <section id="about" className="py-16 md:py-[140px] bg-surface">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="max-w-[720px] mx-auto text-center">
          <SectionLabel text="About Me" />

          <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-20 mb-20">
            <Stat number="50+" label="Projects shipped" />
            <Stat number="4" label="Years experience" />
            <Stat number="8" label="Happy clients" />
          </div>

          <div className="w-16 h-px bg-accent mx-auto my-16" />

          <div className="space-y-6 text-left max-w-[600px] mx-auto text-[19px] text-text-2 leading-[1.75]">
            <p>
              I'm a UI/UX and Frontend Designer who believes the best interfaces are the ones you don't notice. Clean, purposeful, and built to last.
            </p>
            <p>
              Currently available for freelance projects and full-time opportunities.
            </p>
          </div>


        </div>
      </div>
    </section>
  )
}

const Skills = () => {
  const skills = [
    { name: 'Figma', category: 'Design & Prototyping' },
    { name: 'React.js', category: 'Frontend Development' },
    { name: 'Tailwind CSS', category: 'Frontend Development' },
    { name: 'Framer', category: 'Interaction Design' },
    { name: 'Next.js', category: 'Frontend Development' },
  ]

  return (
    <section id="skills" className="py-16 md:py-[140px] px-6 bg-white">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="max-w-[640px] mx-auto">
          <SectionLabel text="Skills & Tools" />
          <div className="mt-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: EASING }}
                className="border-b border-black/[0.06] py-5 flex justify-between items-center"
              >
                <span className="text-[17px] text-text-1 font-medium">{skill.name}</span>
                <span className="text-[13px] text-text-2">{skill.category}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const Contact = () => {
  return (
    <section id="contact" className="py-16 md:py-[140px] bg-surface text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASING }}
        className="max-w-[980px] mx-auto"
      >
        <h2 className="text-[32px] md:text-[52px] font-bold text-text-1 tracking-tight">Let's work together.</h2>
        <p className="text-[16px] md:text-[19px] text-text-2 mt-4">Open to freelance projects and full-time roles.</p>

        <a
          href="mailto:farhanaslam1992@gmail.com"
          className="inline-block mt-12 text-[24px] font-medium text-text-1 underline underline-offset-4 hover:text-accent transition-colors duration-250"
        >
          farhanaslam1992@gmail.com
        </a>

        <div className="mt-10 flex items-center justify-center gap-5">
          {['GitHub', 'Instagram', 'LinkedIn', 'Facebook'].map((social) => (
            <a
              key={social}
              href="#"
              className="text-[14px] text-text-2 hover:text-text-1 transition-colors duration-200"
            >
              {social}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

const Footer = () => {
  return (
    <footer className="py-8 border-t border-black/[0.06] bg-white">
      <div className="max-w-[980px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-[12px] text-text-2">© 2026 Farhan Aslam</span>
        <span className="text-[12px] text-text-2">Designed & built with intention</span>
      </div>
    </footer>
  )
}

const SectionWrapper = ({ children, id, className = "" }) => (
  <motion.div
    id={id}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.65, ease: EASING }}
    className={className}
  >
    {children}
  </motion.div>
)

export default function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="font-inter selection:bg-accent/30"
    >
      <Navbar />

      <main>
        <Hero />
        <ServicesSlider />

        <SectionWrapper id="work">
          <Work />
        </SectionWrapper>

        <SectionWrapper id="testimonials">
          <Testimonials />
        </SectionWrapper>

        <SectionWrapper id="about">
          <About />
        </SectionWrapper>

        <SectionWrapper id="skills">
          <Skills />
        </SectionWrapper>

        <SectionWrapper id="contact">
          <Contact />
        </SectionWrapper>
      </main>

      <Footer />
    </motion.div>
  )
}
