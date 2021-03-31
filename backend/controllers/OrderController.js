import Order from "../models/orderModel.js"
import expressAsyncHandler from "express-async-handler"
import { sendEmail, payOrderEmailTemplate } from "../utils/nodemailer.js"

export const getAllOrder = expressAsyncHandler(async (req, res) => {
   const seller = req.query.seller || ""
   const sellerFilter = seller ? { seller } : {}

   const orders = await Order.find({ ...sellerFilter }).populate("user", "name")
   res.status(200).json(orders)
})

export const order = expressAsyncHandler(async (req, res) => {
   const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
   } = req.body

   if (orderItems.length === 0)
      return res.status(400).json({ message: "Cart is empty" })

   const order = new Order({
      seller: orderItems[0].seller,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      user: req.user._id,
   })

   const createdOrder = await order.save()

   res.status(201).json({ order: createdOrder, message: "New Order Created" })
})

export const getOrder = expressAsyncHandler(async (req, res) => {
   const order = await Order.findById(req.params.id)

   if (!order) return res.status(404).json({ message: "Order Not Found" })
   res.status(200).json(order)
})

export const updateOrder = expressAsyncHandler(async (req, res) => {
   const {
      id,
      status,
      update_time,
      payer: { email_address },
   } = req.body
   const order = await Order.findById(req.params.id).populate(
      "user",
      "email name"
   )

   if (!order) return res.status(404).json({ message: "Order Not Found" })

   order.isPaid = true
   order.paidAt = Date.now()
   order.paymentResult = { id, status, update_time, email_address }

   const updatedOrder = await order.save()
   const infoMessage = await sendEmail(
      order.user.email,
      `New order ${order._id}`,
      payOrderEmailTemplate(order)
   )

   res.status(200).json({
      message: "Order Paid",
      order: updatedOrder,
      infoMessage,
   })
})

export const listOrderMine = expressAsyncHandler(async (req, res) => {
   const orders = await Order.find({ user: req.user._id })
   if (!orders) return res.status(404).json({ message: "Order Not Found" })

   res.status(200).json(orders)
})

export const destroy = expressAsyncHandler(async (req, res) => {
   const orderId = req.params.id

   const order = await Order.findById(orderId)
   if (!order) return res.status(404).json({ message: "Order Not Found" })

   const deleteOrder = await order.remove()
   res.status(200).json(deleteOrder)
})

export const deliver = expressAsyncHandler(async (req, res) => {
   const order = await Order.findById(req.params.id)

   if (!order) return res.status(404).json({ message: "Order Not Found" })
   order.isDelivered = true
   order.deliveredAt = Date.now()

   const updateOrder = await order.save()
   res.status(200).json({ message: "Order Delivered", order: updateOrder })
})
