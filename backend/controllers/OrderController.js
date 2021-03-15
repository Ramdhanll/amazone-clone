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