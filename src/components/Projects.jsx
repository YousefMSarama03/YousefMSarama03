import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Section from './Section'
import profileData from '../data/profile.json'

const Projects = () => {
  const [profile] = useState(profileData)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(profile.projects.map(p => p.category).filter(Boolean))]
    return cats
  }, [profile.projects])

  // Filter projects
  const filteredProjects = useMemo(() => {
    let filtered = profile.projects

    if (showFeaturedOnly) {
      filtered = filtered.filter(p => p.featured)
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    // Sort: featured first, then by category
    return filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return 0
    })
  }, [profile.projects, selectedCategory, showFeaturedOnly])

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
    <Section id="projects" title="Featured Projects" subtitle="My Work">
      {/* Filter Controls */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
        <button
          onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            showFeaturedOnly
              ? 'bg-primary-600 dark:bg-primary-500 text-white'
              : 'bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text hover:bg-light-surfaceHover dark:hover:bg-dark-surfaceHover'
          }`}
        >
          Featured Only
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-primary-600 dark:bg-primary-500 text-white'
                : 'bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text hover:bg-light-surfaceHover dark:hover:bg-dark-surfaceHover'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-light-textMuted dark:text-dark-textMuted text-lg">
            No projects found for the selected filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="card group hover:scale-105 hover:shadow-2xl transition-all duration-300"
            whileHover={prefersReducedMotion ? {} : { y: -8 }}
          >
            <div className="mb-4 overflow-hidden rounded-lg">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-2xl font-bold text-light-text dark:text-dark-text">
                {project.title}
              </h3>
              {project.featured && (
                <span className="px-2 py-1 text-xs font-bold rounded bg-primary-600 dark:bg-primary-500 text-white">
                  Featured
                </span>
              )}
            </div>
            {project.category && (
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 mb-3">
                {project.category}
              </span>
            )}
            <p className="text-light-textMuted dark:text-dark-textMuted mb-4">
              {project.description}
            </p>
            {project.highlights && project.highlights.length > 0 && (
              <ul className="list-disc list-inside space-y-1 mb-4 text-sm text-light-textMuted dark:text-dark-textMuted">
                {project.highlights.slice(0, 3).map((highlight, hIndex) => (
                  <li key={hIndex}>{highlight}</li>
                ))}
              </ul>
            )}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-3 py-1 text-xs font-semibold rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold flex items-center gap-2 transition-colors active:scale-95"
                >
                  Live Demo
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light-textMuted dark:text-dark-textMuted hover:text-primary-600 dark:hover:text-primary-400 font-semibold flex items-center gap-2 transition-colors active:scale-95"
                >
                  Code
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              )}
            </div>
          </motion.div>
        ))}
        </div>
      )}
    </Section>
  )
}

export default Projects
