import Order from '../models/orderModel.js'
import expressAsyncHandler from 'express-async-handler'

export const order = expressAsyncHandler( async (req, res) => {
   const { 
      orderItems, 
      shippingAddress, 
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice
   } = req.body

   if (orderItems.length === 0) return res.status(400).json({ message: 'Cart is empty'})

   const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      user: req.user._id
   })

   const createdOrder = await order.save()

   res.status(201).json({ order: createdOrder, message: 'New Order Created'})
})

export const getOrder = expressAsyncHandler( async (req, res) => {
   const order = await Order.findById(req.params.id)

   if (!order) return res.status(404).json({ message: 'Order Not Found'})
   res.status(200).json(order)
})