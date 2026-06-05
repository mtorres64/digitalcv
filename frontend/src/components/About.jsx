import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiMail, FiMapPin, FiLinkedin, FiPhone, FiCode, FiUsers, FiAward } from 'react-icons/fi'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

function StatCard({ value, label, icon: Icon, color }) {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-2xl p-5 text-center border border-slate-200 hover:border-primary/40 hover:shadow-md transition-all duration-200 group"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-110"
        style={{ background: `${color}15`, border: `1px solid ${color}30` }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div className="font-display font-bold text-3xl text-slate-900 mb-1">{value}</div>
      <div className="text-slate-500 text-sm">{label}</div>
    </motion.div>
  )
}

export default function About({ cvData }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const stats = [
    { value: `${cvData?.stats?.yearsExperience || 8}+`, label: 'Años de experiencia', icon: FiAward, color: '#6366f1' },
    { value: `${cvData?.stats?.projects || 20}+`, label: 'Proyectos completados', icon: FiCode, color: '#0891b2' },
    { value: `${cvData?.stats?.technologies || 15}+`, label: 'Tecnologías dominadas', icon: FiUsers, color: '#7c3aed' },
  ]

  return (
    <section ref={ref} className="py-24 bg-surface-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">
              Sobre mí
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mt-2">
              Ingeniero &amp; Desarrollador
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mt-4"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Profile text */}
            <div>
              <motion.div variants={itemVariants} className="bg-white rounded-2xl p-8 mb-6 border border-slate-200 shadow-sm">
                <p className="text-slate-600 leading-relaxed text-base">
                  {cvData?.profile}
                </p>
              </motion.div>

              <div className="grid grid-cols-3 gap-4">
                {stats.map((s) => (
                  <StatCard key={s.label} {...s} />
                ))}
              </div>
            </div>

            {/* Contact info */}
            <div className="space-y-4">
              <motion.h3
                variants={itemVariants}
                className="font-display font-semibold text-xl text-slate-900 mb-6"
              >
                Información de contacto
              </motion.h3>

              {cvData?.contact?.email && (
                <motion.a
                  variants={itemVariants}
                  href={`mailto:${cvData.contact.email}`}
                  className="flex items-center gap-4 bg-white rounded-xl p-4 border border-slate-200 hover:border-primary/50 hover:shadow-sm transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                    <FiMail className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">Email</div>
                    <div className="text-slate-800 font-medium text-sm">{cvData.contact.email}</div>
                  </div>
                </motion.a>
              )}

              {cvData?.contact?.phone && (
                <motion.a
                  variants={itemVariants}
                  href={`tel:${cvData.contact.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-4 bg-white rounded-xl p-4 border border-slate-200 hover:border-emerald-400/50 hover:shadow-sm transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors flex-shrink-0">
                    <FiPhone className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">Teléfono</div>
                    <div className="text-slate-800 font-medium text-sm">{cvData.contact.phone}</div>
                  </div>
                </motion.a>
              )}

              {cvData?.contact?.location && (
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-4 bg-white rounded-xl p-4 border border-slate-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center flex-shrink-0">
                    <FiMapPin className="w-4 h-4 text-cyan-600" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">Ubicación</div>
                    <div className="text-slate-800 font-medium text-sm">🇦🇷 {cvData.contact.location}</div>
                  </div>
                </motion.div>
              )}

              {cvData?.contact?.linkedin && (
                <motion.a
                  variants={itemVariants}
                  href={`https://${cvData.contact.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-400/50 hover:shadow-sm transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors flex-shrink-0">
                    <FiLinkedin className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">LinkedIn</div>
                    <div className="text-slate-800 font-medium text-sm">{cvData.contact.linkedin}</div>
                  </div>
                </motion.a>
              )}

              <motion.div variants={itemVariants} className="bg-white rounded-xl p-5 border border-slate-200 mt-6">
                <h4 className="font-semibold text-slate-800 text-sm mb-3">Especialidades clave</h4>
                <div className="flex flex-wrap gap-2">
                  {['.NET Core / C#', 'Clean Architecture', 'APIs REST', 'Azure Cloud', 'SQL & NoSQL', 'CI/CD'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-primary/8 text-primary border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
