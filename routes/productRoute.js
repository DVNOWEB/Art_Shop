const router = require('express').Router();

// verifyToken
// const { verifyToken, isAdmin } = require('../authenticator/auth')
const {
  createNewProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require('../models/productModel')

// add a new product admin
router.post('/', createNewProduct)

// get all products by category
router.get('/', getAllProducts)

// get a single product
router.get('/:id', getSingleProduct)

// update a product admin
router.put('/:id', updateProduct)

// delete a product admin
router.delete('/:id', deleteProduct)


module.exports = router;