const Order = require('../models/order')
const getCharacters = require('../utils/getCharacters')

createOrder = (req, res) => {
  console.log(req.file)
  console.log(req.body.name)
  console.log(req.body.email)
  // console.log(getCharacters(req.file))
  getCharacters(req.file)
  .then(count => console.log(count))
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
