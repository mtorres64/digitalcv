import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FiDownload, FiBriefcase, FiMail } from 'react-icons/fi'
import { generateCVPdf } from '../utils/pdfGenerator'

const TITLES = [
  '.NET Full Stack Developer',
  'Ingeniero en Computación',
  'Especialista en APIs REST',
  'Arquitecto de Software',
  'Experto en Azure & Cloud',
]

function useTypingEffect(texts, speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = texts[textIndex]
    let timeout

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), speed)
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), speed / 2)
    } else if (deleting && charIndex === 0) {
      setDeleting(false)
      setTextIndex((i) => (i + 1) % texts.length)
    }

    setDisplayed(current.slice(0, charIndex))
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, textIndex, texts, speed, pause])

  return displayed
}

function Particles() {
  const particles = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 8 + 4,
    delay: Math.random() * 4,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -28, 0], opacity: [0.15, 0.5, 0.15], scale: [1, 1.4, 1] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

export default function Hero({ cvData }) {
  const typedTitle = useTypingEffect(TITLES)

  const handleScrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleDownloadPDF = async () => {
    await generateCVPdf(cvData)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/60">
      {/* Soft color blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-100/70 rounded-full blur-[130px] -translate-y-1/3"></div>
        <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-cyan-100/60 rounded-full blur-[130px] translate-y-1/3"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-violet-100/50 rounded-full blur-[90px] -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <Particles />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Text content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-200 shadow-sm text-sm text-primary font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Disponible para nuevos proyectos</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display font-bold leading-tight mb-4"
          >
            <span className="block text-4xl sm:text-5xl lg:text-6xl text-slate-900 mb-1">
              Marcelo
            </span>
            <span className="block text-4xl sm:text-5xl lg:text-6xl text-gradient">
              Alejandro Torres
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex items-center justify-center lg:justify-start gap-1 h-10 mb-6"
          >
            <span className="text-xl sm:text-2xl text-primary font-display font-semibold">
              {typedTitle}
            </span>
            <span className="inline-block w-0.5 h-7 bg-primary animate-pulse ml-0.5"></span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
          >
            {cvData?.profile?.slice(0, 180)}...
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center lg:justify-start gap-2 mb-8"
          >
            <span className="text-xl">🇦🇷</span>
            <span className="text-slate-500 text-sm font-medium">Argentina</span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span className="text-slate-500 text-sm">
              {cvData?.stats?.yearsExperience}+ años de experiencia
            </span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScrollTo('#experiencia')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-primary/30 w-full sm:w-auto justify-center"
            >
              <FiBriefcase className="w-4 h-4" />
              Ver mi trabajo
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200 hover:border-primary/50 text-slate-700 hover:text-primary font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-md w-full sm:w-auto justify-center"
            >
              <FiDownload className="w-4 h-4" />
              Descargar CV
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`mailto:${cvData?.contact?.email}`}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-slate-500 hover:text-primary font-semibold text-sm transition-colors w-full sm:w-auto justify-center"
            >
              <FiMail className="w-4 h-4" />
              Contactar
            </motion.a>
          </motion.div>
        </div>

        {/* Profile photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className="flex-shrink-0"
        >
          <div className="relative">
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 30px rgba(99,102,241,0.2)',
                  '0 0 55px rgba(99,102,241,0.45)',
                  '0 0 30px rgba(99,102,241,0.2)',
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full"
            >
              <div className="w-full h-full rounded-full p-1 bg-gradient-to-br from-primary via-accent to-violet-500">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-100">
                  <img
                    src="/foto.png"
                    alt="Marcelo Torres"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.parentElement.classList.add('flex', 'items-center', 'justify-center')
                      const initials = document.createElement('span')
                      initials.textContent = 'MT'
                      initials.className = 'font-display font-bold text-5xl text-gradient'
                      e.target.parentElement.appendChild(initials)
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Floating badge – years */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-2 -left-6 bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-lg"
            >
              <div className="text-2xl font-display font-bold text-primary">
                {cvData?.stats?.yearsExperience}+
              </div>
              <div className="text-xs text-slate-500">años exp.</div>
            </motion.div>

            {/* Floating badge – tech */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -top-2 -right-6 bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-lg"
            >
              <div className="text-2xl font-display font-bold text-accent">
                {cvData?.stats?.technologies}+
              </div>
              <div className="text-xs text-slate-500">tecnologías</div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => handleScrollTo('#sobre-mi')}
      >
        <span className="text-xs text-slate-400 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-slate-300 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-primary"></div>
        </motion.div>
      </motion.div>
    </div>
  )
}
