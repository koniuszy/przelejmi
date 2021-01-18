import convertNumberToWords from './convertNumbToWords'

describe('convertNumberToWords for english', () => {
  it('checks 0', () => {
    expect(convertNumberToWords(0, 'en')).toBe('zero')
  })
  it('checks 1', () => {
    expect(convertNumberToWords(1, 'en')).toBe('one')
  })
  it('checks 2', () => {
    expect(convertNumberToWords(2, 'en')).toBe('two')
  })
  it('checks 10', () => {
    expect(convertNumberToWords(10, 'en')).toBe('ten')
  })
  it('checks 11', () => {
    expect(convertNumberToWords(11, 'en')).toBe('eleven')
  })
  it('checks 100', () => {
    expect(convertNumberToWords(100, 'en')).toBe('one hundred')
  })
})

describe.only('convertNumberToWords for polish', () => {
  it('checks 0', () => {
    expect(convertNumberToWords(0, 'pl')).toBe('zero')
  })
  it('checks 1', () => {
    expect(convertNumberToWords(1, 'pl')).toBe('jeden')
  })
  it('checks 2', () => {
    expect(convertNumberToWords(2, 'pl')).toBe('dwa')
  })
  it('checks 10', () => {
    expect(convertNumberToWords(10, 'pl')).toBe('dziesięć')
  })
  it('checks 11', () => {
    expect(convertNumberToWords(11, 'pl')).toBe('jedynaście')
  })
  it('checks 100', () => {
    expect(convertNumberToWords(100, 'pl')).toBe('sto')
  })
})
