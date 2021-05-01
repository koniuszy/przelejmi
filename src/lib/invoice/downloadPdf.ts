import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

import RobotoBold from 'src/fonts/RobotoBold'
import RobotoNormal from 'src/fonts/RobotoNormal'
import getInvoiceMessages from 'src/lib/invoice/getInvoiceMessages'
import getInvoiceValues from 'src/lib/invoice/getInvoiceValues'

const config = {
  header: {
    offset: 25,
  },
}

export default function downloadPdf({ language }: { language: 'pl' }) {
  const doc = new jsPDF()
  const columnsCount = 1
  const columnsHeight = 5
  const translatedMessages = getInvoiceMessages({ columnsCount, columnsHeight })[language]
  const invoiceValues = getInvoiceValues()

  doc.line(10, 39, 200, 39)
  doc.line(10, 40, 200, 40)

  const lineYOffset = 120 + columnsCount * columnsHeight
  doc.line(10, lineYOffset, 200, lineYOffset)
  doc.line(10, lineYOffset + 1, 200, lineYOffset + 1)

  doc.setFontSize(8)

  doc.addFileToVFS('RobotoBold.ttf', RobotoBold)
  doc.addFont('RobotoBold.ttf', 'RobotoBold', 'normal')

  doc.addFileToVFS('RobotoNormal.ttf', RobotoNormal)
  doc.addFont('RobotoNormal.ttf', 'RobotoNormal', 'normal')

  doc.setFont('RobotoNormal')
  doc.text(invoiceValues.body.totalGross, 30, lineYOffset + 8)
  doc.setFont('RobotoBold')
  doc.text(translatedMessages.footer.title, 10, lineYOffset + 8)

  Object.entries(translatedMessages.body).forEach((entry) => {
    const [key, value] = entry

    doc.text(value.text, value.x, value.y)

    doc.text(invoiceValues.body[key], 200, value.y, { align: 'right' })
  })

  Object.entries(translatedMessages.header).forEach((entry) => {
    const [key, value] = entry
    doc.setFont('RobotoBold')
    doc.text(`${value.text}:`, value.x, value.y)

    doc.setFont('RobotoNormal')
    doc.text(invoiceValues.header[key], value.x + config.header.offset, value.y)
  })

  Object.entries(translatedMessages.contractors.merchant).forEach((entry) => {
    const [key, value] = entry
    doc.setFont('RobotoBold')
    doc.text(value.text, value.x, value.y)

    doc.setFont('RobotoNormal')
    doc.text(invoiceValues.contractors.merchant[key], value.x, value.y)
  })

  Object.entries(translatedMessages.contractors.buyer).forEach((entry) => {
    const [key, value] = entry
    doc.setFont('RobotoBold')
    doc.text(value.text, value.x, value.y)

    doc.setFont('RobotoNormal')
    doc.text(invoiceValues.contractors.buyer[key], value.x, value.y)
  })

  autoTable(doc, {
    body: invoiceValues.table.body,
    columns: translatedMessages.table.head.map((item, index) => ({
      header: item,
      dataKey: `dataKey${index}`,
    })),
    columnStyles: { dataKey0: { halign: 'left' }, dataKey1: { halign: 'left' } },
    footStyles: {
      fillColor: null,
      fontStyle: 'bold',
      font: 'RobotoNormal',
      halign: 'right',
      textColor: 20,
    },
    bodyStyles: {
      font: 'RobotoNormal',
      halign: 'right',
      fontSize: 8,
      lineWidth: 0.2,
      lineColor: '#222',
    },
    headStyles: {
      font: 'RobotoNormal',
      halign: 'center',
      fontSize: 8,
      fontStyle: 'bold',
      lineWidth: 0.2,
      lineColor: '#222',
    },
    startY: 85,
    margin: 10,
  })

  doc.save('invoice.pdf')
}
