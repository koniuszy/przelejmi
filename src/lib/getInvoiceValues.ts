import { addDays, getYear } from 'date-fns'

export default function getInvoiceValues() {
  const date = new Date()

  const totalNetPerOne = 12139.09
  const totalVat = 2791.99
  const totalGross = 14931.08
  const amount = 1

  return {
    header: {
      invoiceId: `1-${date.getMonth()}/${getYear(date)}`,
      issueDate: `Poznan, ${date.toLocaleDateString()}`,
      saleDate: date.toLocaleDateString(),
      dueDate: addDays(date, 7).toLocaleDateString(),
      paymentType: 'Transfer',
    },
    contractors: {
      merchant: {
        title: '',
        name: 'VIKING HOUSE SP Z 0 0',
        address: 'os. Stefana Batorego 39/12',
        postAddress: '60-687 Poznan, Polska / Poland',
        VATId: 'NIP / VAT ID 7811999024',
        email: 'vikinghouseinvestments@gmail.com',
        bankName: 'mBank',
        bankAccount: 'PL 30 1140 2004 0000 3802 7928 6778',
      },
      buyer: {
        title: '',
        name: 'Akwadrat Sp. z o.o.',
        address: 'ul. Św. Michała 100',
        postAddress: '61-005 Poznan, Polska / Poland',
        VATId: 'NIP / VAT ID 7822594822',
      },
    },
    body: {
      totalNet: (totalNetPerOne * amount).toLocaleString('pl-PL', {
        style: 'currency',
        currency: 'PLN',
      }),
      totalVat: totalVat.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' }),
      totalGross: totalGross.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' }),
    },
    table: {
      body: [
        [
          '1',
          'Prowizja zgodnie z umową',
          amount,
          totalNetPerOne.toLocaleString('pl-PL'),
          (totalNetPerOne * amount).toLocaleString('pl-PL'),
          '23',
          totalVat.toLocaleString('pl-PL'),
          totalGross.toLocaleString('pl-PL'),
        ],
      ],
    },
  }
}
