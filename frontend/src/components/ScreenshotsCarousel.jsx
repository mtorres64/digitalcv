import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiMonitor } from 'react-icons/fi'

const SCREENSHOTS = [
  { src: '/screenshots/pos-punto-de-venta.png',       caption: 'Sistema de Facturación – Punto de Venta',              tag: 'Facturación & Ventas' },
  { src: '/screenshots/edu-abm-feriados.png',         caption: 'Gestión Educativa – ABM Feriados y Calendario',        tag: 'Gestión Educativa' },
  { src: '/screenshots/pos-dashboard.png',            caption: 'Sistema de Facturación – Dashboard de Reportes',       tag: 'Facturación & Ventas' },
  { src: '/screenshots/gym-socio-ficha.png',          caption: 'App Gym – Ficha de Socio y Registro de Huellas',       tag: 'Gym' },
  { src: '/screenshots/pos-productos.png',            caption: 'Sistema de Facturación – Gestión de Productos',        tag: 'Facturación & Ventas' },
  { src: '/screenshots/edu-pagos-alumnos.png',        caption: 'Gestión Educativa – Pagos y Cuotas de Alumnos',        tag: 'Gestión Educativa' },
  { src: '/screenshots/pos-ventas.png',               caption: 'Sistema de Facturación – Pantalla de Ventas',          tag: 'Facturación & Ventas' },
  { src: '/screenshots/cajas-cliente.png',            caption: 'Gestión de Cajas de Seguridad – Ficha de Cliente',     tag: 'Cajas de Seguridad' },
  { src: '/screenshots/pos-sucursal-precios.png',     caption: 'Sistema de Facturación – Precios por Sucursal',        tag: 'Facturación & Ventas' },
  { src: '/screenshots/pos-ticket.png',               caption: 'Sistema de Facturación – Ticket de Venta Imprimible',  tag: 'Facturación & Ventas' },
  { src: '/screenshots/pos-categorias.png',           caption: 'Sistema de Facturación – Gestión de Categorías',       tag: 'Facturación & Ventas' },
  { src: '/screenshots/pos-articulos.png',            caption: 'Sistema de Facturación – Listado de Artículos',        tag: 'Facturación & Ventas' },
]

const variants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
}

function Placeholder() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
        <FiMonitor className="w-8 h-8 text-primary/40" />
      </div>
      <p className="text-slate-400 text-sm">Las capturas de pantalla aparecerán aquí</p>
    </div>
  )
}

export default function ScreenshotsCarousel() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef(null)

  const total = SCREENSHOTS.length
  const hasImages = total > 0

  const go = useCallback(
    (dir) => {
      setDirection(dir)
      setIndex((i) => (i + dir + total) % total)
    },
    [total]
  )

  useEffect(() => {
    if (!hasImages || paused) return
    intervalRef.current = setInterval(() => go(1), 4500)
    return () => clearInterval(intervalRef.current)
  }, [go, hasImages, paused])

  return (
    <div className="mt-20">
      <div className="text-center mb-10">
        <span className="text-primary text-sm font-semibold tracking-widest uppercase">
          Capturas
        </span>
        <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mt-2">
          Sistemas en Producción
        </h3>
        <div className="w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mt-3" />
        <p className="text-slate-500 text-sm mt-3">
          Interfaces de las aplicaciones desarrolladas
        </p>
      </div>

      <div
        className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Browser chrome bar */}
        <div className="flex items-center gap-1.5 px-4 py-3 bg-white border-b border-slate-100">
          <span className="w-3 h-3 rounded-full bg-red-400/70" />
          <span className="w-3 h-3 rounded-full bg-amber-400/70" />
          <span className="w-3 h-3 rounded-full bg-emerald-400/70" />
          <div className="ml-3 flex-1 h-6 rounded-md bg-slate-100 flex items-center px-3">
            <span className="text-slate-400 text-xs truncate">
              {hasImages ? SCREENSHOTS[index].caption : 'Sistema en producción'}
            </span>
          </div>
        </div>

        {/* Image area */}
        <div className="relative aspect-video overflow-hidden bg-slate-100">
          {hasImages ? (
            <>
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.img
                  key={index}
                  src={SCREENSHOTS[index].src}
                  alt={SCREENSHOTS[index].caption}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </AnimatePresence>

              {/* Glass overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(99,102,241,0.07) 0%, rgba(14,165,233,0.04) 50%, rgba(139,92,246,0.06) 100%)',
                  backdropFilter: 'blur(0.4px)',
                }}
              />
              {/* Subtle vignette on edges */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 80px rgba(15,23,42,0.18)',
                }}
              />

              {/* Prev / Next */}
              {total > 1 && (
                <>
                  <button
                    onClick={() => go(-1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur border border-slate-200 shadow flex items-center justify-center text-slate-600 hover:text-primary hover:border-primary/40 transition-all duration-200"
                  >
                    <FiChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => go(1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur border border-slate-200 shadow flex items-center justify-center text-slate-600 hover:text-primary hover:border-primary/40 transition-all duration-200"
                  >
                    <FiChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </>
          ) : (
            <Placeholder />
          )}
        </div>

        {/* Caption + tag + dots */}
        {hasImages && (
          <div className="flex items-center justify-between px-5 py-3 bg-white border-t border-slate-100 gap-3 flex-wrap">
            <div className="flex items-center gap-3 min-w-0">
              <span className="shrink-0 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-primary border border-indigo-100">
                {SCREENSHOTS[index].tag}
              </span>
              <span className="text-slate-600 text-sm font-medium truncate">
                {SCREENSHOTS[index].caption}
              </span>
            </div>
            {total > 1 && (
              <div className="flex items-center gap-1.5 shrink-0">
                {SCREENSHOTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i) }}
                    className={`rounded-full transition-all duration-300 ${
                      i === index
                        ? 'w-5 h-2 bg-primary'
                        : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
