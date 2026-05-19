import React, { useRef, useState, useEffect } from 'react'
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Code,
  Server,
  PenTool,
  Search
} from 'lucide-react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { Testimonials } from './components/ui/testimonials'
import logoSrc from './assets/logo.png'
import techWeckSrc from './assets/tech-weck.png'
import diamondSrc from './assets/diamond.png'
import rugbySrc from './assets/rugby-web.png'
import oneDirhamSrc from './assets/1dmockup.png'
import farhanPic from './assets/UX Designer _ React Frontend Developer.png'
import mystPerfumesSrc from './assets/myst-perfumes.png'
import marcVistaSrc from './assets/marcvista.png'
import digitalMarketingSrc from './assets/digital-marketing.jpg'
import shieldGroupSrc from './assets/shield-group.png'
import architecturalReliableSrc from './assets/architectural-reliable.png'
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
  useHoverSliderContext
} from './components/ui/animated-slideshow'
import { GLSLHills } from './components/ui/glsl-hills'
import Navbar from './components/ui/navbar'
import { supabase } from './lib/supabase'



// --- Design System Constants ---
const EASING = [0.25, 0.1, 0.25, 1]

const WordSlider = () => {
  const words = ['Experiences.', 'Interfaces.', 'Solutions.', 'Products.']
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-[1.1em] overflow-hidden inline-flex items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="text-accent block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

// --- Components ---

// --- End of Components ---

const Hero = () => {
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroY = useTransform(scrollY, [0, 400], [0, -60])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    const x = (clientX / window.innerWidth) - 0.5
    const y = (clientY / window.innerHeight) - 0.5
    setMousePos({ x, y })
  }

  const heroVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } }
  }

  const itemVariant = {
    hidden: { opacity: 0, y: 32 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-white pt-24"
    >
      <GLSLHills speed={0.25} mouseX={mousePos.x} mouseY={mousePos.y} />

      {/* Noise Overlay for Texture */}
      <div className="absolute inset-0 z-[5] pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <motion.div
        variants={heroVariants}
        initial="hidden"
        animate="show"
        style={{ opacity: heroOpacity, y: heroY }}
        className="w-full relative z-10 px-6"
      >
        <motion.div variants={itemVariant} className="flex items-center justify-center gap-2 mb-8">
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-accent"
          ></motion.span>
          <span className="text-[11px] uppercase tracking-[0.3em] text-text-2 font-semibold">
            Digital Experiences Architect
          </span>
        </motion.div>

        <motion.h1 variants={itemVariant} className="text-[clamp(44px,9vw,100px)] font-bold leading-[0.9] tracking-[-0.05em] mb-10">
          <span className="text-text-1 block mb-3">Designing</span>
          <WordSlider />
        </motion.h1>

        <motion.p variants={itemVariant} className="text-[18px] md:text-[21px] text-text-2 max-w-[620px] mx-auto leading-relaxed mb-14 opacity-90 font-medium">
          UI/UX Designer & Full-Stack Developer helping <span className="text-text-1 font-bold">startups, agencies, and e-commerce brands</span> build <span className="text-text-1 font-bold underline decoration-accent/30 underline-offset-4">pixel-perfect digital products</span> <span className="text-text-1 font-bold italic">fast delivery</span>, clean code, <span className="text-text-1 font-bold">zero revisions drama</span>
        </motion.p>

        <motion.div variants={itemVariant} className="flex flex-wrap items-center justify-center gap-6">
          <motion.a
            href="#work"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="bg-text-1 text-white px-10 py-5 rounded-full text-[15px] font-bold hover:bg-black transition-all duration-300 flex items-center gap-2 shadow-2xl shadow-black/10"
          >

            View My Work
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white border-2 border-black/5 text-text-1 px-10 py-5 rounded-full text-[15px] font-bold hover:bg-black/5 transition-all duration-300 flex items-center gap-2"
          >
            Let's Talk First
          </motion.a>
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
    description: 'Performant, responsive interfaces that come alive with smooth animations.',
    imageUrl: rugbySrc,
    icon: Code
  },
  {
    id: 'slide-2',
    title: 'backend dev',
    description: 'Scalable and secure server-side logic and database architecture.',
    imageUrl: techWeckSrc,
    icon: Server
  },
  {
    id: 'slide-3',
    title: 'UI UX design',
    description: 'Wireframes to pixel-perfect handoffs that pass dev QA first time.',
    imageUrl: diamondSrc,
    icon: PenTool
  },
  {
    id: 'slide-5',
    title: 'SEO optimization',
    description: 'Data-driven strategies to boost visibility and organic search rankings.',
    imageUrl: oneDirhamSrc,
    icon: Search
  },
]

