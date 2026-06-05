import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiCode, FiDatabase, FiCloud, FiLayers } from 'react-icons/fi'

const categoryConfig = {
  'Lenguajes & Frameworks': {
    icon: FiCode,
    color: '#4f46e5',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    pillBg: '#eef2ff',
    pillBorder: '#c7d2fe',
    pillText: '#4338ca',
    headerBorder: 'border-indigo-200',
  },
  'Bases de Datos': {
    icon: FiDatabase,
    color: '#0891b2',
    bg: 'bg-cyan-50',
    border: 'border-cyan-200',
    pillBg: '#ecfeff',
    pillBorder: '#a5f3fc',
    pillText: '#0e7490',
    headerBorder: 'border-cyan-200',
  },
  'Cloud & DevOps': {
    icon: FiCloud,
    color: '#7c3aed',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    pillBg: '#f5f3ff',
    pillBorder: '#ddd6fe',
    pillText: '#6d28d9',
    headerBorder: 'border-violet-200',
  },
  'Arquitectura': {
    icon: FiLayers,
    color: '#059669',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    pillBg: '#ecfdf5',
    pillBorder: '#a7f3d0',
    pillText: '#047857',
    headerBorder: 'border-emerald-200',
  },
}

function SkillPill({ name, config }) {
  return (
    <motion.span
      whileHover={{ scale: 1.06, y: -1 }}
      className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-default"
      style={{
        background: config.pillBg,
        border: `1px solid ${config.pillBorder}`,
        color: config.pillText,
      }}
    >
      {name}
    </motion.span>
  )
}

function CategoryCard({ category, index }) {
  const config = categoryConfig[category.category] || categoryConfig['Lenguajes & Frameworks']
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className={`bg-white rounded-2xl p-6 border ${config.border} hover:shadow-lg transition-all duration-300`}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-11 h-11 rounded-xl ${config.bg} border ${config.border} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-5 h-5" style={{ color: config.color }} />
        </div>
        <h3 className="font-display font-semibold text-base" style={{ color: config.color }}>
          {category.category}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {category.items.map((item) => (
          <SkillPill key={item} name={item} config={config} />
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills({ cvData }) {
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
            Stack técnico
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mt-2">
            Habilidades Técnicas
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mt-4"></div>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            Más de 8 años construyendo soluciones robustas con un stack moderno y diverso.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {cvData?.skills?.map((category, index) => (
            <CategoryCard key={category.category} category={category} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"
        />
      </div>
    </section>
  )
}
