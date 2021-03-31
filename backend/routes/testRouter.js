import express from "express"
import { sendEmail, payOrderEmailTemplate } from "../utils/nodemailer.js"
const testRouter = express.Router()

const order = {
   _id: "1",
   orderItems: [{ name: "b1", qty: "2", price: 12000 }],
   user: {
      name: "nameTest",
      email: "bscdhani3000@gmail.com",
   },
   itemsPrice: 12000,
   taxPrice: 120,
   shippingPrice: 2000,
   totalPrice: 50000,
   paymentMethod: "paypal",
   shippingAddress: {
      fullName: "fullname",
      addres: "dasana indah",
      city: "tangerang",
      country: "indeonesia",
      postalCode: "15123",
   },
   createdAt: Date.now(),
}

testRouter.get("/nodemailer", async (req, res) => {
   const infoMessage = await sendEmail(
      order.user.email,
      `New order ${order._id}`,
      payOrderEmailTemplate(order)
   )

   res.send(infoMessage)
})

export default testRouter
