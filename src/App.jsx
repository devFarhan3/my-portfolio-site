import React, { useRef, useState, useEffect, lazy, Suspense } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'

const SplineLazy = lazy(() => import('@splinetool/react-spline'))

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
    return scrollY.onChange((latest) => {
      setHasScrolled(latest > 20)
    })
  }, [scrollY])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 h-[48px] bg-white/72 backdrop-blur-[20px] saturate-[180%] transition-colors duration-200 ${
        hasScrolled ? 'border-b border-black/[0.08]' : 'border-b border-transparent'
      }`}
    >
      <div className="max-w-[980px] mx-auto h-full px-6 flex items-center justify-between">
        <div className="text-[15px] font-semibold text-text-1">Your Name</div>
        
        <div className="hidden md:flex items-center gap-8">
          {['Work', 'About', 'Skills', 'Contact'].map((item) => (
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
    <section className="min-h-screen flex flex-col items-center justify-center text-center pt-[120px] pb-[60px] bg-white">
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

const SplineHero = () => {
  const [loaded, setLoaded] = useState(false)
  
  return (
    <section id="spline-hero" className="w-full h-[500px] md:h-[700px] bg-white relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto h-full px-6">
        <div className="w-full h-full rounded-spline overflow-hidden bg-surface relative">
          <Suspense fallback={<div className="absolute inset-0 bg-surface animate-pulse" />}>
            {!loaded && <div className="absolute inset-0 bg-surface animate-pulse z-10" />}
            <ErrorBoundary fallback={<div className="absolute inset-0 bg-surface flex items-center justify-center text-text-2 text-sm">3D Scene unavailable</div>}>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: loaded ? 1 : 0 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full"
              >
                <SplineLazy
                  scene="https://prod.spline.design/6Wq1Q7YAnWfEL7CO/scene.splinecode" 
                  style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
                  onLoad={() => setLoaded(true)}
                />
              </motion.div>
            </ErrorBoundary>
          </Suspense>
        </div>
      </div>
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

const Work = () => {
  const cardVariant = {
    hidden: { opacity: 0, y: 32 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: EASING } 
    }
  }

  return (
    <section id="work" className="py-section-v md:py-[140px] px-6 bg-white max-w-[980px] mx-auto">
      <SectionLabel text="Selected Work" />

      <motion.div 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="space-y-5"
      >
        {/* Featured Project */}
        <motion.div 
          variants={cardVariant}
          className="bg-surface rounded-card p-7 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 items-center hover:scale-[1.008] transition-transform duration-400 ease-out cursor-pointer"
        >
          <div className="w-full md:w-1/2">
            <p className="text-[11px] text-text-2 uppercase tracking-wider mb-4">Case Study · Web App</p>
            <h3 className="text-[28px] font-bold text-text-1 mb-3">Project Alpha</h3>
            <p className="text-[15px] text-text-2 max-w-[380px] leading-relaxed mb-6">
              A comprehensive digital transformation for a leading financial institution, focusing on accessibility and speed.
            </p>
            <span className="text-[14px] text-accent font-semibold hover:tracking-[0.02em] transition-all duration-200">
              View project →
            </span>
          </div>
          <div className="w-full md:flex-1 aspect-[16/9] bg-[#E0E0E5] rounded-img" />
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[1, 2].map((i) => (
            <motion.div 
              key={i}
              variants={cardVariant}
              className="bg-surface rounded-card p-8 hover:scale-[1.01] transition-transform duration-350 ease-out cursor-pointer"
            >
              <div className="aspect-[4/3] bg-[#E0E0E5] rounded-[12px] mb-6" />
              <p className="text-[11px] text-text-2 uppercase tracking-wider">Mobile App · UX Design</p>
              <h3 className="text-[22px] font-bold text-text-1 mt-2">Design System {i}</h3>
              <p className="text-[14px] text-text-2 mt-2 leading-relaxed">
                Scalable design components built for performance and consistency.
              </p>
              <div className="text-[13px] text-accent font-semibold mt-4">View project →</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
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
  const [aboutLoaded, setAboutLoaded] = useState(false)

  return (
    <section id="about" className="py-section-v md:py-[140px] bg-surface">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="max-w-[720px] mx-auto text-center">
          <SectionLabel text="About Me" />
          
          <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-20 mb-20">
            <Stat number="12+" label="Projects shipped" />
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

          <div className="hidden md:block mt-20 max-w-[560px] mx-auto w-full h-[400px] rounded-card overflow-hidden bg-[#EAEAEC] relative">
            <Suspense fallback={<div className="absolute inset-0 bg-[#EAEAEC] animate-pulse" />}>
              {!aboutLoaded && <div className="absolute inset-0 bg-[#EAEAEC] animate-pulse z-10" />}
            <ErrorBoundary fallback={<div className="absolute inset-0 bg-[#EAEAEC] flex items-center justify-center text-text-2 text-sm">3D Scene unavailable</div>}>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: aboutLoaded ? 1 : 0 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full"
              >
                <SplineLazy
                  scene="https://prod.spline.design/placeholder/scene.splinecode" // Replace with your Spline scene URL
                  style={{ width: '100%', height: '100%' }}
                  onLoad={() => setAboutLoaded(true)}
                />
              </motion.div>
            </ErrorBoundary>
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  )
}

const Skills = () => {
  const skills = [
    { name: 'Figma', category: 'Design & Prototyping' },
    { name: 'React', category: 'Frontend Development' },
    { name: 'Tailwind CSS', category: 'Frontend Development' },
    { name: 'Spline', category: '3D & Motion' },
    { name: 'Framer', category: 'Interaction Design' },
    { name: 'After Effects', category: 'Motion Graphics' },
    { name: 'Webflow', category: 'No-code Development' },
    { name: 'Figma Variants', category: 'Design Systems' },
  ]

  return (
    <section id="skills" className="py-section-v md:py-[140px] px-6 bg-white">
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
    </section>
  )
}

const Contact = () => {
  return (
    <section id="contact" className="py-section-v md:py-[140px] bg-surface text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASING }}
        className="max-w-[980px] mx-auto"
      >
        <h2 className="text-[52px] font-bold text-text-1 tracking-tight">Let's work together.</h2>
        <p className="text-[19px] text-text-2 mt-4">Open to freelance projects and full-time roles.</p>
        
        <a 
          href="mailto:hello@yourname.com" 
          className="inline-block mt-12 text-[24px] font-medium text-text-1 underline underline-offset-4 hover:text-accent transition-colors duration-250"
        >
          hello@yourname.com
        </a>

        <div className="mt-10 flex items-center justify-center gap-10">
          {['Dribbble', 'LinkedIn', 'Twitter'].map((social) => (
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
        <span className="text-[12px] text-text-2">© 2025 Your Name</span>
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
        <SplineHero />
        
        <SectionWrapper id="work">
          <Work />
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
