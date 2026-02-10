import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import Section from './Section'
import profileData from '../data/profile.json'

// Initialize EmailJS
const EMAILJS_SERVICE_ID = 'service_kdh929a'
const EMAILJS_TEMPLATE_ID = 'template_97v11f9'
const EMAILJS_PUBLIC_KEY = '4BaZFw8D2gqiqq2NI'

if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY)
}

const Contact = () => {
  const [profile] = useState(profileData)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setSending(true)

    // Check if EmailJS is configured
    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
      setMessage('Email service not configured. Please contact the site owner.')
      setMessageType('error')
      setSending(false)
      return
    }

    try {
      // Send email using EmailJS
      const now = new Date()
      const timeString = now.toLocaleString()
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: 'yosefsarama23@gmail.com',
        from_name: formData.name || 'Website Visitor',
        from_email: formData.email,
        message: formData.message,
        time: timeString,
      })

      setMessage('Thank you! Your message has been sent successfully.')
      setMessageType('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      console.error('EmailJS error:', err)
      setMessage('Failed to send message. Please try again later.')
      setMessageType('error')
    } finally {
      setSending(false)
    }
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const cardVariants = {
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
    <Section id="contact" title="Get In Touch" subtitle="Contact">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            variants={cardVariants}
            className="card hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
          >
            <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">
              Contact Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                  <svg
                    className="w-6 h-6 text-primary-600 dark:text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-light-textMuted dark:text-dark-textMuted">Email</p>
                  <a
                    href={`mailto:yosefsarama23@gmail.com`}
                    className="text-light-text dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    yosefsarama23@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                  <svg
                    className="w-6 h-6 text-primary-600 dark:text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-light-textMuted dark:text-dark-textMuted">Phone</p>
                  <a
                    href={`tel:${profile.phone}`}
                    className="text-light-text dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {profile.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                  <svg
                    className="w-6 h-6 text-primary-600 dark:text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-light-textMuted dark:text-dark-textMuted">Location</p>
                  <p className="text-light-text dark:text-dark-text">{profile.location}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="card hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
          >
            <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-light-text dark:text-dark-text mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-light-surfaceHover dark:bg-dark-surfaceHover border border-light-surfaceHover dark:border-dark-surfaceHover focus:border-primary-500 dark:focus:border-primary-400 focus:outline-none transition-colors text-light-text dark:text-dark-text"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-light-text dark:text-dark-text mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-light-surfaceHover dark:bg-dark-surfaceHover border border-light-surfaceHover dark:border-dark-surfaceHover focus:border-primary-500 dark:focus:border-primary-400 focus:outline-none transition-colors text-light-text dark:text-dark-text"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-light-text dark:text-dark-text mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg bg-light-surfaceHover dark:bg-dark-surfaceHover border border-light-surfaceHover dark:border-dark-surfaceHover focus:border-primary-500 dark:focus:border-primary-400 focus:outline-none transition-colors text-light-text dark:text-dark-text resize-none"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full px-8 py-3 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
            {message && (
              <div
                className={`mt-4 p-3 rounded ${
                  messageType === 'success'
                    ? 'bg-green-50 dark:bg-green-900/20'
                    : 'bg-red-50 dark:bg-red-900/20'
                }`}
              >
                <p
                  className={`text-sm ${
                    messageType === 'success'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {message}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

export default Contact
