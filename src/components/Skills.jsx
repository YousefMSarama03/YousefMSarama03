import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Section from './Section'
import profileData from '../data/profile.json'

const Skills = () => {
  const [profile] = useState(profileData)

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const cardVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <Section id="skills" title="Skills" subtitle="What I Do">
      {/* Tech Stack Badges */}
      {profile.techStack && profile.techStack.length > 0 && (
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6 text-center">
            Tech Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {profile.techStack.map((tech, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 text-white rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profile.skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="card hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold text-light-text dark:text-dark-text">
                {skill.name}
              </h3>
              <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                {skill.level}%
              </span>
            </div>
            <div className="w-full bg-light-surfaceHover dark:bg-dark-surfaceHover rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: prefersReducedMotion ? 0.3 : 1, ease: 'easeOut', delay: index * 0.1 }}
                role="progressbar"
                aria-valuenow={skill.level}
                aria-valuemin="0"
                aria-valuemax="100"
              ></motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

export default Skills
