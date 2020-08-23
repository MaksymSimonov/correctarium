const mammoth = require('mammoth')
const fs = require('fs')
const pdfreader = require("pdfreader");

const getCharacters = (file) => {
    return new Promise((resolve, reject) => {
        switch(file.mimetype) {
            case 'text/plain': {
                fs.readFile(file.path, 'utf8', (error, data) => {   //.txt
                    if (error) reject(error)
                    resolve(data.replace(/\r?\n/g, '').length)
                })
                break
            }
            case 'application/rtf': {
                break
            }
            case 'application/pdf': {
                break
            }
            case 'application/msword': {
                break
            }
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
                mammoth.extractRawText({path: file.path})  //docx
                    .then((data) => {
                        resolve(data.value.replace(/\r?\n/g, '').length)
                    })
                    .catch(error => reject(error))
                    .done()
                break
            }
            default: {

            }
        }
    })
}

module.exports = getCharacters