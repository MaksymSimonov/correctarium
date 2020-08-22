const express = require('express')
const OrderController = require('../controllers/orderController')
const router = express.Router()

router.post('/order', OrderController.createOrder)
router.get('/order/:id', OrderController.getOrderById)
router.put('/order/:id', OrderController.updateOrder)
router.delete('/order/:id', OrderController.deleteOrder)
router.get('/orders', OrderController.getOrders)

module.exports = router