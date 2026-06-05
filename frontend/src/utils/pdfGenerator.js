import jsPDF from 'jspdf'

async function circularPhoto(src, sizePx = 300) {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const c = document.createElement('canvas')
      c.width = sizePx; c.height = sizePx
      const ctx = c.getContext('2d')
      ctx.beginPath()
      ctx.arc(sizePx / 2, sizePx / 2, sizePx / 2, 0, Math.PI * 2)
      ctx.closePath()
      ctx.clip()
      const scale = Math.max(sizePx / img.width, sizePx / img.height)
      const dw = img.width * scale, dh = img.height * scale
      ctx.drawImage(img, (sizePx - dw) / 2, (sizePx - dh) / 2, dw, dh)
      resolve(c.toDataURL('image/png'))
    }
    img.onerror = () => resolve(null)
    img.src = src
  })
}

const C = {
  indigo:   '#4f46e5',
  indigoL:  '#6366f1',
  indigoP:  '#c7d2fe',
  white:    '#ffffff',
  s900:     '#0f172a',
  s700:     '#334155',
  s600:     '#475569',
  s500:     '#64748b',
  s400:     '#94a3b8',
  s300:     '#cbd5e1',
  s200:     '#e2e8f0',
}

function wt(doc, text, x, y, maxW, { sz = 9.5, color = C.s600, style = 'normal', lh = 4.5 } = {}) {
  doc.setFont('helvetica', style)
  doc.setFontSize(sz)
  doc.setTextColor(color)
  const lines = doc.splitTextToSize(String(text || ''), maxW)
  doc.text(lines, x, y)
  return y + lines.length * lh
}

function sLabel(doc, text, x, y, w) {
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(C.indigo)
  doc.text(text.toUpperCase(), x, y)
  doc.setDrawColor(C.indigoL)
  doc.setLineWidth(0.35)
  doc.line(x, y + 1.4, x + w, y + 1.4)
  return y + 7
}

function hrule(doc, x, y, w, color = C.s200) {
  doc.setDrawColor(color)
  doc.setLineWidth(0.2)
  doc.line(x, y, x + w, y)
}

const SKILL_FILTER = {
  'Lenguajes & Frameworks': ['C#', '.NET Core', 'ASP.NET Core', 'JavaScript', 'Angular'],
  'Bases de Datos':         ['SQL Server', 'OracleDB', 'MongoDB', 'PostgreSQL'],
  'Cloud & DevOps':         ['Azure Functions', 'Azure DevOps', 'CI/CD', 'Git'],
  'Arquitectura':           ['APIs REST', 'Clean Architecture', 'Microservicios', 'Patrones de diseño'],
}

