enum Vat {
  Percent_8,
  Percent_23,
  DoesNotConcern,
  Percent_0,
  Freed,
}

export function base64toBlob(base64Data, contentType = 'application/pdf') {
  const sliceSize = 1024
  const byteCharacters = atob(base64Data)
  const bytesLength = byteCharacters.length
  const slicesCount = Math.ceil(bytesLength / sliceSize)
  const byteArrays = new Array(slicesCount)

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize
    const end = Math.min(begin + sliceSize, bytesLength)

    const bytes = new Array(end - begin)

    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0)
    }

    byteArrays[sliceIndex] = new Uint8Array(bytes)
  }

  return new Blob(byteArrays, {
    type: contentType,
  })
}

export function mapVatToNumber(i: Vat) {
  switch (i) {
    case Vat.Percent_8:
      return 8

    case Vat.Percent_23:
      return 23

    case Vat.DoesNotConcern:
    case Vat.Percent_0:
    case Vat.Freed:
    default:
      return 0
  }
}

function getBusinessDatesCount(startDate: Date, endDate: Date) {
  let count = 0
  let curDate = startDate

  // eslint-disable-next-line no-unmodified-loop-condition
  while (curDate <= endDate) {
    let dayOfWeek = curDate.getDay()
    if (!(dayOfWeek === 6 || dayOfWeek === 0)) count++
    curDate.setDate(curDate.getDate() + 1)
  }

  return count
}

function daysInThisMonth() {
  let now = new Date()
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
}

export function getBusinessHoursInCurrentMonth() {
  const firstDayOfMonth = new Date(new Date().setDate(1))
  const lastDayOfMonth = new Date(new Date().setDate(daysInThisMonth()))

  return getBusinessDatesCount(firstDayOfMonth, lastDayOfMonth) * 8
}
