import React from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiLinkedin, FiGithub, FiHeart } from 'react-icons/fi'

export default function Footer({ cvData }) {
  const year = new Date().getFullYear()

  const links = [
    cvData?.contact?.email && { icon: FiMail, href: `mailto:${cvData.contact.email}`, label: 'Email' },
    cvData?.contact?.linkedin && { icon: FiLinkedin, href: `https://${cvData.contact.linkedin}`, label: 'LinkedIn' },
    cvData?.contact?.github && { icon: FiGithub, href: `https://${cvData.contact.github}`, label: 'GitHub' },
  ].filter(Boolean)

  return (
    <footer className="relative border-t border-slate-200 bg-white">
      <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-display font-bold text-white text-base shadow-md">
              MT
            </div>
            <div>
              <div className="font-display font-bold text-slate-900">{cvData?.name}</div>
              <div className="text-slate-400 text-xs">{cvData?.title}</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            {links.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary/40 hover:bg-primary/8 transition-all"
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </motion.div>

          <div className="w-32 h-px bg-slate-200" />

          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <span>© {year}</span>
            <span className="text-slate-300">·</span>
            <span>{cvData?.name}</span>
            <span className="text-slate-300">·</span>
            <span className="flex items-center gap-1">
              Hecho con <FiHeart className="w-3.5 h-3.5 text-primary" /> en Argentina
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
