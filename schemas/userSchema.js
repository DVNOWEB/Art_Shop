const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },

  // Address info for shipping and billing purposes
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
})

// Payment info for future orders
// payment: {
//   cardName: { type: String },
//   cardNumber: { type: String },
//   expMonth: { type: String },
//   expYear: { type: String },
//   cvv: { type: String },
// },

// change _id to id in frontend
// userSchema.virtual('id').get(() => {
//   return this._id.toHexString()
// })

// userSchema.set('toJSON', {
//   virtuals: true,
// })

module.exports = mongoose.model('User', userSchema)
