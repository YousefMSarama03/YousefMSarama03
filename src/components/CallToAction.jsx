import React from 'react'
import { motion } from 'framer-motion'
import profileData from '../data/profile.json'

const CallToAction = () => {
  const profile = profileData

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <section className="section-container bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-500 dark:to-primary-400 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: prefersReducedMotion ? 0.2 : 0.6 }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">
          Let's Work Together
        </h2>
        <p className="text-xl sm:text-2xl mb-8 opacity-90">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              const element = document.querySelector('#contact')
              if (element) {
                const offsetTop = element.offsetTop - 80
                window.scrollTo({ top: offsetTop, behavior: 'smooth' })
              }
            }}
            className="px-8 py-4 bg-white text-primary-600 dark:text-primary-500 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95"
          >
            Get In Touch
          </a>
          {profile.cvLink && (
            <a
              href={profile.cvLink}
              download
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold transition-all duration-300 hover:bg-white hover:text-primary-600 dark:hover:text-primary-500 active:scale-95"
            >
              Download CV
            </a>
          )}
        </div>
      </motion.div>
    </section>
  )
}

export default CallToAction
