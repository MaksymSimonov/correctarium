const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const rfs = require('rotating-file-stream')

const db = require('./db')
const orderRouter = require('./routes/orderRouter')

const app = express()
const apiPort = 8000

const logDirectory = path.join(__dirname, 'log')
const accessLogStream = rfs('access.log', {
  interval: '1d',
  path: logDirectory
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('combined', { stream: accessLogStream }))

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/v1', orderRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
