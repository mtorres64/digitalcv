const CV = require('../models/cv.model')
const buildDocDefinition = require('../pdf/template')

const getCVData = async (req, res) => {
  try {
    const cv = await CV.findOne().sort({ createdAt: -1 })
    if (!cv) {
      return res.status(404).json({ message: 'CV data not found. Run: npm run seed' })
    }
    res.json(cv)
  } catch (error) {
    console.error('Error fetching CV data:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

const generatePDF = async (req, res) => {
  try {
    const cv = await CV.findOne().sort({ createdAt: -1 })
    if (!cv) {
      return res.status(404).json({ message: 'CV data not found. Run: npm run seed' })
    }

    const PdfPrinter = require('pdfmake')
    const vfs = require('pdfmake/build/vfs_fonts')

    const fonts = {
      Roboto: {
        normal: Buffer.from(vfs['Roboto-Regular.ttf'], 'base64'),
        bold: Buffer.from(vfs['Roboto-Medium.ttf'], 'base64'),
        italics: Buffer.from(vfs['Roboto-Italic.ttf'], 'base64'),
        bolditalics: Buffer.from(vfs['Roboto-MediumItalic.ttf'], 'base64'),
      },
    }

    const printer = new PdfPrinter(fonts)
    const docDefinition = buildDocDefinition(cv)
    const pdfDoc = printer.createPdfKitDocument(docDefinition)

    const chunks = []
    pdfDoc.on('data', (chunk) => chunks.push(chunk))
    pdfDoc.on('end', () => {
      const pdfBuffer = Buffer.concat(chunks)
      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader('Content-Disposition', 'attachment; filename="Marcelo_Torres_CV.pdf"')
      res.setHeader('Content-Length', pdfBuffer.length)
      res.end(pdfBuffer)
    })
    pdfDoc.on('error', (err) => {
      console.error('PDF stream error:', err)
      res.status(500).json({ message: 'PDF generation failed', error: err.message })
    })

    pdfDoc.end()
  } catch (error) {
    console.error('Error generating PDF:', error)
    res.status(500).json({ message: 'Error generating PDF', error: error.message })
  }
}

module.exports = { getCVData, generatePDF }
