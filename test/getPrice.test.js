const Mimetypes = require('../models/mimetype')
const {
    choosePriceForSymbol,
    calculatePercent,
    calculateResultPrice
  } = require('../utils/getPrice')

describe('choosePriceForSymbol', () => {
  test.each`
    language     | result
    ${'ru'}      | ${0.05}
    ${'uk'}      | ${0.05}
    ${'en'}      | ${0.12}   
  `('choosePriceForSymbol__table', ({ language, result }) => {
    expect(choosePriceForSymbol(language)).toBe(result)
  })
})

describe('choosePriceForSymbolWithAnotherLanguage', () => {
  expect(() => {
    test.each`
      language     | result
      ${undefined} | ${Error}
    `('choosePriceForSymbolWithAnotherLanguage__table', ({ language, result }) => {
      expect(() => {
        chooseSpeed(language)
      }).toThrow(result)
    })
  })
})

describe('calculatePercent', () => {
  test.each`
    price  | mimetype          | result
    ${100} | ${Mimetypes.DOC}  | ${100}
    ${100} | ${Mimetypes.DOCX} | ${100}
    ${100} | ${Mimetypes.RTF}  | ${100}
    ${100} | ${Mimetypes.PDF}  | ${120}
    ${100} | ${undefined}      | ${120}
  `('calculatePercent__table', ({ price, mimetype, result }) => {
    expect(calculatePercent(price, mimetype)).toBe(result)
  })
})

describe('calculateResultPrice', () => {
  test.each`
    characters | language | priceForSymbol | mimetype          | result
    ${1000}    | ${'ru'}  | ${0.05}        | ${Mimetypes.DOC}  | ${50}
    ${1000}    | ${'uk'}  | ${0.05}        | ${Mimetypes.DOCX} | ${50}
    ${1000}    | ${'en'}  | ${0.12}        | ${Mimetypes.DOC}  | ${120}
    ${10000}   | ${'en'}  | ${0.12}        | ${Mimetypes.DOC}  | ${1200}
    ${10000}   | ${'en'}  | ${0.12}        | ${Mimetypes.PDF}  | ${1440}
    ${10000}   | ${'uk'}  | ${0.05}        | ${Mimetypes.PDF}  | ${600}
    ${10000}   | ${'uk'}  | ${0.05}        | ${undefined}      | ${600}
  `(
    'calculateResultPrice__table',
    ({ characters, language, priceForSymbol, mimetype, result }) => {
      expect(calculateResultPrice(mimetype, characters, language, priceForSymbol)).toBe(
        result,
      )
    },
  )
})