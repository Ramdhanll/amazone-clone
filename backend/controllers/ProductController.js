import expressAsyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

export const seed = expressAsyncHandler( async (req, res) => {
   await Product.remove({})
   const createdProducts = await Product.insertMany(data.products)
   res.send(createdProducts)
})

export const getAllProducts = expressAsyncHandler( async (req, res) => {
   const products = await Product.find({})
   return res.send({products})
})

export const getProduct = expressAsyncHandler( async (req, res) => {
   try {
      const product = await Product.findById(req.params.id)
      return res.status(200).json(product)
   } catch (error) {
      return res.status(404).json({ message: 'Product not Found' })
   }
})

export const store = expressAsyncHandler( async (req, res) => {
   // const { 
   //    name, 
   //    category, 
   //    image, 
   //    price, 
   //    brand, 
   //    rating, 
   //    numReviews, 
   //    desciption, 
   //    countInStock
   // } = req.body

   const product = new Product({
      name: 'sample name' + Date.now(),
      category: 'sample category',
      image: '/images/t1.jpg',
      price: 0,
      brand: 'sample brand',
      rating: 0,
      numReviews: 0,
      description: 'sample description',
      countInStock: 0,
   })

   const createdProduct = await product.save()
   res.status(200).json({ message: 'Product Created', product: createdProduct })
})