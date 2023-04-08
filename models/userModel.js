const User = require('../schemas/userSchema')
const bcrypt = require('bcryptjs')
const auth = require('../authenticator/auth')

exports.addUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, isAdmin, address, street, city, zip, country, orders } = req.body

    if (!firstName || !lastName || !email || !password || !address || !address.street || !address.city || !address.zip || !address.country) {
      console.log(firstName, lastName, email, password, address, street, city, zip, country);
      return res.status(400).json({ error: 'Please fill in all fields' })
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

   const _user = new User({
     firstName,
     lastName,
     email,
     passwordHash: hash,
     isAdmin,
     address: {
       street: address.street,
       city: address.city,
       zip: address.zip,
       country: address.country,
     },
     orders,
   })

    const user = await _user.save()

    res.status(201).json(auth.generateToken(user))
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Please fill in all fields' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    // Compare password
    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    res.status(200).json(auth.generateToken(user))
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
} 

// Update users first and last name
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).select('-passwordHash')
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
       user.firstName = req.body.firstName || user.firstName
       user.lastName = req.body.lastName || user.lastName

    const updatedUser = await user.save()

    res.status(200).json(updatedUser)
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

// Admin only
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete({ _id: req.params.id }).select(
      '-passwordHash'
    )
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ message: 'User deleted' })
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

// Admin only
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash')
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}
