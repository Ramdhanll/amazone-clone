import express from "express"
import {
   getAllOrder,
   order,
   getOrder,
   updateOrder,
   listOrderMine,
   destroy,
   deliver,
} from "../controllers/OrderController.js"
import { isAdmin, isAuth, isSellerOrAdmin } from "../utils/jwt.js"
// import mailgun from "mailgun-js"

const orderRouter = express.Router()

// orderRouter.get("/mailgun", (req, res) => {
//    var mg = mailgun({
//       apiKey: process.env.MAILGUN_API_KEY,
//       domain: process.env.MAILGUN_DOMAIN,
//    })
//    var data = {
//       from: `Excited User <me@${process.env.MAILGUN_DOMAIN}>`,
//       to: "bscdhani300@gmail.com",
//       subject: "Hello",
//       text: "Testing some Mailgun awesomeness!",
//    }

//    mg.messages().send(data, function (error, body) {
//       if (error) {
//          console.log("e", error)
//          return res.send(error)
//       }
//       console.log("b", body)
//       return res.send(body)
//    })
// })

orderRouter.get("/", isAuth, isSellerOrAdmin, getAllOrder)
orderRouter.post("/", isAuth, order)
orderRouter.get("/mine", isAuth, listOrderMine)
orderRouter.get("/:id", isAuth, getOrder)
orderRouter.delete("/:id", isAuth, isAdmin, destroy)
orderRouter.put("/:id/pay", isAuth, updateOrder)
orderRouter.put("/:id/deliver", isAuth, isAdmin, deliver)

export default orderRouter
