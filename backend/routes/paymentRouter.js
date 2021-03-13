import express from 'express'
import {pay} from '../controllers/PaymentController.js'

const paymentRouter = express.Router()

paymentRouter.post('/', pay)

export default paymentRouter