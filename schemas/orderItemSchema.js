const mongoose = require('mongoose')
const { Schema } = mongoose

const orderItemSchema = new Schema({
  quantity: {
    type: Number,
    min: 1,
    max: 1,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
})

exports.OrderItem = mongoose.model('OrderItem', orderItemSchema)
