import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import KeyHighlights from './components/KeyHighlights'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import CallToAction from './components/CallToAction'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './styles/globals.css'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <KeyHighlights />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <CallToAction />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
