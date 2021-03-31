import nodemailer from "nodemailer"

let transporter = () =>
   nodemailer.createTransport({
      service: "Gmail",
      auth: {
         user: process.env.NODEMAILER_USER
            ? process.env.NODEMAILER_USER
            : "testing@gmail.com",
         pass: process.env.NODEMAILER_PASS
            ? process.env.NODEMAILER_PASS
            : "passwordtesting",
      },
   })

export const sendEmail = async (to, subject, html) => {
   try {
      const info = await transporter().sendMail({
         from: process.env.NODEMAILER_USER || "testing@gmail.com",
         to,
         subject,
         html,
      })
      return { ...info, status: "success" }
   } catch (error) {
      return { ...error, status: "error" }
   }
}

export const payOrderEmailTemplate = (order) => {
   return `
      <h1>Thanks for shopping with us </h1>
      <p>
         we have finished processing your order.
      </p>
      <h2>
         [Order ${order._id}] (${order.createdAt.toString().substring(0, 10)})
      </h2>
      <table>
         <thead>
            <tr>
               <td><strong>Product</strong></td>
               <td><strong>Quantity</strong></td>
               <td><strong align="right">Prices</strong></td>
            </tr>
         </thead>
         <tbody>
            ${order.orderItems
               .map(
                  (item) => `
                  <tr>
                     <td>${item.name}</td>
                     <td align="center">${item.qty}</td>
                     <td align="right">${item.price}</td>
                  </tr>
               `
               )
               .join("\n")}
         </tbody>
         <tfoot>
            <tr>
               <td colspan="2">Items Price:</td>
               <td align="right"> $${order.itemsPrice}</td>
            </tr>
            <tr>
               <td colspan="2">Tax Price:</td>
               <td align="right"> $${order.taxPrice}</td>
            </tr>
            <tr>
               <td colspan="2">Shipping Price:</td>
               <td align="right"> $${order.shippingPrice}</td>
            </tr>
            <tr>
               <td colspan="2"><strong>Total Price:</strong></td>
               <td align="right"><strong> $${order.totalPrice}</strong></td>
            </tr>
            <tr>
               <td colspan="2">Payment Method:</td>
               <td align="right">${order.paymentMethod}</td>
            </tr>
            </table>
            <h2>Shipping address</h2>
            <p>
               ${order.shippingAddress.fullName},<br/>
               ${order.shippingAddress.address},<br/>
               ${order.shippingAddress.city},<br/>
               ${order.shippingAddress.country},<br/>
               ${order.shippingAddress.postalCode}<br/>
            </p>
            <hr/>
            <p>
               Thanks for shopping with us.
            </p>
      </table>

   `
}
