import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Section from './Section'
import profileData from '../data/profile.json'

const Experience = () => {
  const [profile] = useState(profileData)

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const itemVariants = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <Section id="experience" title="Experience" subtitle="Career">
      <div className="max-w-4xl mx-auto space-y-8">
        {profile.experience.map((exp, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="card relative pl-8 border-l-4 border-primary-500 dark:border-primary-400 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
          >
            <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary-500 dark:bg-primary-400"></div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className="text-2xl font-bold text-light-text dark:text-dark-text">
                {exp.position}
              </h3>
              <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 mt-1 sm:mt-0">
                {exp.period}
              </span>
            </div>
            <h4 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-2">
              {exp.company}
            </h4>
            <p className="text-light-textMuted dark:text-dark-textMuted mb-4">
              {exp.description}
            </p>
            {exp.achievements && exp.achievements.length > 0 && (
              <ul className="list-disc list-inside space-y-2 text-light-textMuted dark:text-dark-textMuted">
                {exp.achievements.map((achievement, achIndex) => (
                  <li key={achIndex}>{achievement}</li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

export default Experience
