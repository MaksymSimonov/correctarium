const getPrice = require('../utils/getPrice')
const Mimetypes = require('../models/mimetype')
const Languages = require('../models/languages')

const cheapMimetype = Mimetypes.DOCX
const expensiveMimetype = Mimetypes.TXT
const cheapLanguage = Languages.RUSSIAN
const expensiveLanguage = Languages.ENGLISH   

describe('check price with negative number of characters', () => {
  expect(() => {
    getPrice(cheapMimetype, -99, cheapLanguage)
  }).toThrow(Error)
})

describe('check price with 0 characters', () => {
  test('with cheap mimetype and language', () => {
    expect(getPrice(cheapMimetype, 0, cheapLanguage)).toBe(0)
  })
})

describe('check price with 99 characters', () => {
  test('with cheap mimetype and language', () => {
    expect(getPrice(cheapMimetype, 99, cheapLanguage)).toBe(50)
  })

  test('with cheap mimetype and expensive language', () => {
    expect(getPrice(cheapMimetype, 99, expensiveLanguage)).toBe(120)
  })

  test('with expensive mimetype and language', () => {
    expect(getPrice(expensiveMimetype, 99, expensiveLanguage)).toBe(120)
  })

  test('with expensive mimetype and cheap language', () => {
    expect(getPrice(expensiveMimetype, 99, cheapLanguage)).toBe(50)
  })
})

describe('check price with 999 characters', () => {
  test('with cheap mimetype and language', () => {
    expect(getPrice(cheapMimetype, 999, cheapLanguage)).toBe(50) // because 49.95 < 50
  })

  test('with cheap mimetype and expensive language', () => {
    expect(getPrice(cheapMimetype, 999, expensiveLanguage)).toBe(120) // because 119.88 < 120
  })

  test('with expensive mimetype and language', () => {
    expect(getPrice(expensiveMimetype, 999, expensiveLanguage)).toBe(143.86)
  })

  test('with expensive mimetype and cheap language', () => {
    expect(getPrice(expensiveMimetype, 999, cheapLanguage)).toBe(59.94)
  })
})

describe('check price with 9999 characters', () => {
  test('with cheap mimetype and language', () => {
    expect(getPrice(cheapMimetype, 9999, cheapLanguage)).toBe(499.95) 
  })

  test('with cheap mimetype and expensive language', () => {
    expect(getPrice(cheapMimetype, 9999, expensiveLanguage)).toBe(1199.88) 
  })

  test('with expensive mimetype and language', () => {
    expect(getPrice(expensiveMimetype, 9999, expensiveLanguage)).toBe(1439.86)
  })

  test('with expensive mimetype and cheap language', () => {
    expect(getPrice(expensiveMimetype, 9999, cheapLanguage)).toBe(599.94)
  })
})

describe('check price with 500000 characters', () => {
  test('with cheap mimetype and language', () => {
    expect(getPrice(cheapMimetype, 500000, cheapLanguage)).toBe(25000) 
  })
  
  test('with cheap mimetype and expensive language', () => {
    expect(getPrice(cheapMimetype, 500000, expensiveLanguage)).toBe(60000)    
  })
  
  test('with expensive mimetype and language', () => {
    expect(getPrice(expensiveMimetype, 500000, expensiveLanguage)).toBe(72000)
  })
  
  test('with expensive mimetype and cheap language', () => {
    expect(getPrice(expensiveMimetype, 500000, cheapLanguage)).toBe(30000)
  })
})

describe('check price with another language', () => {
  expect(() => {
    getPrice(cheapMimetype, 999, 'chinese')
  }).toThrow(Error)
})