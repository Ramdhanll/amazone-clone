import express from 'express'
import { order, getOrder, updateOrder } from '../controllers/OrderController.js'
import { isAuth } from '../utils/jwt.js'

const orderRouter = express.Router()

orderRouter.post('/', isAuth, order)
orderRouter.get('/:id', isAuth, getOrder)
orderRouter.put('/:id/pay', isAuth, updateOrder)

export default orderRouter