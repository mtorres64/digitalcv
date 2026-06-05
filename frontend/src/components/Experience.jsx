import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiCalendar, FiMapPin } from 'react-icons/fi'

const companyColors = {
  Accenture: { accent: '#7c3aed', light: '#6d28d9', pill: '#f5f3ff', pillBorder: '#ddd6fe', pillText: '#6d28d9' },
  Infomanager: { accent: '#0891b2', light: '#0e7490', pill: '#ecfeff', pillBorder: '#a5f3fc', pillText: '#0e7490' },
  'Ministerio de Educación': { accent: '#059669', light: '#047857', pill: '#ecfdf5', pillBorder: '#a7f3d0', pillText: '#047857' },
}

function getCompanyColor(company) {
  for (const key of Object.keys(companyColors)) {
    if (company.includes(key) || key.includes(company)) return companyColors[key]
  }
  return { accent: '#4f46e5', light: '#4338ca', pill: '#eef2ff', pillBorder: '#c7d2fe', pillText: '#4338ca' }
}

function ExperienceCard({ exp, index }) {
  const color = getCompanyColor(exp.company)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative flex gap-6 group"
    >
      {/* Timeline dot */}
      <div className="flex flex-col items-center">
        <motion.div
          animate={{
            boxShadow: [`0 0 0px ${color.accent}`, `0 0 14px ${color.accent}66`, `0 0 0px ${color.accent}`],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-4 h-4 rounded-full border-2 flex-shrink-0 mt-1 z-10 bg-white"
          style={{ borderColor: color.accent }}
        />
        <div
          className="flex-1 w-px mt-2 min-h-[20px]"
          style={{ background: `linear-gradient(to bottom, ${color.accent}50, transparent)` }}
        />
      </div>

      {/* Card */}
      <motion.div
        whileHover={{ y: -3 }}
        className="flex-1 bg-white rounded-2xl p-6 mb-8 border border-slate-200 hover:border-primary/30 hover:shadow-md transition-all duration-300"
        style={{ borderLeftColor: color.accent, borderLeftWidth: '3px' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div>
            <h3 className="font-display font-bold text-lg text-slate-900">{exp.role}</h3>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="font-semibold text-sm" style={{ color: color.accent }}>
                {exp.company}
              </span>
              {exp.client && (
                <>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-500 text-sm">{exp.client}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5 sm:items-end flex-shrink-0">
            <div className="flex items-center gap-1.5">
              <FiCalendar className="w-3.5 h-3.5 text-slate-400" />
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ background: color.pill, color: color.pillText, border: `1px solid ${color.pillBorder}` }}
              >
                {exp.period}
              </span>
            </div>
            {exp.industry && (
              <div className="flex items-center gap-1.5">
                <FiMapPin className="w-3 h-3 text-slate-400" />
                <span className="text-xs text-slate-400">{exp.industry}</span>
              </div>
            )}
          </div>
        </div>

        <ul className="space-y-2 mb-5">
          {exp.responsibilities.map((r, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span
                className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                style={{ background: color.accent }}
              />
              <span className="text-slate-600 text-sm leading-relaxed">{r}</span>
            </li>
          ))}
        </ul>

        {exp.technologies && exp.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md text-xs font-medium"
                style={{ background: color.pill, color: color.pillText, border: `1px solid ${color.pillBorder}` }}
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function Experience({ cvData }) {
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
            Trayectoria
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mt-2">
            Experiencia Laboral
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mt-4"></div>
        </motion.div>

        <div>
          {cvData?.experience?.map((exp, index) => (
            <ExperienceCard key={`${exp.company}-${exp.period}`} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
