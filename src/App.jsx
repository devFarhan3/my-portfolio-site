import React, { useRef, useState, useEffect } from 'react'
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X
} from 'lucide-react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { Testimonials } from './components/ui/testimonials'
import logoSrc from './assets/logo.png'
import techWeckSrc from './assets/tech-weck.png'
import diamondSrc from './assets/diamond.png'
import rugbySrc from './assets/rugby-web.png'
import oneDirhamSrc from './assets/1dmockup.png'
import farhanPic from './assets/dev-farhan.jpg'
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
} from './components/ui/animated-slideshow'
import { GLSLHills } from './components/ui/glsl-hills'
import Navbar from './components/ui/navbar'


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
          I craft <span className="text-text-1 font-bold underline decoration-accent/30 underline-offset-4">stunning visuals</span> and <span className="text-text-1 font-bold">user-friendly experiences</span> that <span className="text-text-1 font-bold italic">help brands stand out</span> and connect with <span className="text-text-1 font-bold">their audience</span>.
        </motion.p>

        <motion.div variants={itemVariant} className="flex flex-wrap items-center justify-center gap-6">
          <motion.a
            href="#work"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="bg-text-1 text-white px-10 py-5 rounded-full text-[15px] font-bold hover:bg-black transition-all duration-300 flex items-center gap-2 shadow-2xl shadow-black/10"
          >
            Explore Projects
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white border-2 border-black/5 text-text-1 px-10 py-5 rounded-full text-[15px] font-bold hover:bg-black/5 transition-all duration-300 flex items-center gap-2"
          >
            Start a Conversation
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
    imageUrl: farhanPic,
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
  // {
  //   id: 'slide-4',
  //   title: 'video editing',
  //   imageUrl:
  //     'https://images.unsplash.com/photo-1574717025058-2f8737d2e2b7?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  // },
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
        <div className="max-w-[1200px] mx-auto">
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
                    className="w-full h-auto object-contain rounded-card"
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
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1426&auto=format&fit=crop',
  },
  {
    id: 'uiux-3',
    category: 'UI/UX Design',
    tag: 'Adobe XD · SaaS',
    title: 'SaaS Landing Page',
    description: 'Conversion-optimized landing page design for a project management tool.',
    link: 'https://behance.net',
    linkLabel: 'View on Behance',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop',
  },
  // --- Web Design ---
  {
    id: 'web-1',
    category: 'Web Design',
    tag: 'React · Tailwind CSS',
    title: 'Elite Rugby',
    description: 'High-performance landing page with dynamic animations and a bold dark-mode design system.',
    link: 'https://elite-rugby-website.vercel.app/',
    linkLabel: 'View Live',
    image: rugbySrc,
    featured: true,
  },
  {
    id: 'web-2',
    category: 'Web Design',
    tag: 'HTML · CSS · JavaScript · Bootstrap',
    title: 'Techweck | IT Solutions Company',
    description: 'A minimal, Bootstrap-inspired creative agency site with smooth scroll animations.',
    link: 'https://www.techweck.com/',
    linkLabel: 'View Live',
    image: techWeckSrc,
  },
  {
    id: 'web-3',
    category: 'Web Design',
    tag: 'HTML · CSS · Bootstrap',
    title: 'Diamond Living | Real Estate Website',
    description: 'An elegant and modern real estate website with a seamless user experience.',
    link: 'https://diamondliving.ae/',
    linkLabel: 'View Live',
    image: diamondSrc,
  },
  {
    id: 'web-4',
    category: 'Web Design',
    tag: 'HTML · CSS · Bootstrap',
    title: '1Dirham | Digital Marketing Agency landin page',
    description: 'Dubai-based Digital Marketing Management focused on driving measurable growth. We turn clicks into commercial success through strategy, execution, and performance-led results.',
    link: 'https://1dirham.ae/',
    linkLabel: 'View Live',
    image: oneDirhamSrc,
  },
  {
    id: 'web-5',
    category: 'Web Design',
    tag: 'HTML · CSS · Bootstrap',
    title: 'Shield Group | Waterproofing & Insulation',
    description: 'A leading repair and maintenance company in the UAE, dedicated to creating clean and healthy environments for residential and commercial properties.',
    link: 'https://shieldgroup.ae/',
    linkLabel: 'View Live',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1470&auto=format&fit=crop',
  },
  {
    id: 'web-6',
    category: 'Web Design',
    tag: 'HTML · CSS · Bootstrap',
    title: 'Tareeq Al Suraa | Technical Services',
    description: 'Expert solutions for AC installation, plumbing, electrical work, and general maintenance services across the UAE.',
    link: 'https://tareeqalsuraa.com/',
    linkLabel: 'View Live',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1469&auto=format&fit=crop',
  },
  {
    id: 'web-7',
    category: 'Web Design',
    tag: 'React · Tailwind CSS',
    title: 'Architectural Reliable | Plumbing & HVAC',
    description: 'Specialized technical services providing reliable plumbing, heating, and air conditioning solutions for modern architecture.',
    link: 'https://architecturalreliableservices.netlify.app/',
    linkLabel: 'View Live',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1470&auto=format&fit=crop',
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
              <div className="w-full md:flex-1 aspect-[16/9] bg-[#E0E0E5] rounded-img overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                  <div className="aspect-[4/3] bg-[#E0E0E5] rounded-[12px] mb-6 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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

          <div className="flex flex-col lg:flex-row items-center gap-16 mt-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASING }}
              className="w-full lg:w-1/2 rounded-card overflow-hidden bg-surface/50 border border-black/[0.03]"
            >
              <img
                src={farhanPic}
                alt="Farhan Workspace"
                className="w-full h-auto object-contain max-h-[600px] mx-auto"
              />
            </motion.div>

            <div className="w-full lg:w-1/2 text-left">
              <div className="flex flex-wrap gap-8 md:gap-12 mb-12">
                <Stat number="50+" label="Projects shipped" />
                <Stat number="4" label="Years experience" />
                <Stat number="8" label="Happy clients" />
              </div>

              <div className="space-y-6 text-[19px] text-text-2 leading-[1.75]">
                <p>
                  I'm Farhan, a UI/UX and Frontend Designer who believes the best interfaces are the ones you don't notice. Clean, purposeful, and built to last.
                </p>
                <p>
                  Currently available for freelance projects and full-time opportunities.
                </p>
              </div>
            </div>
          </div>


        </div>
      </div>
    </section>
  )
}

