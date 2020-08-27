const moment = require('moment')
const Mimetypes = require('../models/mimetype')
const {
    chooseSpeed,
    calculatePercent,
    calculateWorkDuration,
    calculateResultDate,
  } = require('../utils/getDeadline')
  
describe('chooseSpeed', () => {
  test.each`
    language     | result
    ${'ru'}      | ${1333}
    ${'uk'}      | ${1333}
    ${'en'}      | ${333}   
  `('chooseSpeed__table', ({ language, result }) => {
    expect(chooseSpeed(language)).toBe(result)
  })
})

describe('chooseSpeedWithAnotherLanguage', () => {
  expect(() => {
    test.each`
      language     | result
      ${undefined} | ${Error}
    `('chooseSpeedWithAnotherLanguage__table', ({ language, result }) => {
      expect(() => {
        chooseSpeed(language)
      }).toThrow(result)
    })
  })
})
  
describe('calculatePercent', () => {
  test.each`
    time   | mimetype          | result
    ${100} | ${Mimetypes.DOC}  | ${100}
    ${100} | ${Mimetypes.DOCX} | ${100}
    ${100} | ${Mimetypes.RTF}  | ${100}
    ${100} | ${Mimetypes.PDF}  | ${120}
    ${100} | ${undefined}      | ${120}
  `('calculatePercent__table', ({ time, mimetype, result }) => {
    expect(calculatePercent(time, mimetype)).toBe(result)
  })
})

describe('calculateWorkDuration', () => {
  test.each`
    characters | speed   | mimetype          | duration
    ${999}     | ${333}  | ${Mimetypes.DOCX} | ${'3:30'}
    ${10000}   | ${1000} | ${Mimetypes.DOC}  | ${'10:30'}
    ${10000}   | ${1000} | ${Mimetypes.PDF}  | ${'12:36'}
    ${10000}   | ${1000} | ${undefined}      | ${'12:36'}
  `('calculateWorkDuration__table', ({ characters, speed, mimetype, duration }) => {
    const [h, m] = duration.split(':')
    const durationMs = (+h * 60 * 60 + +m * 60) * 1000
      
    expect(calculateWorkDuration(characters, speed, mimetype)).toBe(durationMs)
  })
})
  
describe('calculateResultDate', () => {
  test.each`
    startTime                        | durationHours | expectedResult
    ${'23/09/2019, 10:00 Monday'}    | ${5}          | ${'23/09/2019, 15:00 Monday'}
    ${'23/09/2019, 18:00 Monday'}    | ${7}          | ${'24/09/2019, 16:00 Tuesday'}
    ${'23/09/2019, 18:00 Monday'}    | ${25}         | ${'26/09/2019, 16:00 Thursday'}
    ${'21/09/2019, 15:00 Saturday'}  | ${7}          | ${'23/09/2019, 17:00 Monday'}
    ${'20/09/2019, 17:00 Friday'}    | ${60}         | ${'01/10/2019, 14:00 Tuesday'}
    ${'21/09/2019, 17:00 Saturday'}  | ${60}         | ${'01/10/2019, 16:00 Tuesday'}
    ${'24/09/2019, 08:00 Tuesday'}   | ${8}          | ${'24/09/2019, 18:00 Tuesday'}
    ${'25/09/2019, 08:00 Wednesday'} | ${8}          | ${'25/09/2019, 18:00 Wednesday'}
    ${'25/09/2019, 18:00 Wednesday'} | ${8}          | ${'26/09/2019, 17:00 Thursday'}
    ${'25/09/2019, 19:00 Wednesday'} | ${8}          | ${'26/09/2019, 18:00 Thursday'}
    ${'25/09/2019, 18:45 Wednesday'} | ${8}          | ${'26/09/2019, 17:45 Thursday'}
    ${'25/09/2019, 19:10 Wednesday'} | ${8}          | ${'26/09/2019, 18:00 Thursday'}
    ${'27/09/2019, 17:00 Friday'}    | ${8}          | ${'30/09/2019, 16:00 Monday'}
    ${'27/09/2019, 19:00 Friday'}    | ${8}          | ${'30/09/2019, 18:00 Monday'}
    ${'28/09/2019, 10:00 Saturday'}  | ${8}          | ${'30/09/2019, 18:00 Monday'}
  `(
    'calculateResultDate__table',
    ({ startTime, durationHours, expectedResult }) => {
      const startTimeMs = moment(startTime, 'DD/MM/YYYY HH:mm dddd').valueOf()
      const durationMs = 60 * 60 * 1000 * durationHours
      const expectedResult_ms = moment(
          expectedResult,
          'DD/MM/YYYY HH:mm dddd',
        ).valueOf()
        expect(calculateResultDate(startTimeMs, durationMs)).toBe(
          expectedResult_ms,
        )
      },
   )
})
