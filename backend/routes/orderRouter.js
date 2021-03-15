import express from 'express'
import { order } from '../controllers/OrderController.js'
import { isAuth } from '../utils/jwt.js'

const orderRouter = express.Router()

orderRouter.post('/', isAuth, order)

export default orderRouter