const Skills = () => {
  const skills = [
    { name: 'Figma', category: 'Design & Prototyping' },
    { name: 'Adobe XD', category: 'Design & Prototyping' },
    { name: 'Photoshop', category: 'Design & Branding' },
    { name: 'Illustrator', category: 'Design & Branding' },
    { name: 'React.js', category: 'Frontend Development' },
    { name: 'Tailwind CSS', category: 'Frontend Development' },
    { name: 'Framer', category: 'Interaction Design' },
    { name: 'Next.js', category: 'Frontend Development' },
    { name: 'JavaScript (ES6+)', category: 'Frontend Development' },
    { name: 'TypeScript', category: 'Frontend Development' },
    { name: 'Three.js', category: '3D & Graphics' },
    { name: 'Spline 3D', category: '3D & Graphics' },
    { name: 'Webflow', category: 'No-Code Development' },
  ]

  return (
    <section id="skills" className="py-16 md:py-[140px] px-6 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
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
        className="max-w-[1200px] mx-auto"
      >
        <h2 className="text-[32px] md:text-[52px] font-bold text-text-1 tracking-tight">Let's work together.</h2>
        <p className="text-[16px] md:text-[19px] text-text-2 mt-4">Open to freelance projects and full-time roles.</p>

        <a
          href="mailto:farhanaslam1992@gmail.com"
          className="inline-block mt-12 text-[24px] font-medium text-text-1 underline underline-offset-4 hover:text-accent transition-colors duration-250"
        >
          farhanaslam1992@gmail.com
        </a>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
          {[
            { name: "GitHub", href: "https://github.com/devFarhan3" },
            { name: "Instagram", href: "https://www.instagram.com/farhanwebstudio/" },
            { name: "LinkedIn", href: "https://www.linkedin.com/in/m-farhan-aslam/" },
            { name: "WhatsApp", href: "https://wa.me/923001234567" },
            { name: "Facebook", href: "https://www.facebook.com/farhan.aslam.5623" }
          ].map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] font-medium text-text-2 hover:text-accent transition-colors duration-200"
            >
              {social.name}
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
