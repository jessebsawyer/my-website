import { motion } from 'framer-motion'
import { scrollToSection } from '../../utils/scroll'
import content from '../../../content/about.json'

const About = () => {
  const { aboutMeTitle, aboutMeDesription, assistantCtaText } = content
  return (
    <>
      <section
        id="about"
        className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-6 py-20"
      >
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          <motion.img
            src="/about.jpeg"
            alt="Jesse profile"
            className="w-full h-50 sm:h-auto rounded-xl shadow-lg object-cover"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          />
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">{aboutMeTitle}</h2>
            <p className="text-lg mb-6">{aboutMeDesription}</p>
            <button
              onClick={(e) => {
                e.preventDefault()
                scrollToSection()
              }}
              className="inline-block px-6 py-3 bg-black text-white rounded-md shadow hover:bg-gray-800 transition cursor-pointer"
            >
              {assistantCtaText}
            </button>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default About
