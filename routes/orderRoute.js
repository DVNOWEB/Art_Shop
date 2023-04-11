const router = require('express').Router()
const { verifyToken, isAdmin } = require('../authenticator/auth')
const {
  createNewOrder,
  getAllOrders,
  getSingleOrder,
  orderStatus,
  updateOrder,
  deleteOrder,
  getTotalSales,
  getOrderCount,
  getUserOrders,
} = require('../models/orderModel')

router.post('/', verifyToken, isAdmin, createNewOrder)

// get all orders
router.get('/', isAdmin, getAllOrders)

// get a single order
router.get('/:id', isAdmin, getSingleOrder)

// update order status
router.get('/status/:id', isAdmin, orderStatus)

// update an order
router.put('/:id', isAdmin, updateOrder)

// delete an order
router.delete('/:id', isAdmin, deleteOrder)

// get a total sales
router.get('/get/totalsales', isAdmin, getTotalSales)

// get order count
router.get('/get/count', isAdmin, getOrderCount)

// get user orders
router.get('/get/userorders/:userId', isAdmin, getUserOrders)

module.exports = router
