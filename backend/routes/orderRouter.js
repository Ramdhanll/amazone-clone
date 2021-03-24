import express from 'express'
import { 
   getAllOrder, 
   order, 
   getOrder, 
   updateOrder, 
   listOrderMine, 
   destroy ,
   deliver
} from '../controllers/OrderController.js'
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils/jwt.js'

const orderRouter = express.Router()

orderRouter.get('/', isAuth, isSellerOrAdmin, getAllOrder)
orderRouter.post('/', isAuth, order)
orderRouter.get('/mine', isAuth, listOrderMine)
orderRouter.get('/:id', isAuth, getOrder)
orderRouter.delete('/:id', isAuth, isAdmin, destroy)
orderRouter.put('/:id/pay', isAuth, updateOrder)
orderRouter.put('/:id/deliver', isAuth, isAdmin, deliver)

export default orderRouter