'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Welcome = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const introTimer = setTimeout(() => setShowIntro(true), 100);
    const imageTimer = setTimeout(() => setShowImage(true), 1600);
    const textTimer = setTimeout(() => setShowText(true), 1600);
    const arrowTimer = setTimeout(() => setShowArrow(true), 2600);
    return () => {
      clearTimeout(introTimer);
      clearTimeout(imageTimer);
      clearTimeout(textTimer);
      clearTimeout(arrowTimer);
    };
  }, []);
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 space-y-6 bg-gradient-to-br from-gray-700 via-gray-900 to-black text-white relative">
        <AnimatePresence>
          {showImage && (
            <motion.img
              src="/profile.jpeg"
              alt="Photo of Jesse"
              key={1}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="w-50 h-50 md:w-70 md:h-70 rounded-full shadow-lg object-cover"
            />
          )}
          {showIntro && (
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              key={2}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold"
            >
              Hey there!
            </motion.h1>
          )}
          {showText && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              key={3}
              transition={{ duration: 1 }}
              className="text-2xl md:text-3xl"
            >
              {"I'm Jesse, a Senior Full Stack Developer."}
            </motion.p>
          )}
          {showArrow && (
            <motion.a
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute bottom-6 animate-bounce cursor-pointer"
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
        </AnimatePresence>
      </div>
    </>
  );
};

export default Welcome;
