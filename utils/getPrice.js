const languages = require('../models/languages')
const mimetypes = require('../models/mimetype')

const getPrice = (file, characters, language) => {
   let price = 0
   let pricePerSymbol = 0

   if(language === languages.UKRAINIAN || language === languages.RUSSIAN){
       pricePerSymbol = 0.05
   } else {
       pricePerSymbol = 0.12
   }
   
   price = characters*pricePerSymbol

   if(file.mimetype !== mimetypes.DOCX && file.mimetype !== mimetypes.DOC && file.mimetype !== mimetypes.RTF) {
        price = price + (price*100)/20
   }
   //if(price<50) return 50
   return Math.ceil(price*100)/100
}

module.exports = getPrice