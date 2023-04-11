const Product = require('../schemas/productSchema')

// add a new product
exports.createNewProduct = async (req, res) => {
  try {
    const { title, desc, imgURL, categories, price, artist, countInStock } =
      req.body

    const product = await Product.create({
      title,
      desc,
      imgURL,
      categories,
      price,
      artist,
      countInStock,
    })

    if (!product) {
      return res.status(400).json({ message: 'Product not created' })
    }
    res.status(201).json(product)
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

// get all products by category
exports.getAllProducts = async (req, res) => {
  try {
    // get product by artist name
    const { artist } = req.query
    console.log(artist)
    const query = artist ? { artist } : {}

    const products = await Product.find(query).populate('categories')
    if (!products) {
      return res.status(404).json({ message: 'Products not found' })
    }
    res.status(200).json(products)
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

// get a single product by id
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('artist')
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.status(200).json({ product })
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

// update a product by admin
exports.updateProduct = async (req, res) => {
  try {
    const { title, desc, imgURL, categories, price, artist, countInStock } =
      req.body
    // get product and update
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        title,
        desc,
        imgURL,
        categories,
        price,
        artist,
        countInStock,
      },
      { new: true, runValidators: true }
    )

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.status(200).json({ product })
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

// delete a product by admin
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.status(200).json({ message: 'Product deleted' })
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}