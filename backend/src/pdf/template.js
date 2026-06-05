const buildDocDefinition = (cv) => {
  const INDIGO = '#4f46e5'
  const INDIGO_LIGHT = '#6366f1'
  const INDIGO_PALE = '#eef2ff'
  const CYAN = '#0891b2'
  const SLATE_900 = '#0f172a'
  const SLATE_700 = '#334155'
  const SLATE_500 = '#64748b'
  const SLATE_400 = '#94a3b8'
  const SLATE_100 = '#f1f5f9'
  const WHITE = '#ffffff'

  const sectionTitle = (text) => ({
    stack: [
      {
        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1, lineColor: '#e2e8f0' }],
        margin: [0, 0, 0, 6],
      },
      { text: text.toUpperCase(), fontSize: 8.5, bold: true, color: INDIGO, characterSpacing: 1.5, margin: [0, 0, 0, 8] },
    ],
    margin: [0, 10, 0, 0],
  })

  const experienceItems = cv.experience.map((exp) => ({
    stack: [
      {
        columns: [
          { text: exp.role, fontSize: 11, bold: true, color: SLATE_900, width: '*' },
          { text: exp.period, fontSize: 9, color: SLATE_400, italics: true, width: 'auto', alignment: 'right' },
        ],
        margin: [0, 0, 0, 2],
      },
      {
        text: [
          { text: exp.company, color: INDIGO_LIGHT, bold: true },
          exp.client ? { text: ` · ${exp.client}`, color: SLATE_500 } : '',
          exp.industry ? { text: `  |  ${exp.industry}`, color: SLATE_400, fontSize: 8.5 } : '',
        ],
        fontSize: 10,
        margin: [0, 0, 0, 5],
      },
      {
        ul: exp.responsibilities,
        color: SLATE_700,
        fontSize: 9.5,
        lineHeight: 1.45,
        margin: [0, 0, 0, 5],
      },
      exp.technologies && exp.technologies.length > 0
        ? {
            text: exp.technologies.join('  ·  '),
            fontSize: 8.5,
            color: INDIGO_LIGHT,
            margin: [0, 2, 0, 0],
          }
        : {},
    ],
    margin: [0, 0, 0, 14],
  }))

  const projectItems = cv.projects.map((proj) => ({
    stack: [
      { text: proj.title, fontSize: 10.5, bold: true, color: SLATE_900, margin: [0, 0, 0, 2] },
      { text: proj.description, fontSize: 9, color: SLATE_700, lineHeight: 1.4, margin: [0, 0, 0, 3] },
      { text: proj.technologies.join('  ·  '), fontSize: 8.5, color: INDIGO_LIGHT },
    ],
    margin: [0, 0, 0, 10],
  }))

  const skillItems = cv.skills.flatMap((cat) => [
    { text: cat.category, fontSize: 9, bold: true, color: SLATE_700, margin: [0, 6, 0, 3] },
    { text: cat.items.join('  ·  '), fontSize: 9, color: SLATE_500, lineHeight: 1.45 },
  ])

  const educationItems = cv.education.map((edu) => ({
    stack: [
      { text: edu.degree, fontSize: 10, bold: true, color: SLATE_900, margin: [0, 0, 0, 2] },
      edu.institution ? { text: edu.institution, fontSize: 9, color: SLATE_500 } : {},
      edu.period ? { text: edu.period, fontSize: 8.5, color: INDIGO_LIGHT, italics: true, margin: [0, 1, 0, 0] } : {},
    ],
    margin: [0, 0, 0, 10],
  }))

  return {
    pageSize: 'A4',
    pageMargins: [0, 0, 0, 30],
    defaultStyle: { font: 'Roboto' },

    content: [
      // ── Header ──────────────────────────────────────────────────────────────
      {
        table: {
          widths: ['*'],
          body: [
            [
              {
                fillColor: INDIGO,
                border: [false, false, false, false],
                stack: [
                  { text: cv.name, fontSize: 26, bold: true, color: WHITE, margin: [0, 0, 0, 4] },
                  { text: cv.title, fontSize: 11.5, color: '#c7d2fe', margin: [0, 0, 0, 10] },
                  {
                    columns: [
                      cv.contact?.email
                        ? { text: `✉  ${cv.contact.email}`, fontSize: 9, color: '#e0e7ff', width: 'auto' }
                        : {},
                      { text: '   ', width: 20 },
                      cv.contact?.location
                        ? { text: `📍  ${cv.contact.location}`, fontSize: 9, color: '#e0e7ff', width: 'auto' }
                        : {},
                      { text: '   ', width: 20 },
                      cv.contact?.linkedin
                        ? { text: `in  ${cv.contact.linkedin}`, fontSize: 9, color: '#e0e7ff', width: 'auto' }
                        : {},
                    ],
                  },
                ],
                margin: [40, 28, 40, 28],
              },
            ],
          ],
        },
        layout: 'noBorders',
      },

      // ── Body: two columns ───────────────────────────────────────────────────
      {
        margin: [40, 20, 40, 0],
        columns: [
          // Left column (38%)
          {
            width: '38%',
            stack: [
              // Profile
              { text: 'PERFIL', fontSize: 8.5, bold: true, color: INDIGO, characterSpacing: 1.5, margin: [0, 0, 0, 6] },
              { text: cv.profile, fontSize: 9.5, color: SLATE_700, lineHeight: 1.5, margin: [0, 0, 0, 14] },

              // Skills
              { text: 'HABILIDADES', fontSize: 8.5, bold: true, color: INDIGO, characterSpacing: 1.5, margin: [0, 0, 0, 6] },
              ...skillItems,

              // Education
              { text: 'EDUCACIÓN', fontSize: 8.5, bold: true, color: INDIGO, characterSpacing: 1.5, margin: [0, 16, 0, 8] },
              ...educationItems,
            ],
          },

          // Gap
          { width: '4%', stack: [] },

          // Right column (58%)
          {
            width: '58%',
            stack: [
              { text: 'EXPERIENCIA', fontSize: 8.5, bold: true, color: INDIGO, characterSpacing: 1.5, margin: [0, 0, 0, 8] },
              ...experienceItems,
              { text: 'PROYECTOS', fontSize: 8.5, bold: true, color: INDIGO, characterSpacing: 1.5, margin: [0, 6, 0, 8] },
              ...projectItems,
            ],
          },
        ],
      },
    ],

    footer: (currentPage, pageCount) => ({
      text: `${cv.name}  ·  CV  ·  Página ${currentPage} de ${pageCount}`,
      alignment: 'center',
      fontSize: 8,
      color: SLATE_400,
      margin: [0, 10, 0, 0],
    }),
  }
}

module.exports = buildDocDefinition
