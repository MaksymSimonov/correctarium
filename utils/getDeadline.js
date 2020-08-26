const moment = require('moment-business-days')
const Languages = require('../models/languages')
const Mimetypes = require('../models/mimetype')

const getDeadline = (fileMimetype, startDate, characters, language) => {
  let startOfWork = 10
  let finishOfWork = 19
  let workingHours = finishOfWork - startOfWork

  let date = moment(startDate)
  let hours = date.hours()
  let minutes = date.minutes()

  let editingSpeed = 0 
  let expensiveFile = fileMimetype !== Mimetypes.DOCX 
                        && fileMimetype !== Mimetypes.DOC 
                        && fileMimetype !== Mimetypes.RTF
 
  if (characters < 0) throw new Error('Count of characters is less than 0')
  
  if(language === Languages.UKRAINIAN || language === Languages.RUSSIAN) {
    editingSpeed = 1333
  } else if(language === Languages.ENGLISH) {
    editingSpeed = 333
  } else {
    throw new Error(`${language} is unknown language`)
  }

  let msForWork = Math.floor((characters/editingSpeed)*3600000) //milliseconds for work

  if(expensiveFile) msForWork = msForWork + msForWork*0.2
  if(msForWork < 3600000) msForWork = 3600000

  let daysForWork = msForWork/(workingHours*3600000) //number of working days for work
  let hoursForWork = Math.floor(workingHours*(daysForWork - Math.floor(daysForWork))) //number of working hours for work without days
  let minutesForWork = Math.floor((workingHours*(daysForWork - Math.floor(daysForWork)) - hoursForWork)*60) //number of working minutes for work
  daysForWork = Math.floor(daysForWork)

  if(hours < startOfWork) {
    hours = startOfWork
    minutes = 0
  } else if(hours >= finishOfWork){
    hours = startOfWork
    minutes = 0
    daysForWork++
  }
  minutes = minutes + minutesForWork + 30 //+30 min to read the document
  hours = hours + hoursForWork
  if(minutes >= 60) {
    minutes = minutes - 60
    hours++
  }
  if(hours >= finishOfWork) {
    hours = startOfWork + hours - finishOfWork
    daysForWork++
  }
  date.hours(hours)
  date.minutes(minutes)
  return moment(date).businessAdd(daysForWork)._d
}

module.exports = getDeadline