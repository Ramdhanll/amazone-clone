import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PayPalButton } from 'react-paypal-button-v2'
import { detailsOrder, payOrder } from '../../redux'
import LoadingBox from '../utils/LoadingBox'
import MessageBox from '../utils/MessageBox'
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../../redux/order/OrderTypes'
import { deliverOrder } from '../../redux/index'

const Order = (props) => {
   const orderId = props.match.params.id
   const [sdkReady, setSdkReady] = useState(false)
   const dispatch = useDispatch()
   const orderDetails = useSelector(state => state.orderDetails)
   const { order, loading, error } = orderDetails

   const orderPay = useSelector(state => state.orderPay)
   const { error: errorPay, loading: loadingPay, success: successPay } = orderPay

   const userSignin = useSelector(state => state.userSignin)
   const { userInfo } = userSignin

   const orderDeliver = useSelector(state => state.orderDeliver)
   const { loading: loadingDeliver, error: errorDeliver, success: successDeliver } = orderDeliver

   const { 
      orderItems, 
      shippingAddress, 
      paymentMethod, 
      itemsPrice, 
      shippingPrice, 
      taxPrice, 
      totalPrice,
      isDelivered,
      deliveredAt,
      isPaid,
      paidAt
   } = order

   useEffect(() => {
      const addPayPalScript = async () => {
         const { data } = await axios.get('/api/config/paypal')
         const script = document.createElement('script')
         script.type = "text/javascript"
         script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
         script.async = true
         script.onload = () => {
            setSdkReady(true)
         }
         document.body.appendChild(script)
      }
      

      if (Object.keys(order).length === 0 || successPay || successDeliver || (order && order._id !== orderId)) {
         dispatch({type: ORDER_PAY_RESET})
         dispatch({type: ORDER_DELIVER_RESET})
         dispatch(detailsOrder(orderId))
      } else {
         if (!isPaid) {
            if (!window.paypal) {
               addPayPalScript()
            } else {
               setSdkReady(true)
            }
         }
      }
   }, [dispatch, order, orderId, isPaid, sdkReady, successPay, successDeliver])

   const successPaymentHandler = (paymentResult) => {
      dispatch(payOrder(order, paymentResult))
   }

   const deliverHandler = e => {
      dispatch(deliverOrder(order._id));
   }

   return loading ? (
      <LoadingBox/>
   ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
   ) : (
      <div>
         <h1>Order {order._id}</h1>
         <div className="row top">
            <div className="col-2">
               <ul>
                  <li>
                     <div className="card card-body">
                        <h2>Shipping</h2>
                        <p>
                           <strong>Name:</strong> {shippingAddress.fullName} <br/>
                           <strong>Address:</strong> {shippingAddress.address},
                           {shippingAddress.city}, {shippingAddress.postalCode},
                           {shippingAddress.country}
                        </p>
                        { isDelivered ? 
                           <MessageBox variant="success">Delivered at {deliveredAt}</MessageBox>:
                           <MessageBox variant="danger">Not Delivered</MessageBox>
                        }
                     </div>
                  </li>
                  <li>
                     <div className="card card-body">
                        <h2>Payment</h2>
                        <p>
                           <strong>Method:</strong> {paymentMethod}
                        </p>
                        { isPaid ? 
                           <MessageBox variant="success">Paid at {paidAt}</MessageBox>:
                           <MessageBox variant="danger">Not Paid</MessageBox>
                        }
                     </div>
                  </li>
                  <li>
                     <div className="card card-body">
                        <h2>Order Items</h2>
                        <ul>
                           {
                              orderItems.map(item => (
                                 <li key={item.product}>
                                    <div className="row">
                                       <div>
                                          <img src={item.image} alt={item.name} className="small"/>
                                       </div>
                                       <div className="min-30">
                                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                                       </div>
                                       <div>
                                          {item.qty} x Rp.{item.price} = Rp.{item.qty * item.price}
                                       </div>
                                    </div>
                                 </li>
                              ))
                           }
                        </ul>
                     </div>
                  </li>
               </ul>
            </div>
            <div className="col-1">
               <div className="card card-body">
                  <ul>
                     <li>
                        <h2>Order Summary</h2>
                     </li>
                     <li>
                        <div className="row">
                           <div>Items</div>
                           <div>Rp.{itemsPrice}</div>
                        </div>
                     </li>
                     <li>
                        <div className="row">
                           <div>Shipping</div>
                           <div>Rp.{shippingPrice}</div>
                        </div>
                     </li>
                     <li>
                        <div className="row">
                           <div>Tax</div>
                           <div>Rp.{taxPrice}</div>
                        </div>
                     </li>
                     <li>
                        <div className="row">
                           <div> 
                              <strong>Order Total</strong> 
                           </div>
                           <div> 
                              <strong>Rp.{totalPrice}</strong>
                           </div>
                        </div>
                     </li>
                     {
                        !isPaid && (
                           <li>
                              {
                                 !sdkReady ? (<LoadingBox/>) :
                                 <>
                                    {errorPay && <MessageBox variant="danger">{errorPay}</MessageBox>}
                                    {loadingPay && <LoadingBox />}
                                    <PayPalButton 
                                       amount={totalPrice} 
                                       onSuccess={successPaymentHandler} 
                                    />
                                 </>
                              }
                           </li>
                        )
                     }
                     {
                        userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                           <li>
                              {loadingDeliver && <LoadingBox></LoadingBox>}
                              {errorDeliver && (
                              <MessageBox variant="danger">{errorDeliver}</MessageBox>
                              )}
                              <button
                              type="button"
                              className="primary block"
                              onClick={deliverHandler}
                              >
                              Deliver Order
                              </button>
                           </li>
                        )
                     }
                  </ul>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Order
