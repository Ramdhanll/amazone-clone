import expressAsyncHandler from "express-async-handler"
import Product from "../models/productModel.js"

export const seed = expressAsyncHandler(async (req, res) => {
   await Product.remove({})
   const createdProducts = await Product.insertMany(data.products)
   res.send(createdProducts)
})

export const getAllProducts = expressAsyncHandler(async (req, res) => {
   const name = req.query.name || ""
   const seller = req.query.seller || ""
   const category = req.query.category || ""

   const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {}
   const sellerFilter = seller ? { seller } : {}
   const categoryFilter = category ? { category } : {}

   const products = await Product.find({
      ...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
   }).populate("seller", "seller.name seller.logo")
   return res.send({ products })
})

export const getProduct = expressAsyncHandler(async (req, res) => {
   const product = await Product.findById(req.params.id).populate(
      "seller",
      "seller.name seller.logo seller.rating seller.numReviews"
   )

   if (!product) return res.status(404).json({ message: "Product not Found" })

   return res.status(200).json(product)
})

export const getBycategories = expressAsyncHandler(async (req, res) => {
   const categories = await Product.find().distinct("category")
   res.status(200).json(categories)
})

export const store = expressAsyncHandler(async (req, res) => {
   const product = new Product({
      name: "sample name" + Date.now(),
      seller: req.user._id,
      category: "sample category",
      image: "/images/t2.jpg",
      price: 0,
      brand: "sample brand",
      rating: 0,
      numReviews: 0,
      description: "sample description",
      countInStock: 0,
   })

   const createdProduct = await product.save()
   res.status(200).json({
      message: "Product Created",
      product: createdProduct,
   })
})

export const edit = expressAsyncHandler(async (req, res) => {
   const productId = req.params.id
   const product = await Product.findById(productId)
   const {
      name,
      category,
      image,
      price,
      brand,
      description,
      countInStock,
   } = req.body

   if (!product) return res.status(404).json({ message: "Product Not Found" })

   product.name = name
   product.price = price
   product.image = image
   product.category = category
   product.brand = brand
   product.countInStock = countInStock
   product.description = description

   const updateProduct = await product.save()

   res.status(200).json({ message: "Product Updated", product: updateProduct })
})

export const destroy = expressAsyncHandler(async (req, res) => {
   const productId = req.params.id
   console.log(productId)
   const product = await Product.findById(productId)

   if (!product) return res.status(404).json({ message: "Product Not Found" })

   const deleteProduct = await product.remove()
   return res
      .status(200)
      .json({ message: "Product Deleted", product: deleteProduct })
})
