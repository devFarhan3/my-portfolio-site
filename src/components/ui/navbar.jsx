import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'

const EASING = [0.16, 1, 0.3, 1]

// Magnetic Hover Component for premium feel
const Magnetic = ({ children, strength = 0.25 }) => {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const x = (clientX - (left + width / 2)) * strength
    const y = (clientY - (top + height / 2)) * strength
    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  )
}

const Navbar = ({ logoSrc }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const navLinks = [
    { name: 'Work', id: 'work' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Contact', id: 'contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50)

      // Active section detection
      const sectionIds = navLinks.map(link => link.id)
      const currentSection = sectionIds.find((id) => {
        const element = document.getElementById(id)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 150 && rect.bottom >= 150
        }
        return false
      })
      setActiveSection(currentSection || '')
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[100] flex justify-center transition-all duration-700 pointer-events-none ${hasScrolled ? 'pt-2 sm:pt-3' : 'pt-0'}`}>
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: EASING }}
          className={`
            pointer-events-auto relative flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${hasScrolled 
              ? 'h-[56px] w-[92%] max-w-[620px] rounded-full bg-white/80 backdrop-blur-xl border border-black/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.06)] px-5' 
              : 'h-[72px] w-full max-w-[1200px] rounded-none bg-transparent border-transparent shadow-none px-8'
            }
          `}
        >
          {/* Progress Bar - Thinner and flush with pill top */}
          <motion.div 
            className="absolute top-0 left-[20px] right-[20px] h-[1.5px] bg-accent/20 origin-left z-0 overflow-hidden"
            style={{ 
              scaleX, 
              opacity: hasScrolled ? 1 : 0,
              top: hasScrolled ? '0px' : '0px'
            }}
          >
             <div className="w-full h-full bg-accent" />
          </motion.div>

          {/* Logo */}
          <div className="flex items-center z-10">
            <Magnetic strength={0.1}>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault()
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                  setIsOpen(false)
                }}
                className="flex items-center"
              >
                <img 
                  src={logoSrc} 
                  alt="Farhan Aslam" 
                  className={`transition-all duration-700 ${hasScrolled ? 'h-[20px]' : 'h-[30px]'} w-auto`} 
                />
              </a>
            </Magnetic>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1 z-10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id
              return (
                <Magnetic key={link.id} strength={0.15}>
                  <a
                    href={`#${link.id}`}
                    className={`
                      relative px-3 py-2 text-[12px] font-semibold tracking-tight transition-colors duration-500
                      ${isActive ? 'text-text-1' : 'text-text-2 hover:text-text-1'}
                    `}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </Magnetic>
              )
            })}
          </div>

          {/* CTA & Mobile Trigger */}
          <div className="flex items-center gap-3 z-10">
            <Magnetic strength={0.1}>
              <a
                href="#contact"
                className={`
                  hidden sm:flex items-center gap-2 rounded-full font-bold transition-all duration-700 whitespace-nowrap
                  ${hasScrolled 
                    ? 'bg-text-1 text-white hover:bg-accent hover:text-text-1 px-4 py-1.5 text-[11px]' 
                    : 'bg-white/10 backdrop-blur-md border border-black/10 text-text-1 hover:bg-text-1 hover:text-white px-5 py-2.5 text-[12px]'
                  }
                `}
              >
                Hire Me <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </Magnetic>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-text-1 hover:bg-black/5 rounded-full transition-colors relative"
              aria-label="Toggle Menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-white md:hidden"
          >
            <div className="flex flex-col h-full pt-32 px-8">
              <div className="flex flex-col gap-2 sm:gap-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.1, ease: EASING }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={() => setIsOpen(false)}
                      className={`
                        text-[clamp(32px,10vw,48px)] font-bold tracking-tighter transition-colors leading-[1.1]
                        ${activeSection === link.id ? 'text-accent' : 'text-text-1'}
                      `}
                    >
                      {link.name}
                    </a>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-auto mb-12 pt-8 border-t border-black/[0.05]"
              >
                <p className="text-text-2 text-xs mb-3 font-semibold uppercase tracking-widest">Get in touch</p>
                <a 
                  href="mailto:farhanaslam1992@gmail.com" 
                  className="text-[clamp(16px,5vw,22px)] font-bold text-text-1 underline underline-offset-8 decoration-accent/30 hover:decoration-accent transition-all break-words block"
                >
                  farhanaslam1992@gmail.com
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
