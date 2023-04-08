const router = require('express').Router();
// const { verifyToken, isAdmin } = require('../authenticator/auth');
const {
  createNewOrder,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
  updateOrder,
  deleteOrder,
} = require('../models/orderModel')

// place a new order
router.post('/', async (req, res) => {
  createNewOrder(req, res)
})

// get all orders
router.get('/', getAllOrders);

// get a single order
router.get('/:id', getSingleOrder);

// update order status
router.get('/status/:id', updateOrderStatus)

// update an order
router.put('/:id', updateOrder);

// delete an order
router.delete('/:id', deleteOrder);

module.exports = router