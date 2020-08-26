const multer  = require('multer')
const Mimetypes = require('../models/mimetype')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.split(' ').join('-'))
  }
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
        file.mimetype === Mimetypes.TXT || 
        file.mimetype === Mimetypes.PDF || 
        file.mimetype === Mimetypes.PDF || 
        file.mimetype === Mimetypes.DOC ||
        file.mimetype === Mimetypes.DOCX
        ) {
      cb(null, true)
    } else {
      cb(null, false)
    }
  }
})

module.exports.send = (req, res, next) => {
  return upload.single('uploaded_file')(req, res, () => {
    if (!req.file) return res.status(400).json({ error: 'You can only send *.txt *.rtf *.doc *.pdf *.docx files' })
    next()
  })
}