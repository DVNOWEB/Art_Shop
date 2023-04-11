const router = require('express').Router()
const { verifyToken, isAdmin } = require('../authenticator/auth')
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
router.put('/:id', verifyToken, updateUser)

// ADMIN ROUTES

// delete user if admin
router.delete('/:id', isAdmin, deleteUser)

// get all users if admin
router.get('/', isAdmin, getAllUsers)

module.exports = router
