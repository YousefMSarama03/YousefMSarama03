import React, { useRef, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'

const Section = ({ id, title, subtitle, children, className = '' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  const reducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const containerVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0.2 : 0.6,
        ease: 'easeOut',
        staggerChildren: reducedMotion ? 0 : 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0.2 : 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={`section-container ${className}`}
    >
      {(title || subtitle) && (
        <motion.div className="text-center mb-12" variants={itemVariants}>
          {subtitle && (
            <motion.p
              className="text-primary-500 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider mb-2"
              variants={itemVariants}
            >
              {subtitle}
            </motion.p>
          )}
          {title && (
            <>
              <motion.h2
                className="text-4xl sm:text-5xl font-bold text-light-text dark:text-dark-text mb-4"
                variants={itemVariants}
              >
                {title}
              </motion.h2>
              <motion.div
                className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 mx-auto rounded-full"
                variants={itemVariants}
              ></motion.div>
            </>
          )}
        </motion.div>
      )}
      <motion.div variants={containerVariants}>
        {children}
      </motion.div>
    </motion.section>
  )
}

export default Section
