import { motion } from 'framer-motion';
import { scrollToSection } from '../../utils/scroll';

const About = () => {
    return (
        <>
            {/* About Section */}
      <section id="about" className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-6 py-20">
          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
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
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">{"About Me"}</h2>
              <p className="text-lg mb-6">
              {"I’m a self-taught, full-stack developer who, seven years ago, decided to change things up and dive into the world of software development. What followed was a plethora of YouTube videos, Udemy courses, and hair loss! But as a result, I landed my dream job as a developer, and I haven’t looked back since! If you’d like to know more about me, I’ve developed a personal AI assistant to answer your questions and convince you why I’d be a great hire. 😉"}
              </p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection()
                }}
                className="inline-block px-6 py-3 bg-black text-white rounded-md shadow hover:bg-gray-800 transition"
              >
                {"Meet My Assistant"}
              </button>
            </motion.div>
          </div>
        </section>
        </>
    )
}

export default About