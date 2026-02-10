import React, { useState } from 'react'
import { motion } from 'framer-motion'
import profileData from '../data/profile.json'

const KeyHighlights = () => {
  const [profile] = useState(profileData)

  if (!profile.highlights || profile.highlights.length === 0) return null

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const itemVariants = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="section-container bg-light-surface dark:bg-dark-surface">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.1,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {profile.highlights.map((highlight, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex items-start gap-3 p-4 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-surfaceHover dark:border-dark-surfaceHover hover:border-primary-500 dark:hover:border-primary-400 transition-colors"
            >
              <svg
                className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="text-light-text dark:text-dark-text font-medium">{highlight}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default KeyHighlights
