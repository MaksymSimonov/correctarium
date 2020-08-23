const express = require('express')
const OrderController = require('../controllers/orderController')
const router = express.Router()
const multer = require('../middlewares/multer')

router.post('/order', multer.send, OrderController.createOrder)

module.exports = router