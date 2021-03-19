import express from 'express'
import { getAllProducts, getProduct, seed, store } from '../controllers/ProductController.js'
import { isAdmin, isAuth } from '../utils/jwt.js'

const productRouter = express.Router()

productRouter.get('/seed', seed)
productRouter.get('/', getAllProducts)
productRouter.get('/:id', getProduct)
productRouter.post('/', isAuth, isAdmin, store)

export default productRouter