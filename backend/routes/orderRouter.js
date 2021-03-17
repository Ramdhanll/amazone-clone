import express from 'express'
import { order, getOrder, updateOrder, listOrderMine } from '../controllers/OrderController.js'
import { isAuth } from '../utils/jwt.js'

const orderRouter = express.Router()

orderRouter.post('/', isAuth, order)
orderRouter.get('/mine', isAuth, listOrderMine)
orderRouter.get('/:id', isAuth, getOrder)
orderRouter.put('/:id/pay', isAuth, updateOrder)

export default orderRouter