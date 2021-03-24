import express from 'express'
import { edit, getAllProducts, getProduct, seed, store, destroy } from '../controllers/ProductController.js'
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils/jwt.js'

const productRouter = express.Router()

productRouter.get('/seed', seed)
productRouter.get('/', getAllProducts)
productRouter.get('/:id', getProduct)
productRouter.post('/', isAuth, isSellerOrAdmin, store)
productRouter.put('/:id', isAuth, isSellerOrAdmin, edit)
productRouter.delete('/:id', isAuth, isAdmin, destroy)

export default productRouter