import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Section from './Section'
import profileData from '../data/profile.json'

const Certifications = () => {
  const [profile] = useState(profileData)

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const cardVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <Section id="certifications" title="Certifications" subtitle="Professional Credentials">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {profile.certifications.map((cert, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="card hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-2">
                {cert.name}
              </h3>
              <h4 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-2">
                {cert.provider}
              </h4>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-light-textMuted dark:text-dark-textMuted">
                  {cert.platform}
                </span>
                <span className="text-sm font-semibold text-light-textMuted dark:text-dark-textMuted">
                  {cert.year}
                </span>
              </div>
            </div>
            <p className="text-light-textMuted dark:text-dark-textMuted">
              {cert.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

export default Certifications