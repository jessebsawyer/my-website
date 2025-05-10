'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const Welcome = () => {
  const [showIntro, setShowIntro] = useState(false)
  const [showArrow, setShowArrow] = useState(false)
  const [showImage, setShowImage] = useState(false)
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    const introTimer = setTimeout(() => setShowIntro(true), 100)
    const imageTimer = setTimeout(() => setShowImage(true), 1600)
    const textTimer = setTimeout(() => setShowText(true), 1600)
    const arrowTimer = setTimeout(() => setShowArrow(true), 2600)
    return () => {
      clearTimeout(introTimer)
      clearTimeout(imageTimer)
      clearTimeout(textTimer)
      clearTimeout(arrowTimer)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 space-y-6 bg-gradient-to-br from-gray-700 via-gray-900 to-black text-white relative pb-16">
      <AnimatePresence>
        {/* Profile Image */}
        <div key="image" className="h-60 flex items-center justify-center">
          {showImage && (
            <motion.img
              src="/profile.jpeg"
              alt="Photo of Jesse"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="w-45 h-45 md:w-56 md:h-56 rounded-full shadow-lg object-cover"
            />
          )}
        </div>

        {/* Heading */}
        <div key="intro" className="h-5 flex items-center justify-center">
          {showIntro && (
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold"
            >
              Hey there!
            </motion.h1>
          )}
        </div>

        {/* Subtext */}
        <div key="text" className="h-20 flex items-center justify-center">
          {showText && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-2xl md:text-3xl"
            >
              {"I'm Jesse, a Senior Full Stack Developer."}
            </motion.p>
          )}
        </div>

        {/* Bouncing Arrow */}
        <div key="arrow" className="h-16 relative w-full flex justify-center items-end">
          {showArrow && (
            <motion.a
              aria-label="Scroll down"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="animate-bounce cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-10 h-10 text-white hover:text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25L12 15.75 4.5 8.25"
                />
              </svg>
            </motion.a>
          )}
        </div>
      </AnimatePresence>
    </div>
  )
}

export default Welcome
