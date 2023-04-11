const jwt = require('jsonwebtoken')
require('dotenv').config()

const secretKey = process.env.SECRET_KEY

exports.generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    secretKey,
    { expiresIn: '1d' }
  )
}

exports.verifyToken = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, secretKey)._id
    req.userId = decoded
    next()
  } catch (err) {
    return res.status(401).json({ message: 'You need to verify your token to access this route' })
  }
}

// admin route
const admins = ['64301e4b6be0aa76edc06830']

exports.isAdmin = (req, res, next) => {
  if(admins.includes(req.userId)){
    next()
  } else{
    return res.status(401).json({ message: 'You need to be an admin to access this route'})
  }
}