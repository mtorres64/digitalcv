import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiBookOpen, FiAward, FiTrendingUp } from 'react-icons/fi'

const typeConfig = {
  degree: {
    icon: FiBookOpen,
    label: 'Título',
    color: '#4f46e5',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    badgeStyle: { background: '#eef2ff', color: '#4338ca', border: '1px solid #c7d2fe' },
    leftBorder: '#6366f1',
  },
  certification: {
    icon: FiTrendingUp,
    label: 'Formación continua',
    color: '#0891b2',
    bg: 'bg-cyan-50',
    border: 'border-cyan-200',
    badgeStyle: { background: '#ecfeff', color: '#0e7490', border: '1px solid #a5f3fc' },
    leftBorder: '#0891b2',
  },
  course: {
    icon: FiAward,
    label: 'Curso',
    color: '#7c3aed',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    badgeStyle: { background: '#f5f3ff', color: '#6d28d9', border: '1px solid #ddd6fe' },
    leftBorder: '#7c3aed',
  },
}

function EducationCard({ edu, index }) {
  const config = typeConfig[edu.type] || typeConfig.degree
  const Icon = config.icon
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{ y: -3 }}
      className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-md transition-all duration-300 group"
      style={{ borderLeftColor: config.leftBorder, borderLeftWidth: '3px' }}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-xl ${config.bg} border ${config.border} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
        >
          <Icon className="w-5 h-5" style={{ color: config.color }} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
            <h3 className="font-display font-semibold text-slate-900 text-base leading-snug">
              {edu.degree}
            </h3>
            {edu.period && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0" style={config.badgeStyle}>
                {edu.period}
              </span>
            )}
          </div>

          {edu.institution && (
            <p className="text-slate-500 text-sm">{edu.institution}</p>
          )}

          <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded" style={config.badgeStyle}>
            {config.label}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Education({ cvData }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 bg-surface-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Formación
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mt-2">
            Educación
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mt-4"></div>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            Base académica sólida complementada con formación continua y actualización tecnológica constante.
          </p>
        </motion.div>

        <div className="space-y-4">
          {cvData?.education?.map((edu, index) => (
            <EducationCard key={edu.degree} edu={edu} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-slate-200 shadow-sm">
            <FiTrendingUp className="w-4 h-4 text-primary" />
            <span className="text-slate-600 text-sm">
              En constante actualización profesional y técnica
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
