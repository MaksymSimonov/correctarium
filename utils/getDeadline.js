const moment = require('moment-business-days')
const languages = require('../models/languages')
const Mimetypes = require('../models/mimetype')

const getDeadline = (file, startDate, characters, language) => {
  let startOfWork = 10
  let finishOfWork = 19
  let workingHours = finishOfWork - startOfWork

  let date = moment(startDate)
  let hours = date.hours()
  let minutes = date.minutes()

  let editingSpeed = 0
  let expensiveFile = file.mimetype !== Mimetypes.DOCX 
                        && file.mimetype !== Mimetypes.DOC 
                        && file.mimetype !== Mimetypes.RTF
 
  if(language === languages.UKRAINIAN || language === languages.RUSSIAN) {
    editingSpeed = 1333
  } else {
    editingSpeed = 333
  }

    // let timeForWork = characters/editingSpeed
    // if(expensiveFile) timeForWork = timeForWork + timeForWork*0.2
    // if(timeForWork < 1) timeForWork = 1

    // let daysForWork = timeForWork/workingHours //number of working days for work
    // console.log('daysForWork->', daysForWork)

    // let hoursForWork = workingHours*daysForWork - Math.floor(daysForWork)
    // console.log('hoursForWork->', hoursForWork)
    // //console.log('--->', (timeForWork - workingHours*daysForWork) - Math.floor(hoursForWork))
    // let minutesForWork = Math.ceil((workingHours*(daysForWork - Math.floor(daysForWork)) - hoursForWork)*60)
    // console.log('minutesForWork->', minutesForWork)
    // daysForWork = Math.floor(daysForWork)
    // hoursForWork = Math.floor(hoursForWork)


  let msForWork = Math.ceil((characters/editingSpeed)*3600000) //milliseconds for work

  if(expensiveFile) msForWork = msForWork + msForWork*0.2
  if(msForWork < 3600000) msForWork = 3600000

  let daysForWork = msForWork/(workingHours*3600000) //number of working days for work
  let hoursForWork = Math.floor(workingHours*(daysForWork - Math.floor(daysForWork))) //number of working hours for work without days
  let minutesForWork = Math.ceil((workingHours*(daysForWork - Math.floor(daysForWork)) - hoursForWork)*60) //number of working minutes for work
  daysForWork = Math.floor(daysForWork)

  if(hours < startOfWork) {
    hours = startOfWork
    minutes = 0
  } else if(hours >= finishOfWork){
    hours = startOfWork
    minutes = 0
    daysForWork++
  }
  minutes = minutes + minutesForWork + 30 //30 minutes to read the document
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
  return moment(date).businessAdd(daysForWork).format('Do MMM YYYY [at] H:mm')
}

module.exports = getDeadline