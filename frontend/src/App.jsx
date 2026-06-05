import React from 'react'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Footer from './components/Footer'
import cvData from './data/cvData'

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-surface"
    >
      <Navbar cvData={cvData} />

      <main>
        <section id="inicio">
          <Hero cvData={cvData} />
        </section>
        <section id="sobre-mi">
          <About cvData={cvData} />
        </section>
        <section id="habilidades">
          <Skills cvData={cvData} />
        </section>
        <section id="experiencia">
          <Experience cvData={cvData} />
        </section>
        <section id="proyectos">
          <Projects cvData={cvData} />
        </section>
        <section id="educacion">
          <Education cvData={cvData} />
        </section>
      </main>

      <Footer cvData={cvData} />
    </motion.div>
  )
}

export default App
