const Order = require('../models/order')

createOrder = (req, res) => {
  console.log(req.file)
  console.log(req.body.name)
  console.log(req.body.email)
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
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderById,
  getOrders
}
