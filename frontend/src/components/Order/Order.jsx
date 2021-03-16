import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { detailsOrder } from '../../redux'
import LoadingBox from '../utils/LoadingBox'
import MessageBox from '../utils/MessageBox'

const Order = (props) => {
   const orderId = props.match.params.id
   const dispatch = useDispatch()
   const orderDetails = useSelector(state => state.orderDetails)
   const { order, loading, error } = orderDetails
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
      dispatch(detailsOrder(orderId))
   }, [dispatch, orderId])

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
                  </ul>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Order
