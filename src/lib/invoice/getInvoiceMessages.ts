export default function getMessages({
  columnsCount,
  columnsHeight,
}: {
  columnsHeight: number
  columnsCount: number
}) {
  const headerYOffset = 13
  const headerXOffset = 10

  const header = {
    invoiceId: { text: 'Faktura ID', x: headerXOffset, y: headerYOffset },
    issueDate: { text: 'Data wystawienia', x: headerXOffset, y: headerYOffset + 7 },
    saleDate: { text: 'Data sprzedazy', x: headerXOffset, y: headerYOffset + 13 },
    dueDate: { text: 'Termin platności', x: headerXOffset, y: headerYOffset + 18 },
    paymentType: { text: 'Platność', x: headerXOffset, y: headerYOffset + 23 },
  }
  const contractorsYOffset = 45
  const contractorsXOffset = 10

  const contractors = {
    merchant: {
      title: { text: 'Sprzedawca', x: contractorsXOffset, y: contractorsYOffset },
      name: { text: '', x: contractorsXOffset, y: contractorsYOffset + 5 },
      address: { text: '', x: contractorsXOffset, y: contractorsYOffset + 10 },
      postAddress: { text: '', x: contractorsXOffset, y: contractorsYOffset + 14 },
      VATId: { text: '', x: contractorsXOffset, y: contractorsYOffset + 19 },
      email: { text: '', x: contractorsXOffset, y: contractorsYOffset + 24 },
      bankName: { text: '', x: contractorsXOffset, y: contractorsYOffset + 29 },
      bankAccount: { text: '', x: contractorsXOffset, y: contractorsYOffset + 33 },
    },
    buyer: {
      title: { text: 'Nabywca', x: contractorsXOffset + 90, y: 45 },
      name: { text: '', x: contractorsXOffset + 90, y: 50 },
      address: { text: '', x: contractorsXOffset + 90, y: 55 },
      postAddress: { text: '', x: contractorsXOffset + 90, y: 59 },
      VATId: { text: '', x: contractorsXOffset + 90, y: 64 },
    },
  }

  const bodyYOffset = 102 + columnsCount * columnsHeight
  const bodyXOffset = 150

  const body = {
    totalNet: { text: 'Wartość netto', x: bodyXOffset, y: bodyYOffset },
    totalVat: { text: 'Wartość VAT', x: bodyXOffset, y: bodyYOffset + 5 },
    totalGross: { text: 'Wartość brutto', x: bodyXOffset, y: bodyYOffset + 10 },
  }
  return {
    pl: {
      header,
      contractors,
      body,
      table: {
        head: [
          'LP',
          'Nazwa uslugi/towaru',
          'Ilość',
          'Cena netto',
          'Wartość netto',
          'VAT %',
          'Wartość VAT',
          'Wartość brutto',
        ],
      },
      footer: {
        title: 'Do zapłaty',
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
}
