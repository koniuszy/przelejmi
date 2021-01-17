import React from 'react'

import { Button } from '@chakra-ui/react'
import { addDays, getYear } from 'date-fns'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import Head from 'next/head'

const messages = {
  pl: {
    header: {
      invoiceId: { text: 'Faktura ID', x: 10, y: 13 },
      issueDate: { text: 'Data wystawienia', x: 10, y: 20 },
      saleDate: { text: 'Data sprzedazy', x: 10, y: 25 },
      dueDate: { text: 'Termin platnosci', x: 10, y: 30 },
      paymentType: { text: 'Platnosc', x: 10, y: 35 },
    },
    contractors: {
      seller: {
        title: { text: 'Sprzedawca', x: 10, y: 45 },
        name: { text: '', x: 10, y: 50 },
        address: { text: '', x: 10, y: 55 },
        postAddress: { text: '', x: 10, y: 59 },
        nip: { text: '', x: 10, y: 64 },
        email: { text: '', x: 10, y: 69 },
        bankName: { text: '', x: 10, y: 74 },
        bankAccount: { text: '', x: 10, y: 78 },
      },
      buyer: {
        title: { text: 'Nabywca', x: 100, y: 45 },
        name: { text: '', x: 100, y: 50 },
        address: { text: '', x: 100, y: 55 },
        postAddress: { text: '', x: 100, y: 59 },
        nip: { text: '', x: 100, y: 64 },
      },
    },
    table: [
      [
        'LP',
        'Nazwa uslugi/towaru',
        'Ilosc',
        'Cena netto',
        'Wartosc netto',
        'VAT %',
        'Wartosc VAT',
        'Wartosc brutto',
      ],
    ],
    body: {
      totalNet: { text: 'Wartosc netto', x: 150, y: 100 },
      totalVat: { text: 'Wartosc VAT', x: 150, y: 110 },
      totalGross: { text: 'Wartosc brutto', x: 150, y: 120 },
    },
  },

  'pl/en': {
    invoiceId: 'Invoice ID',
    issueDate: 'Issue date',
    saleDate: 'Sale date',
    dueDate: 'Due date',
    paymentType: 'Payment type',
  },
}

const config = {
  header: {
    offset: 25,
  },
}

function getInvoiceValues() {
  const date = new Date()

  return {
    header: {
      invoiceId: `1-${date.getMonth()}/${getYear(date)}`,
      issueDate: `Poznan, ${date.toLocaleDateString()}`,
      saleDate: date.toLocaleDateString(),
      dueDate: addDays(date, 7).toLocaleDateString(),
      paymentType: 'Transfer',
    },
    contractors: {
      seller: {
        title: '',
        name: 'VIKING HOUSE SP Z 0 0',
        address: 'os. Stefana Batorego 39/12',
        postAddress: '60-687 Poznan, Polska / Poland',
        nip: 'NIP / VAT ID 7811999024',
        email: 'vikinghouseinvestments@gmail.com',
        bankName: 'mBank',
        bankAccount: 'PL 30 1140 2004 0000 3802 7928 6778',
      },
      buyer: {
        title: '',
        name: 'Akwadrat Sp. z o.o.',
        address: 'ul. Sw. Michala 100',
        postAddress: '61-005 Poznan, Polska / Poland',
        nip: 'NIP / VAT ID 7822594822',
      },
    },
    table: {
      body: [
        [
          '1',
          'Prowizja zgodnie z umowa',
          '1',
          '12 139,09',
          '12 139,09',
          '23',
          '2 791,99',
          '14 931,08',
        ],
      ],
      foot: [[null, null, null, '12 139,09', null, null, '2 791,99', '14 931,08']],
    },
    body: {
      totalNet: { text: 'Wartosc netto', x: 150, y: 100 },
      totalVat: { text: 'Wartosc VAT', x: 150, y: 110 },
      totalGross: { text: 'Wartosc brutto', x: 150, y: 120 },
    },
  }
}

function handleDownloadPdf() {
  const doc = new jsPDF()
  const language = 'pl'
  const translatedMessages = messages[language]
  const invoiceValues = getInvoiceValues()

  doc.setFontSize(8)
  Object.entries(translatedMessages.header).forEach((entry) => {
    const [key, value] = entry
    doc.setFont('Roboto', 'normal', '700')
    doc.text(`${value.text}:`, value.x, value.y)

    doc.setFont('Roboto', 'normal', '500')
    doc.text(invoiceValues.header[key], value.x + config.header.offset, value.y)
  })

  doc.line(10, 39, 200, 39)
  doc.line(10, 40, 200, 40)

  Object.entries(translatedMessages.contractors.seller).forEach((entry) => {
    const [key, value] = entry
    doc.setFont('Roboto', 'normal', '700')
    doc.text(value.text, value.x, value.y)

    doc.setFont('Roboto', 'normal', '500')
    doc.text(invoiceValues.contractors.seller[key], value.x, value.y)
  })

  Object.entries(translatedMessages.contractors.buyer).forEach((entry) => {
    const [key, value] = entry
    doc.setFont('Roboto', 'normal', '700')
    doc.text(value.text, value.x, value.y)

    doc.setFont('Roboto', 'normal', '500')
    doc.text(invoiceValues.contractors.buyer[key], value.x, value.y)
  })

  autoTable(doc, {
    head: translatedMessages.table,
    body: invoiceValues.table.body,
    foot: invoiceValues.table.foot,
    footStyles: {
      fillColor: null,
      fontStyle: 'bold',
      halign: 'right',
      textColor: 20,
    },
    bodyStyles: {
      halign: 'right',
      fontSize: 8,
      lineWidth: 0.2,
      lineColor: '#222',
    },
    headStyles: {
      halign: 'right',
      fontSize: 10,
      lineWidth: 0.2,
      lineColor: '#222',
    },
    startY: 85,
    margin: 10,
  })

  doc.save('invoice.pdf')
}

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Button onClick={handleDownloadPdf} colorScheme="teal" size="lg">
          Download
        </Button>
      </main>
    </div>
  )
}
