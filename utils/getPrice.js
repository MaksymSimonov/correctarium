const Languages = require('../models/languages')
const Mimetypes = require('../models/mimetype')

const getPrice = (fileMimetype, characters, language) => {
  let price = 0
  let priceForSymbol = 0
  let expensiveFile = fileMimetype !== Mimetypes.DOCX 
                        && fileMimetype !== Mimetypes.DOC 
                        && fileMimetype !== Mimetypes.RTF

  if (characters < 0) throw new Error('Count of characters is less than 0')
  if (characters === 0) return 0                      

  if(language === Languages.UKRAINIAN || language === Languages.RUSSIAN) {
    priceForSymbol = 0.05
  } else if(language === Languages.ENGLISH) {
    priceForSymbol = 0.12
  } else {
    throw new Error(`${language} is unknown language`)
  }

  price = characters*priceForSymbol

  if(expensiveFile) price = price + price*0.2

  if(language === Languages.UKRAINIAN || language === Languages.RUSSIAN) {
    if(price < 50) return 50
  } else if(language === Languages.ENGLISH) {
    if(price < 120) return 120
  }

  return Math.round(price*100)/100
}

module.exports = getPrice