const express = require('express')
const OrderController = require('../controllers/orderController')
const multer = require('../middlewares/multer')
const router = express.Router()

router.post('/order', multer.send, OrderController.createOrder)

module.exports = router