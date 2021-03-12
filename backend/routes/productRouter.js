import express from 'express'
import { getAllProducts, getProduct, seed } from '../controllers/ProductController.js'
import expressAsyncHandler from 'express-async-handler'

const productRouter = express.Router()

productRouter.get('/seed', seed)
productRouter.get('/', getAllProducts)
productRouter.get('/:id', getProduct)

export default productRouter