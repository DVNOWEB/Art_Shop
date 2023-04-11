const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 1,
  },
})

module.exports = mongoose.model('Product', productSchema)