export async function generateCVPdf(cv) {
  const photoDataUrl = await circularPhoto('/foto.png', 300)

  const doc  = new jsPDF({ format: 'a4', unit: 'mm' })
  const PW   = 210, PH = 297
  const ML   = 15           // horizontal margin
  const HDR  = 50           // header height
  const MT   = HDR + 10     // body top
  const MB   = 12           // footer clearance
  const CW   = PW - ML * 2  // 180mm
  const LC   = 62           // left col
  const GAP  = 9
  const RC   = CW - LC - GAP
  const RX   = ML + LC + GAP
  const PD   = 30           // photo diameter mm
  const PCX  = PW - ML - PD / 2
  const PCY  = HDR / 2

  // ── HEADER ─────────────────────────────────────────────────────────────────
  doc.setFillColor(C.indigo)
  doc.rect(0, 0, PW, HDR, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(23)
  doc.setTextColor(C.white)
  doc.text(cv.name || '', ML, 16)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10.5)
  doc.setTextColor(C.indigoP)
  doc.text(cv.title || '', ML, 26)

  doc.setFontSize(9)
  doc.setTextColor('#e0e7ff')
  doc.text([cv.contact?.email, cv.contact?.phone, cv.contact?.location].filter(Boolean).join('   ·   '), ML, 35)

  if (cv.contact?.linkedin) {
    doc.setFontSize(8.5)
    doc.setTextColor(C.indigoP)
    doc.text(`in  ${cv.contact.linkedin}`, ML, 43)
  }

  if (photoDataUrl) {
    doc.setFillColor(C.white)
    doc.circle(PCX, PCY, PD / 2 + 1, 'F')
    doc.addImage(photoDataUrl, 'PNG', PCX - PD / 2, PCY - PD / 2, PD, PD)
  }

  // ── LEFT COLUMN ────────────────────────────────────────────────────────────
  let ly = MT

  // Profile — 2 sentences
  ly = sLabel(doc, 'Perfil', ML, ly, LC)
  const profileText = (cv.profile || '').split('.').slice(0, 2).join('.') + '.'
  ly = wt(doc, profileText, ML, ly, LC, { sz: 9, color: C.s600, lh: 4.5 })
  ly += 8

  // Skills
  ly = sLabel(doc, 'Habilidades', ML, ly, LC)
  for (const cat of cv.skills || []) {
    const items = SKILL_FILTER[cat.category] || cat.items
    ly = wt(doc, cat.category, ML, ly, LC, { sz: 8.5, color: C.s700, style: 'bold', lh: 4.5 })
    ly = wt(doc, items.join('  ·  '), ML, ly, LC, { sz: 8.5, color: C.s500, lh: 4 })
    ly += 4
  }
  ly += 4

  // Education
  ly = sLabel(doc, 'Educación', ML, ly, LC)
  for (const edu of cv.education || []) {
    if (edu.type === 'degree') {
      ly = wt(doc, edu.degree, ML, ly, LC, { sz: 9.5, color: C.s900, style: 'bold', lh: 4.5 })
      if (edu.institution) {
        ly = wt(doc, edu.institution, ML, ly, LC, { sz: 8.5, color: C.s500, lh: 4 })
      }
      if (edu.period) {
        doc.setFont('helvetica', 'italic')
        doc.setFontSize(8.5)
        doc.setTextColor(C.indigoL)
        doc.text(edu.period, ML, ly)
        ly += 9
      }
    }
  }
  ly = wt(doc, 'Formación continua en .NET, Azure, SQL y Arquitectura de software.',
    ML, ly, LC, { sz: 8.5, color: C.s500, lh: 4 })

  // ── RIGHT COLUMN ───────────────────────────────────────────────────────────
  let ry = MT

  // Experience
  ry = sLabel(doc, 'Experiencia', RX, ry, RC)

  const mainJobs  = (cv.experience || []).slice(0, 2)
  const minorJobs = (cv.experience || []).slice(2)

  for (const exp of mainJobs) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(C.s900)
    doc.text(exp.role || '', RX, ry)
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(9)
    doc.setTextColor(C.s400)
    doc.text(exp.period || '', PW - ML, ry, { align: 'right' })
    ry += 5

    const co = [exp.company, exp.client && `· ${exp.client}`, exp.industry && `| ${exp.industry}`]
      .filter(Boolean).join('  ')
    ry = wt(doc, co, RX, ry, RC, { sz: 9.5, color: C.indigoL, lh: 4.5 })
    ry += 2

    for (const r of (exp.responsibilities || []).slice(0, 4)) {
      const lines = doc.splitTextToSize(`• ${r}`, RC - 3)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.setTextColor(C.s600)
      doc.text(lines, RX + 3, ry)
      ry += lines.length * 4.2
    }

    if (exp.technologies?.length) {
      ry += 2
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8.5)
      doc.setTextColor(C.indigoL)
      doc.text(exp.technologies.slice(0, 6).join('  ·  '), RX, ry)
      ry += 4
    }

    hrule(doc, RX, ry + 2, RC)
    ry += 9
  }

  // Minor jobs — compact with 2 bullets
  for (const exp of minorJobs) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(C.s700)
    doc.text(`${exp.role}  —  ${exp.company}`, RX, ry)
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(9)
    doc.setTextColor(C.s400)
    doc.text(exp.period || '', PW - ML, ry, { align: 'right' })
    ry += 5

    for (const r of (exp.responsibilities || []).slice(0, 2)) {
      const lines = doc.splitTextToSize(`• ${r}`, RC - 3)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.setTextColor(C.s500)
      doc.text(lines, RX + 3, ry)
      ry += lines.length * 4.2
    }
    ry += 3
  }

  hrule(doc, RX, ry, RC)
  ry += 8

  // Projects — 3, with 1-line description
  ry = sLabel(doc, 'Proyectos Destacados', RX, ry, RC)
  for (const proj of (cv.projects || []).slice(0, 3)) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(C.s900)
    doc.text(proj.title || '', RX, ry)
    ry += 4.5

    // 1-line description
    const desc = (proj.description || '').split('.')[0] + '.'
    ry = wt(doc, desc, RX, ry, RC, { sz: 9, color: C.s600, lh: 4.2 })
    ry += 1.5

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.setTextColor(C.indigoL)
    doc.text((proj.technologies || []).join('  ·  '), RX, ry)
    ry += 8
  }

  // ── FOOTER ─────────────────────────────────────────────────────────────────
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(C.s400)
  doc.text(`${cv.name}  ·  CV`, PW / 2, PH - 8, { align: 'center' })

  doc.save('Marcelo_Torres_CV.pdf')
}
