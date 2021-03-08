import express from 'express'
import { getAllProducts, getProduct } from '../controllers/ProductsController.js'
import data from './data.js'

const productRouter = express.Router()

productRouter.get('/', getAllProducts)
productRouter.get('/:id', getProduct)

export default productRouter