const ServiceItem = ({ slide, index }) => {
  const { activeSlide, changeSlide } = useHoverSliderContext()
  const isActive = activeSlide === index
  const Icon = slide.icon

  return (
    <div
      className="group cursor-pointer py-4 border-b border-black/[0.05] last:border-0"
      onMouseEnter={() => changeSlide(index)}
    >
      <div className="flex items-center gap-4">
        <span className={`transition-colors duration-300 ${isActive ? 'text-accent' : 'text-text-2'}`}>
          <Icon size={24} />
        </span>
        <TextStaggerHover
          index={index}
          className={`text-[clamp(20px,4vw,38px)] font-bold uppercase tracking-[-0.03em] ${isActive ? 'text-text-1 underline decoration-accent/30 underline-offset-8' : 'text-text-2'}`}
          text={slide.title}
        />
      </div>
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-[15px] text-text-2 mt-4 ml-[40px] leading-relaxed max-w-[400px]">
              {slide.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const ServicesSlider = () => {
  return (
    <section id="services" className="bg-white">
      <HoverSlider className="min-h-[50vh] md:min-h-[70vh] place-content-center py-16 md:py-[140px] px-6 md:px-12 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <SectionLabel text="My Services" />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 md:gap-16">
            <div className="flex flex-col space-y-2 md:space-y-4 w-full md:w-1/2">
              {SLIDES.map((slide, index) => (
                <ServiceItem key={slide.id} slide={slide} index={index} />
              ))}
            </div>
            <HoverSliderImageWrap className="w-full md:w-[480px] aspect-[4/3] rounded-card overflow-hidden flex-shrink-0 shadow-2xl shadow-black/10">
              {SLIDES.map((slide, index) => (
                <div key={slide.id}>
                  <HoverSliderImage
                    index={index}
                    imageUrl={slide.imageUrl}
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="w-full h-auto object-cover rounded-card"
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
    tag: 'Figma · Marketing Page',
    title: 'Digital Marketing Agency Landing Page',
    description: (
      <>
        <span className="font-bold text-text-1">Problem:</span> Marketing agencies struggle to show off complex campaign metrics and capture high-intent enterprise leads.<br />
        <span className="font-bold text-text-1">Solution:</span> Redesigned the page using high-impact typography, structured case results, and context-aware conversion forms.<br />
        <span className="font-bold text-text-1">Result:</span> Increased inbound inquiries by 24% and boosted user session duration by 35%.
      </>
    ),
    link: 'https://www.figma.com/proto/4dHiIHo8ojlAHdDBMmzv2C/Digital-marketing-Agency-Landing-Page--Community-?node-id=1-312&t=dmDKm5G4skVGWpOi-1&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1',
    linkLabel: 'View Full Case Study',
    image: digitalMarketingSrc,
    featured: true,
  },
  {
    id: 'uiux-2',
    category: 'UI/UX Design',
    tag: 'Figma · Editorial & Eng',
    title: 'MarcVista Website Landing Page',
    description: (
      <>
        <span className="font-bold text-text-1">Problem:</span> Standard SaaS layouts failed to project the brand's standard of architectural rigor.<br />
        <span className="font-bold text-text-1">Solution:</span> Crafted an editorial design layout that operates at the intersection of rigorous engineering and high-end visual layout.<br />
        <span className="font-bold text-text-1">Result:</span> Formulated competitive advantages for enterprise brands demanding absolute precision.
      </>
    ),
    link: 'https://www.figma.com/proto/ZQKCt3KLCFGDsflu2fN1go/marcvista--revamp?node-id=26-64&t=PUNeZMXBWXC8umkR-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1',
    linkLabel: 'View Full Case Study',
    image: marcVistaSrc,
  },
  {
    id: 'uiux-3',
    category: 'UI/UX Design',
    tag: 'Figma · E-Commerce',
    title: 'Scentora Perfumes Landing Page Redesign',
    description: (
      <>
        <span className="font-bold text-text-1">Problem:</span> Luxury fragrance buyers struggled to purchase online without smelling the product first.<br />
        <span className="font-bold text-text-1">Solution:</span> Redesigned with visual sensory storytelling, interactive scent notes, and a digital discovery guide.<br />
        <span className="font-bold text-text-1">Result:</span> 28% increase in direct-to-consumer sales and lowered discovery-related returns.
      </>
    ),
    link: 'https://stitch.withgoogle.com/projects/13687823106060746206',
    linkLabel: 'View Full Case Study',
    image: mystPerfumesSrc,
  },
  {
    id: 'uiux-4',
    category: 'UI/UX Design',
    tag: 'Figma · Service Platform',
    title: 'Architectural Reliable | Plumbing & HVAC',
    description: (
      <>
        <span className="font-bold text-text-1">Problem:</span> Traditional home service websites fail to project modern professionalism and struggle with booking conversion.<br />
        <span className="font-bold text-text-1">Solution:</span> Designed a premium service platform with upfront pricing structures, real-time emergency dispatch alerts, and conversion-focused booking forms.<br />
        <span className="font-bold text-text-1">Result:</span> Boosted prospective digital quote inquiries by 32% and established elite local branding authority.
      </>
    ),
    link: 'https://stitch.withgoogle.com/preview/7854888921496668012?node-id=c97344ee66804590bc651c4efda1ed76',
    linkLabel: 'View Full Case Study',
    image: architecturalReliableSrc,
  },
  // --- Web Design ---
  {
    id: 'web-1',
    category: 'Web Design',
    tag: 'HTML · CSS · Bootstrap',
    title: 'Diamond Living | Real Estate Website',
    description: (
      <>
        <span className="font-bold text-text-1">Problem:</span> Property listings were hard to navigate on mobile.<br />
        <span className="font-bold text-text-1">Solution:</span> Developed an elegant, fully responsive real estate platform.<br />
        <span className="font-bold text-text-1">Result:</span> Mobile inquiries increased by over 30%.
      </>
    ),
    link: 'https://diamondliving.ae/',
    linkLabel: 'See Live Project',
    image: diamondSrc,
    featured: true,
  },
  {
    id: 'web-2',
    category: 'Web Design',
    tag: 'HTML · CSS · JavaScript · Bootstrap',
    title: 'Techweck | IT Solutions Company',
    description: (
      <>
        <span className="font-bold text-text-1">Problem:</span> Cluttered layout causing high bounce rates.<br />
        <span className="font-bold text-text-1">Solution:</span> Minimal, Bootstrap-inspired agency site with smooth scrolling.<br />
        <span className="font-bold text-text-1">Result:</span> Improved time-on-page by 45% and generated more leads.
      </>
    ),
    link: 'https://www.techweck.com/',
    linkLabel: 'See Live Project',
    image: techWeckSrc,
  },
  {
    id: 'web-3',
    category: 'Web Design',
    tag: 'React · Tailwind CSS',
    title: 'Elite Rugby',
    description: (
      <>
        <span className="font-bold text-text-1">Problem:</span> Outdated web presence failing to attract sponsors.<br />
        <span className="font-bold text-text-1">Solution:</span> High-performance, dark-mode site with dynamic animations.<br />
        <span className="font-bold text-text-1">Result:</span> Increased engagement and secured two major sponsors.
      </>
    ),
    link: 'https://elite-rugby-website.vercel.app/',
    linkLabel: 'See Live Project',
    image: rugbySrc,
  },
  {
    id: 'web-4',
    category: 'Web Design',
    tag: 'HTML · CSS · Bootstrap',
    title: '1Dirham | Digital Marketing Agency',
    description: (
      <>
        <span className="font-bold text-text-1">Problem:</span> Generic agency site lacked a unique selling proposition.<br />
        <span className="font-bold text-text-1">Solution:</span> Designed a landing page emphasizing measurable growth.<br />
        <span className="font-bold text-text-1">Result:</span> Lifted client conversion rate by 15%.
      </>
    ),
    link: 'https://1dirham.ae/',
    linkLabel: 'See Live Project',
    image: oneDirhamSrc,
  },
  {
    id: 'web-5',
    category: 'Web Design',
    tag: 'HTML · CSS · Bootstrap',
    title: 'Shield Group | Waterproofing & Insulation',
    description: (
      <>
        <span className="font-bold text-text-1">Problem:</span> Hard for customers to request quotes online.<br />
        <span className="font-bold text-text-1">Solution:</span> Revamped site with clear service pillars and lead forms.<br />
        <span className="font-bold text-text-1">Result:</span> Online quote requests doubled within two months.
      </>
    ),
    link: 'https://shieldgroup.ae/',
    linkLabel: 'See Live Project',
    image: shieldGroupSrc,
  },
  {
    id: 'web-6',
    category: 'Web Design',
    tag: 'HTML · CSS · Bootstrap',
    title: 'Tareeq Al Suraa | Technical Services',
    description: (
      <>
        <span className="font-bold text-text-1">Problem:</span> Fragmented service pages confused visitors.<br />
        <span className="font-bold text-text-1">Solution:</span> Consolidated services into a unified digital platform.<br />
        <span className="font-bold text-text-1">Result:</span> Improved user journey and organic search visibility.
      </>
    ),
    link: 'https://tareeqalsuraa.com/',
    linkLabel: 'See Live Project',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1469&auto=format&fit=crop',
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
    <section id="work" className="py-16 md:py-[140px] px-6 bg-white max-w-[1200px] mx-auto">
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
                  className="inline-flex items-center gap-1.5 text-[14px] text-accent font-semibold hover:tracking-[0.02em] transition-all duration-200 group/link"
                >
                  {featured.linkLabel}
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              </div>
              <div className="w-full md:flex-1 aspect-[16/9] bg-[#E0E0E5] rounded-img overflow-hidden relative">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover object-top transition-all duration-[6000ms] ease-in-out group-hover:object-bottom"
                />
              </div>
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
                  <div className="aspect-[16/9] bg-[#E0E0E5] rounded-[12px] mb-6 overflow-hidden relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-all duration-[6000ms] ease-in-out group-hover:object-bottom"
                    />
                  </div>
                  <p className="text-[11px] text-text-2 uppercase tracking-wider">{project.tag}</p>
                  <h3 className="text-[20px] md:text-[22px] font-bold text-text-1 mt-2">{project.title}</h3>
                  <p className="text-[14px] text-text-2 mt-2 leading-relaxed">
                    {project.description}
                  </p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[13px] text-accent font-semibold mt-4 hover:tracking-[0.02em] transition-all duration-200 group/link"
                  >
                    {project.linkLabel}
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
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
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="w-full text-center">
          <SectionLabel text="About Me" />

          <div className="flex flex-col lg:flex-row items-stretch gap-16 mt-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASING }}
              className="w-full lg:w-1/2 rounded-[32px] overflow-hidden bg-[#E0E0E5] border border-black/[0.03] relative min-h-[400px] md:min-h-[500px] lg:min-h-0"
            >
              <img
                src={farhanPic}
                alt="Farhan Professional Headshot"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </motion.div>

            <div className="w-full lg:w-1/2 text-left flex flex-col justify-center py-4">
              <h2 className="text-[40px] md:text-[56px] font-bold text-text-1 tracking-tight leading-tight mb-8">
                Designer who <br /> ships <span className="text-accent italic font-serif">code</span>
              </h2>
              <div className="space-y-6 text-[17px] md:text-[19px] text-text-2 leading-[1.75]">
                <p>
                  I'm a <strong className="text-text-1 font-semibold">UI/UX Designer and Full-Stack Developer</strong> based in Pakistan with 4 years of experience building digital products for clients across the Middle East, Europe, and South Asia.
                </p>
                <p>
                  I believe the best interfaces are <strong className="text-text-1 font-semibold">invisible</strong> — they guide users to their goal without friction. I design in Figma, build in React, and obsess over every pixel in between.
                </p>

                <div className="flex flex-wrap gap-8 md:gap-12 py-6">
                  <Stat number="50+" label="Projects shipped" />
                  <Stat number="4" label="Years experience" />
                  <Stat number="100%" label="Client Retention" />
                </div>

                <p>
                  Currently available for <strong className="text-text-1 font-semibold">freelance projects and full-time remote opportunities.</strong>
                </p>
              </div>
            </div>
          </div>


        </div>
      </div>
    </section>
  )
}

const Process = () => {
  const steps = [
    {
      number: "01",
      title: "Discovery Call",
      desc: "30-minute call to understand your goals, audience, and timeline. I ask the questions your previous dev forgot to ask."
    },
    {
      number: "02",
      title: "Proposal & Scope",
      desc: "Clear deliverables, timeline, and fixed pricing. No surprise invoices. You approve before any pixel is drawn."
    },
    {
      number: "03",
      title: "Design & Build",
      desc: "Daily updates via Loom or Slack. You see progress in real time — no black-box development cycles."
    },
    {
      number: "04",
      title: "Launch & Support",
      desc: "Deployment, handoff, and 2 weeks of free support. I don't disappear after I send the invoice."
    }
  ];

  return (
    <section id="process" className="py-16 md:py-[140px] bg-white px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-16">
          <SectionLabel text="How It Works" />
          <h2 className="text-[40px] md:text-[56px] font-bold text-text-1 tracking-tight leading-tight mt-6">
            From brief to launch in <span className="text-accent italic font-serif">days</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 border-y border-black/[0.04]">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: EASING }}
              className="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-black/[0.04] last:border-b-0 lg:last:border-r-0"
            >
              <div className="text-[48px] md:text-[64px] font-bold text-accent/30 mb-6 font-serif leading-none">
                {step.number}
              </div>
              <h3 className="text-[20px] md:text-[22px] font-bold text-text-1 mb-4">
                {step.title}
              </h3>
              <p className="text-[16px] text-text-2 leading-[1.7]">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Skills = () => {
  const skillCategories = [
    {
      title: 'Design & Prototyping',
      icon: PenTool,
      skills: [
        { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
        { name: 'Google Stitch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg' },
        { name: 'Framer', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg' },
        { name: 'Adobe XD', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xd/xd-plain.svg' },
      ]
    },
    {
      title: 'Frontend Engineering',
      icon: Code,
      skills: [
        { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
        { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
        { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
        { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
      ]
    },
    {
      title: 'Backend Engineering',
      icon: Server,
      skills: [
        { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
        { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg' },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
      ]
    },
    {
      title: 'Creative & AI',
      icon: Search,
      skills: [
        { name: 'AI Websites', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg' },
        { name: 'Webflow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/webflow/webflow-original.svg' },
        { name: 'Three.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg' },
      ]
    }
  ]

  return (
    <section id="skills" className="py-16 md:py-[140px] px-6 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionLabel text="Skills & Tools" />
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: EASING }}
                className="flex flex-col"
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-black/[0.06]">
                  <span className="text-accent">
                    <Icon size={20} strokeWidth={2.5} />
                  </span>
                  <h3 className="text-[19px] font-bold text-text-1">{category.title}</h3>
                </div>
                <div className="flex flex-col gap-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="flex items-center gap-4 group cursor-default">
                      <div className="w-[42px] h-[42px] rounded-[12px] bg-surface flex items-center justify-center border border-black/[0.04] group-hover:scale-110 transition-transform duration-300">
                        <img src={skill.icon} alt={skill.name} className="w-[20px] h-[20px] object-contain" />
                      </div>
                      <span className="text-[16px] text-text-2 font-medium group-hover:text-text-1 transition-colors duration-300">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', project: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('idle') // 'idle' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Simple validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.project.trim()) {
      setSubmitStatus('error')
      setErrorMessage('Please fill in all fields.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email.trim())) {
      setSubmitStatus('error')
      setErrorMessage('Please provide a valid email address.')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const { error } = await supabase.from('contact_submissions').insert([
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          project_details: formData.project.trim()
        }
      ])

      if (error) throw error

      setSubmitStatus('success')
      setFormData({ name: '', email: '', project: '' })
    } catch (err) {
      console.error('Supabase error:', err)
      setSubmitStatus('error')
      setErrorMessage(err.message || 'Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-16 md:py-[140px] bg-white px-6 border-t border-black/[0.04]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASING }}
          className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start"
        >
          {/* Left Column - Info */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-[40px] md:text-[56px] font-bold text-text-1 tracking-tight leading-tight mb-6">
              Ready to build <span className="text-accent italic font-serif">something great?</span>
            </h2>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface rounded-full text-[14px] font-medium text-text-1 mb-8 border border-black/[0.04]">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Currently available for projects
            </div>
            <p className="text-[17px] md:text-[19px] text-text-2 mb-12 max-w-[420px]">
              Tell me about your project and I'll get back to you within 24 hours with a proposal and timeline.
            </p>

            <div className="space-y-6 mb-12">
              <a href="mailto:hello@farhanaslam.com" className="flex items-center gap-4 text-[17px] font-medium text-text-1 hover:text-accent transition-colors group">
                <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center border border-black/[0.04] group-hover:scale-105 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                </div>
                hello@farhanaslam.com
              </a>
              <div className="flex items-center gap-4 text-[15px] text-text-2">
                <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center border border-black/[0.04] text-[20px]">
                  ⚡
                </div>
                <span>Responded to <strong>20+</strong> client inquiries within 24 hours.</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              {[
                { name: "GitHub", href: "https://github.com/devFarhan3" },
                { name: "LinkedIn", href: "https://www.linkedin.com/in/m-farhan-aslam/" },
                { name: "Instagram", href: "https://www.instagram.com/farhanwebstudio/" },
                { name: "WhatsApp", href: "https://wa.me/923001234567" }
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] font-medium text-text-2 hover:text-accent transition-colors duration-250"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="w-full lg:w-1/2">
            <form className="bg-surface p-8 md:p-10 rounded-[24px] border border-black/[0.04] flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-[13px] font-semibold text-text-1 uppercase tracking-wider">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  placeholder="John Doe"
                  className="w-full bg-white border border-black/[0.08] rounded-[12px] px-4 py-3.5 text-[16px] focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[13px] font-semibold text-text-1 uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  placeholder="john@example.com"
                  className="w-full bg-white border border-black/[0.08] rounded-[12px] px-4 py-3.5 text-[16px] focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="project" className="text-[13px] font-semibold text-text-1 uppercase tracking-wider">Project Details</label>
                <textarea
                  id="project"
                  rows="4"
                  value={formData.project}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  placeholder="Tell me about your project..."
                  className="w-full bg-white border border-black/[0.08] rounded-[12px] px-4 py-3.5 text-[16px] focus:outline-none focus:border-accent transition-colors resize-none disabled:opacity-50"
                  required
                ></textarea>
              </div>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-500/10 border border-green-500/20 text-green-600 rounded-[12px] p-4 text-[14px] text-center font-semibold"
                >
                  🎉 Message sent successfully! I'll get back to you within 24 hours.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-600 rounded-[12px] p-4 text-[14px] text-center font-semibold"
                >
                  ❌ {errorMessage}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full bg-text-1 text-white font-semibold py-4 rounded-[12px] hover:bg-accent transition-colors duration-300 text-[16px] disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const Footer = () => {
  return (
    <footer className="py-8 border-t border-black/[0.06] bg-white">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-[12px] text-text-2">© 2026 Farhan Aslam</span>
        <span className="text-[12px] text-text-2">All rights reserved</span>
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
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    if (!cursor || !ring) return;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let animationFrameId = null;

    const handleMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animateCursor = () => {
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';

      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;

      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';

      animationFrameId = requestAnimationFrame(animateCursor);
    };

    animateCursor();

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [role="button"], input, select, textarea, .group\\/link, .card-hover-trigger')) {
        document.body.classList.add('cursor-hover');
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, [role="button"], input, select, textarea, .group\\/link, .card-hover-trigger')) {
        document.body.classList.remove('cursor-hover');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      document.body.classList.remove('cursor-hover');
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="font-inter selection:bg-accent/30"
    >
      <Navbar logoSrc={logoSrc} />

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

        <SectionWrapper id="process">
          <Process />
        </SectionWrapper>

        <SectionWrapper id="skills">
          <Skills />
        </SectionWrapper>

        <SectionWrapper id="contact">
          <Contact />
        </SectionWrapper>
      </main>

      <Footer />

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-[9995] flex items-center group select-none">
        {/* Glassmorphic Tooltip */}
        <span className="mr-3 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 bg-white/90 dark:bg-black/90 backdrop-blur-md text-text-1 border border-black/[0.04] dark:border-white/[0.08] text-[12px] font-bold px-3 py-1.5 rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.05)] whitespace-nowrap pointer-events-none">
          Let's chat on WhatsApp! 👋
        </span>
        {/* WhatsApp Brand Button with Pulse Effect */}
        <a
          href="https://wa.me/923152391035?text=Hello%20Farhan!%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project%20with%20you."
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float-btn w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_4px_18px_rgba(37,211,102,0.3)] hover:scale-110 active:scale-95 transition-all duration-300 group/btn"
          aria-label="Chat on WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-6.5 h-6.5 fill-current group-hover/btn:rotate-12 transition-transform duration-350"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
        </a>
      </div>
    </motion.div>
  )
}
