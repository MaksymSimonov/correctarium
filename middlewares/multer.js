const multer  = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.toLowerCase().split(' ').join('-'))
  }
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
        file.mimetype === 'text/plain' || //.txt
        file.mimetype === 'application/rtf' || //.rtf
        file.mimetype === 'application/pdf' || //.pdf
        file.mimetype === 'application/msword' || //.doc
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' //.docx
        ) {
      cb(null, true)
    } else {
      cb(null, false)
      //return cb(new Error('Only .png, .jpg, .mp4 and .jpeg format allowed!'))
    }
  }
})

module.exports.send = (req, res, next) => {
  return upload.single('uploaded_file')(req, res, () => {
    if (!req.file) return res.json({ error: 'Invalid File Type' })
    next()
  })
}