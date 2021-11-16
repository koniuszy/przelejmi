export default function convertCurrencyToWordsEN(
  value: number,
  lang = 'pl',
  currency = 'PLN'
): string {
  // eslint-disable-next-line no-param-reassign
  value = Math.floor(value)

  const ones = [
    '',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
  ]
  const tens = [
    '',
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ]

  const numString = value.toString()

  if (value < 0) throw new Error('Negative numbers are not supported.')

  if (value === 0) return 'zero'

  if (value < 20) {
    return ones[value]
  }

  if (numString.length === 2) {
    return tens[Number(numString[0])] + ' ' + ones[Number(numString[1])]
  }

  if (numString.length === 3) {
    if (numString[1] === '0' && numString[2] === '0') return ones[Number(numString[0])] + ' hundred'
    else
      return (
        ones[Number(numString[0])] +
        ' hundred and ' +
        convertCurrencyToWordsEN(Number(numString[1] + numString[2]))
      )
  }

  if (numString.length === 4) {
    const end = Number(numString[1] + numString[2] + numString[3])
    if (end === 0) return ones[Number(numString[0])] + ' thousand'
    if (end < 100)
      return ones[Number(numString[0])] + ' thousand and ' + convertCurrencyToWordsEN(end)
    return ones[Number(numString[0])] + ' thousand ' + convertCurrencyToWordsEN(end)
  }

  return ''
}
