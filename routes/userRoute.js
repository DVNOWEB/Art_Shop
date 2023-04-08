const router = require('express').Router()
// const { verifyToken } = require('../authenticator/auth')
const {
  addUser,
  loginUser,
  deleteUser,
  updateUser,
  getAllUsers,
} = require('../models/userModel')


// register user sign in
router.post('/add', addUser)
// login user
router.post('/login', loginUser)

// update user if user
router.put('/:id', updateUser)

// ADMIN ROUTES

// delete user if admin
router.delete('/:id', deleteUser)

// get all users if admin
router.get('/', getAllUsers)

// update user if admin or user
// router.put('/:id', updateUser)

module.exports = router
