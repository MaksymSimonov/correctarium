const mammoth = require('mammoth')
const fs = require('fs')
const pdfreader = require('pdfreader')
const Mimetypes = require('../models/mimetype')

const getCharacters = (file) => {
  return new Promise((resolve, reject) => {
    switch(file.mimetype) {
      case Mimetypes.TXT: {
        fs.readFile(file.path, 'utf8', (error, data) => {   
          if (error) reject(error)
          resolve(data.replace(/\r?\n/g, '').length)
        })
        break
      }
      case Mimetypes.RTF: {
        reject("I can't read RTF files yet")
        break
      }
      case Mimetypes.PDF: {
        reject("I can't read PDF files yet")
        break
      }
      case Mimetypes.DOC: {
        reject("I can't read DOC files yet")
        break
      }
      case Mimetypes.DOCX: {
        mammoth.extractRawText({path: file.path}) 
          .then((data) => {
            resolve(data.value.replace(/\r?\n/g, '').length)
          }).catch(error => reject(error)).done()
        break
      }
      default: {
        reject('You can only send *.txt *.rtf *.doc *.pdf *.docx files')
      }
    }
  })
}

module.exports = getCharacters