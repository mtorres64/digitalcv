import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiTruck, FiPackage, FiDatabase, FiCpu, FiArrowUpRight, FiCode, FiBookOpen, FiActivity, FiShoppingCart, FiLock } from 'react-icons/fi'
import ScreenshotsCarousel from './ScreenshotsCarousel'

const iconMap = { FiTruck, FiPackage, FiDatabase, FiCpu, FiCode, FiBookOpen, FiActivity, FiShoppingCart, FiLock }

function hexToLight(hex) {
  return hex + '12'
}
function hexToBorder(hex) {
  return hex + '30'
}
function hexToText(hex) {
  return hex
}

function ProjectCard({ project, index }) {
  const Icon = iconMap[project.icon] || FiCode
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="relative bg-white rounded-2xl p-6 flex flex-col group border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Top colored accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
        style={{ background: `linear-gradient(to right, ${project.color}80, ${project.color})` }}
      />

      <div className="flex items-start justify-between mb-5 mt-2">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300"
          style={{ background: hexToLight(project.color), border: `1px solid ${hexToBorder(project.color)}` }}
        >
          <Icon className="w-6 h-6" style={{ color: project.color }} />
        </div>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: hexToLight(project.color) }}
        >
          <FiArrowUpRight className="w-4 h-4" style={{ color: project.color }} />
        </div>
      </div>

      <h3 className="font-display font-bold text-lg text-slate-900 mb-2 leading-snug">
        {project.title}
      </h3>

      <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-5">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-1 rounded-md text-xs font-medium"
            style={{
              background: hexToLight(project.color),
              color: hexToText(project.color),
              border: `1px solid ${hexToBorder(project.color)}`,
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Projects({ cvData }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Portfolio
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mt-2">
            Proyectos Destacados
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mt-4"></div>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            Soluciones reales desarrolladas para empresas líderes y proyectos propios.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {cvData?.projects?.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <ScreenshotsCarousel />
      </div>
    </section>
  )
}
