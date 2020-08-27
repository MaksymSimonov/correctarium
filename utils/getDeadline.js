const moment = require('moment-business-days')
const Languages = require('../models/languages')
const Mimetypes = require('../models/mimetype')

 const getDeadline = (mimetype, startDate, characters, language) => {
  let startTimeMs = startDate.getTime()
  let speed = chooseSpeed(language)
  let workDurationMs = calculateWorkDuration(characters, speed, mimetype)
  
  return calculateResultDate(startTimeMs, workDurationMs)
}

const chooseSpeed = (language) => {
  if(language === Languages.UKRAINIAN || language === Languages.RUSSIAN) {
    return 1333
  } else if(language === Languages.ENGLISH) {
    return 333
  } else {
    throw new Error(`${language} is unknown language`)
  }
}

const calculatePercent = (workDuration, mimetype) => {
  let expensiveFlag = mimetype !== Mimetypes.DOCX 
                        && mimetype !== Mimetypes.DOC 
                        && mimetype !== Mimetypes.RTF

  if(expensiveFlag) return workDuration + workDuration*0.2
  return workDuration
}

const calculateWorkDuration = (characters, speed, mimetype) => {
  let workDuration = (characters/speed + 0.5)*3600000 //+ 0.5 hour for read document
  workDuration = calculatePercent(workDuration, mimetype)
  if(workDuration < 3600000) return 3600000
  return Math.floor(workDuration)
}

const calculateResultDate = (startTimeMs, durationMs) => {
  let startOfWork = 10
  let finishOfWork = 19
  let workingHours = finishOfWork - startOfWork

  let date = moment(startTimeMs)
  let hours = date.hours()
  let minutes = date.minutes()

  let daysForWork = durationMs/(workingHours*3600000) 
  let hoursForWork = Math.floor(workingHours*(daysForWork - Math.floor(daysForWork))) 
  let minutesForWork = Math.round((workingHours*(daysForWork - Math.floor(daysForWork)) - hoursForWork)*60) 
  daysForWork = Math.floor(daysForWork)

  while(!date.isBusinessDay()){
    date.add(1, 'days')
    hours = startOfWork
    minutes = 0
  }

  if(hours < startOfWork) {
    hours = startOfWork
    minutes = 0
  } else if(hours >= finishOfWork){
    hours = startOfWork
    minutes = 0
    daysForWork++
  }

  minutes = minutes + minutesForWork  
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
  
  return moment(date).businessAdd(daysForWork).valueOf()
}

module.exports = { 
  getDeadline,
  chooseSpeed, 
  calculatePercent,
  calculateWorkDuration,
  calculateResultDate
}
