const fs = require('fs')
const mammoth = require('mammoth')

var textract = require('textract');

const getCharacters = (file) => {
    return new Promise( (resolve, reject)=> {
        textract.fromFileWithPath(file.path,  ( error, text )=> {
          if (text) {
          //console.log(text.length)
          resolve(text.length)
          } else {
            reject(error);
         }
        })
    })
}

// function  getCharacters = (file) {
//     let result = 0;
//     textract.fromFileWithPath(file.path, function ( error, text ) {
//         if (text) {
//             console.log(text.length)
//             result = text.length;
//         } else {
//             console.log(error); 
//         }
//     })
//     // mammoth.extractRawText({path: file.path})  //docx
//     //   .then((result) => {
//     //     var text = result.value; // The raw text 
//     //     console.log(text.split('\n').join('').length);
//     //     var messages = result.messages;
//     //   })
//     //   .done()

   

//     // fs.readFile(file.path, 'utf8', (err, data) => {   //.txt
//     //     if (err) throw err
//     //     console.log(data)
//     // });
//     return result
// }

module.exports = getCharacters