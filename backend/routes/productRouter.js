import express from 'express'
import { edit, getAllProducts, getProduct, seed, store } from '../controllers/ProductController.js'
import { isAdmin, isAuth } from '../utils/jwt.js'

const productRouter = express.Router()

productRouter.get('/seed', seed)
productRouter.get('/', getAllProducts)
productRouter.get('/:id', getProduct)
productRouter.post('/', isAuth, isAdmin, store)
productRouter.put('/:id', isAuth, isAdmin, edit)

export default productRouter