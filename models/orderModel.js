const { Order } = require('../schemas/orderSchema')
const { OrderItem } = require('../schemas/orderItemSchema')

exports.createNewOrder = async (req, res) => {
  const {
    shippingAddress1,
    shippingAddress2,
    city,
    zip,
    country,
    phone,
    status,
    totalPrice,
    user,
  } = req.body

  // create order items first and save it then create order
  const orderItemIds = await Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
      })
      newOrderItem = await newOrderItem.save()

      return newOrderItem._id
    })
  )

  // create order and save it
  const order = await Order({
    orderItems: orderItemIds,
    shippingAddress1,
    shippingAddress2,
    city,
    zip,
    country,
    phone,
    status,
    totalPrice,
    user,
  })
  const savedOrder = await order.save()

  if (!savedOrder) {
    return res.status(400).json({ message: 'Order not created' })
  }
  // res.status(201).json(savedOrder)
  res.send(savedOrder)
}

exports.getAllOrders = async (req, res) => {
  try {
    const orderList = await Order.find({})
      .populate('user', 'lastName firstName email')
      .sort({ dateOrdered: 0 })
    if (!orderList) {
      return res.status(404).json({ message: 'Order list not found' })
    }
    res.status(200).json(orderList)
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

exports.getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'lastName firstName email')
      .sort({ dateOrdered: 0 })
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    // res.status(200).json(order)
    res.send(order)
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user')
      .populate({ path: 'orderItems', populate: { path: 'product' } })
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.status(200).json(order)
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id })
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.status(200).json(updatedOrder)
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id })
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    await order.remove()
    res.status(200).json({ message: 'Order deleted' })
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}
