const router = require('express').Router();

// verifyToken
const { verifyToken, isAdmin } = require('../authenticator/auth')
const {
  createNewProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require('../models/productModel')

// add a new product admin
router.post('/', isAdmin, createNewProduct)

// get all products by category
router.get('/', verifyToken, isAdmin, getAllProducts)

// get a single product
router.get('/:id', verifyToken, isAdmin, getSingleProduct)

// update a product admin
router.put('/:id', isAdmin, updateProduct)

// delete a product admin
router.delete('/:id', isAdmin, deleteProduct)


module.exports = router;