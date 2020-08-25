const moment = require('moment-business-days')
const Order = require('../models/order')
const getCharacters = require('../utils/getCharacters')
const getPrice = require('../utils/getPrice')
const getDeadline = require('../utils/getDeadline')

createOrder = (req, res) => {
  let file = req.file
  let fileMimetype = file.mimetype
  //console.log(file)
  let { name, email, language } = req.body
  let startDate = new Date()

  const order = new Order()
  order.client = { name, email }
  order.date = moment(startDate).format('Do MMM YYYY [at] H:mm') 
  getCharacters(file)
    .then(characters => {
      order.task = { fileName: file.filename, language, characters }
      order.price = getPrice(fileMimetype, characters, language)
      order.deadline = getDeadline(fileMimetype, startDate, characters, language)
      order.done = false
      return res.status(200).json({ order })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Order not added!'
      })
    })
}

module.exports = {
  createOrder
}
