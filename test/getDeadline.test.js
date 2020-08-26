const moment = require('moment-business-days')
const getDeadline = require('../utils/getDeadline')
const Mimetypes = require('../models/mimetype')
const Languages = require('../models/languages')

const cheapMimetype = Mimetypes.DOCX
const expensiveMimetype = Mimetypes.TXT
const cheapLanguage = Languages.RUSSIAN
const expensiveLanguage = Languages.ENGLISH   

describe('check deadline with negative number of characters', () => {
  expect(() => {
      getDeadline(cheapMimetype, new Date(2020, 7, 26, 2, 3), -99, cheapLanguage)
    }).toThrow(Error)
})

let nightDate = new Date(2020, 7, 26, 2, 3) //26.08.2020, 02:03
describe(`check deadline with 99 characters and night date: ${moment(nightDate).format('Do MMM YYYY [at] H:mm')}`, () => {
  test('with cheap mimetype and language', () => {
    expect(getDeadline(cheapMimetype, nightDate, 99, cheapLanguage))
      .toEqual(new Date(2020, 7, 26, 11, 30))
  })
  
  test('with cheap mimetype and expensive language', () => {
    expect(getDeadline(cheapMimetype, nightDate, 99, expensiveLanguage))
      .toEqual(new Date(2020, 7, 26, 11, 30))
  })
  
  test('with expensive mimetype and language', () => {
    expect(getDeadline(expensiveMimetype, nightDate, 99, expensiveLanguage))
      .toEqual(new Date(2020, 7, 26, 11, 30))
  })
  
  test('with expensive mimetype and cheap language', () => {
    expect(getDeadline(expensiveMimetype, nightDate, 99, cheapLanguage))
      .toEqual(new Date(2020, 7, 26, 11, 30))
  })
})

let lunchDate = new Date(2020, 7, 26, 13, 49) //26.08.2020, 13:49
describe(`check deadline with 999 characters and lunch date: ${moment(lunchDate).format('Do MMM YYYY [at] H:mm')}`, () => {
  test('with cheap mimetype and language', () => {
    expect(getDeadline(cheapMimetype, lunchDate, 999, cheapLanguage))
      .toEqual(new Date(2020, 7, 26, 15, 19))
  })
  
  test('with cheap mimetype and expensive language', () => {
    expect(getDeadline(cheapMimetype, lunchDate, 999, expensiveLanguage))
      .toEqual(new Date(2020, 7, 26, 17, 19))
  })
  
  test('with expensive mimetype and language', () => {
    expect(getDeadline(expensiveMimetype, lunchDate, 999, expensiveLanguage))
      .toEqual(new Date(2020, 7, 26, 17, 55))
  })
  
  test('with expensive mimetype and cheap language', () => {
    expect(getDeadline(expensiveMimetype, lunchDate, 999, cheapLanguage))
      .toEqual(new Date(2020, 7, 26, 15, 19))
  })
})

let fridayEveningDate = new Date(2020, 7, 28, 18, 14) //28.08.2020, 18:14
describe(`check deadline with 9999 characters and friday evening date: ${moment(fridayEveningDate).format('Do MMM YYYY [at] H:mm')}`, () => {
  test('with cheap mimetype and language', () => {
    expect(getDeadline(cheapMimetype, fridayEveningDate, 9999, cheapLanguage))
      .toEqual(new Date(2020, 7, 31, 17, 14))
  })
  
  test('with cheap mimetype and expensive language', () => {
    expect(getDeadline(cheapMimetype, fridayEveningDate, 9999, expensiveLanguage))
      .toEqual(new Date(2020, 8, 3, 12, 45))
  })
  
  test('with expensive mimetype and language', () => {
    expect(getDeadline(expensiveMimetype, fridayEveningDate, 9999, expensiveLanguage))
      .toEqual(new Date(2020, 8, 3, 18, 45)) //must be 46 min
  })
  
  test('with expensive mimetype and cheap language', () => {
    expect(getDeadline(expensiveMimetype, fridayEveningDate, 9999, cheapLanguage))
      .toEqual(new Date(2020, 7, 31, 18, 44))
  })
})

let lastEveningDate = new Date(2020, 7, 26, 23, 30) //26.08.2020, 23:30
describe(`check deadline with 9999 characters and last evening date: ${moment(lastEveningDate).format('Do MMM YYYY [at] H:mm')}`, () => {
  test('with cheap mimetype and language', () => {
    expect(getDeadline(cheapMimetype, lastEveningDate, 9999, cheapLanguage))
      .toEqual(new Date(2020, 7, 27, 18, 0))
  })
  
  test('with cheap mimetype and expensive language', () => {
    expect(getDeadline(cheapMimetype, lastEveningDate, 9999, expensiveLanguage))
      .toEqual(new Date(2020, 8, 1, 13, 31))
  })
  
  test('with expensive mimetype and language', () => {
    expect(getDeadline(expensiveMimetype, lastEveningDate, 9999, expensiveLanguage))
      .toEqual(new Date(2020, 8, 2, 10, 31)) 
  })
  
  test('with expensive mimetype and cheap language', () => {
    expect(getDeadline(expensiveMimetype, lastEveningDate, 9999, cheapLanguage))
      .toEqual(new Date(2020, 7, 28, 10, 30))
  })
})

describe('check deadline with another language', () => {
  expect(() => {
      getDeadline(expensiveMimetype, new Date(2020, 7, 26, 2, 3), 999, 'chinese')
    }).toThrow(Error)
})

