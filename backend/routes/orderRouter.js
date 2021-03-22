import express from 'express'
import { getAllOrder, order, getOrder, updateOrder, listOrderMine } from '../controllers/OrderController.js'
import { isAdmin, isAuth } from '../utils/jwt.js'

const orderRouter = express.Router()

orderRouter.get('/', isAuth, isAdmin, getAllOrder)
orderRouter.post('/', isAuth, order)
orderRouter.get('/mine', isAuth, listOrderMine)
orderRouter.get('/:id', isAuth, getOrder)
orderRouter.put('/:id/pay', isAuth, updateOrder)

export default orderRouter