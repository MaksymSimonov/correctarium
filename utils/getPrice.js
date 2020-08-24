const Languages = require('../models/languages')
const Mimetypes = require('../models/mimetype')

const getPrice = (file, characters, language) => {
  let price = 0
  let pricePerSymbol = 0
  let expensiveFile = file.mimetype !== Mimetypes.DOCX 
                        && file.mimetype !== Mimetypes.DOC 
                        && file.mimetype !== Mimetypes.RTF
  let simpleLanguages = language === Languages.UKRAINIAN || language === Languages.RUSSIAN

  if(simpleLanguages) {
    pricePerSymbol = 0.05
  } else {
    pricePerSymbol = 0.12
  }

  price = characters*pricePerSymbol

  if(expensiveFile) price = price + price*0.2

  if(simpleLanguages) {
    if(price < 50) return 50
  } else {
    if(price < 120) return 120
  }

  return Math.ceil(price*100)/100
}

module.exports = getPrice