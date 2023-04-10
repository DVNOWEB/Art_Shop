const router = require('express').Router()
// const { verifyToken, isAdmin } = require('../authenticator/auth');
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

router.post('/', createNewOrder)

// get all orders
router.get('/', getAllOrders)

// get a single order
router.get('/:id', getSingleOrder)

// update order status
router.get('/status/:id', orderStatus)

// update an order
router.put('/:id', updateOrder)

// delete an order
router.delete('/:id', deleteOrder)

// get a total sales
router.get('/get/totalsales', getTotalSales);

// get order count
router.get('/get/count', getOrderCount);

// get user orders
router.get('/get/userorders/:userId', getUserOrders);

module.exports = router
