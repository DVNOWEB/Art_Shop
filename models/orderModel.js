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

  // create order items first and save it, then create order
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

  // calculate total price
  const totalPrices = await Promise.all(
    orderItemIds.map(async (orderItemId) => {
      const orderItem = await OrderItem.findById(orderItemId).populate(
        'product',
        'price'
      )
      const total = orderItem.product.price * orderItem.quantity
      return totalPrice, total
    })
  )
  const total = totalPrices.reduce((a, b) => a + b, 0)

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
    totalPrice: total,
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
    res.status(200).json({ orderList })
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
    res.send({ order })
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

exports.orderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'lastName firstName email')
      .populate({
        path: 'orderItems',
        populate: { path: 'product', populate: 'categories' },
      })
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.status(200).json({ order })
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    )
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.status(200).json({ order })
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndRemove(req.params.id).then(async (order) => {
      if (order) {
        await order.orderItems.map(async (orderItem) => {
          await OrderItem.findByIdAndRemove(orderItem)
        })
        res.status(200).json({ message: 'Order deleted' })
      } else {
        return res.status(404).json({ message: 'Order not found' })
      }
    })
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

// Get total sales
exports.getTotalSales = async (req, res) => {
  try {
    const totalSales = await Order.aggregate([
      { $group: { _id: null, totalsales: { $sum: '$totalPrice' } } },
    ])
    if (!totalSales) {
      return res.status(404).json({ message: 'Total sales not found' })
    }
    res.status(200).json({ totalsales: totalSales.pop().totalsales + ' $' })
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

// Count orders
exports.getOrderCount = async (req, res) => {
  try {
    const orderCount = await Order.countDocuments()
    if (!orderCount) {
      return res.status(404).json({ message: 'Order count not found' })
    }
    res.status(200).json({ orderCount })
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

// Get user orders
exports.getUserOrders = async (req, res) => {
  try {
    const userOrderList = await Order.find({ user: req.params.userId })
      .populate({
        path: 'orderItems',
        populate: { path: 'product', populate: 'categories' },
      })
      .sort({ dateOrdered: -1 })
    if (!userOrderList) {
      return res.status(404).json({ message: 'Order list not found' })
    }
    res.status(200).json({ userOrderList })
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}