const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const rfs = require('rotating-file-stream')

const orderRouter = require('./routes/orderRouter')

const app = express()
const apiVersion = '/api/v1'
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

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(apiVersion, orderRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
