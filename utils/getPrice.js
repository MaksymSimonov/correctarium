const Languages = require('../models/languages')
const Mimetypes = require('../models/mimetype')

const getPrice = (mimetype, characters, language) => {                
  let priceForSymbol = choosePriceForSymbol(language)
  
  return calculateResultPrice(mimetype, characters, language, priceForSymbol)
}

const choosePriceForSymbol = (language) => {
  if(language === Languages.UKRAINIAN || language === Languages.RUSSIAN) {
    return 0.05
  } else if(language === Languages.ENGLISH) {
    return 0.12
  } else {
    throw new Error(`${language} is unknown language`)
  }
}

const calculatePercent = (price, mimetype) => {
  let expensiveFlag = mimetype !== Mimetypes.DOCX 
                        && mimetype !== Mimetypes.DOC 
                        && mimetype !== Mimetypes.RTF

  if(expensiveFlag) return price + price*0.2
  return price
}

const calculateResultPrice = (mimetype, characters, language, priceForSymbol) => {
  if (characters < 0) throw new Error('Count of characters is less than 0')
  if (characters === 0) return 0
  
  let price = characters*priceForSymbol
  price = calculatePercent(price, mimetype)

  if(language === Languages.UKRAINIAN || language === Languages.RUSSIAN) {
    if(price < 50) return 50
  } else {
    if(price < 120) return 120
  }
  return Math.round(price*100)/100
}

module.exports = {
  getPrice,
  choosePriceForSymbol,
  calculatePercent,
  calculateResultPrice
}