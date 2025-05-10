'use client'
import { useState, useEffect, ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { scrollToSection } from '../../utils/scroll'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isDarkBg, setIsDarkBg] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const isAnyVisible = entries.some((entry) => entry.isIntersecting)
        setIsDarkBg(isAnyVisible)
      },
      {
        root: null,
        threshold: 0.5,
      }
    )

    const sections = [document.querySelector('#about'), document.querySelector('#contact')]

    sections.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
  }, [])

  return (
    <div className="relative scroll-smooth">
      {/* Hamburger Icon */}
      {!menuOpen && (
        <button
          onClick={() => setMenuOpen(true)}
          className={`fixed top-4 right-4 z-50 p-3 rounded-md transition-transform transform duration-300 scale-110 cursor-pointer ${isDarkBg ? 'text-black hover:bg-black/10' : 'text-white hover:bg-white/10'}`}
        >
          <Menu size={40} />
        </button>
      )}

      {/* Fullscreen Modal Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center space-y-8 backdrop-blur-md bg-black/90"
            onClick={() => setMenuOpen(false)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            {/* X Close Icon */}
            <button
              aria-label="Close menu"
              onClick={(e) => {
                e.stopPropagation()
                setMenuOpen(false)
              }}
              className="absolute top-4 right-4 z-50 p-2 text-white hover:text-gray-300 cursor-pointer $1"
            >
              <X size={36} />
            </button>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setMenuOpen(false)
                setTimeout(() => {
                  document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
                }, 300)
              }}
              className="text-4xl md:text-5xl font-bold hover:underline text-white"
            >
              About me
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setMenuOpen(false)
                setTimeout(() => {
                  scrollToSection()
                }, 300)
              }}
              className="text-4xl md:text-5xl font-bold hover:underline text-white"
            >
              AI assistant
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setMenuOpen(false)
                setTimeout(() => {
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }, 300)
              }}
              className="text-4xl md:text-5xl font-bold hover:underline text-white"
            >
              Lets connect
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <main className="relative z-10">{children}</main>
    </div>
  )
}
