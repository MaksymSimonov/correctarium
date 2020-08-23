const Order = require('../models/order')
const getCharacters = require('../utils/getCharacters')
const getPrice = require('../utils/getPrice')

const moment = require('moment');  
require('moment-weekday-calc');

createOrder = (req, res) => {
  let file = req.file
  let name = req.body.name
  let email = req.body.email
  let language = req.body.language

  getCharacters(file)
    .then(characters => {
      let price = getPrice(file, characters, language)
      console.log(price)
      // console.log(new Date().getTime())
      // console.log(moment().isoWeekdayCalc('1 Apr 2015','31 Mar 2016',[1,2,3,4,5]));

    })
    .catch(error => console.log(error))

}

updateOrder = async (req, res) => {
}

deleteOrder = async (req, res) => {
}

getOrderById = async (req, res) => {
}

getOrders = async (req, res) => {
}

module.exports = {
  createOrder
}
