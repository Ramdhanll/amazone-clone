import express from 'express'
import { order, getOrder } from '../controllers/OrderController.js'
import { isAuth } from '../utils/jwt.js'

const orderRouter = express.Router()

orderRouter.post('/', isAuth, order)
orderRouter.get('/:id', isAuth, getOrder)

export default orderRouter