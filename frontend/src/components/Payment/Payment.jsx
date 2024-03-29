// import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../../redux'
import CheckoutSteps from '../utils/CheckoutSteps'

const Payment = (props) => {
   const cart = useSelector(state => state.cart)
   const { shippingAddress } = cart
   if (!shippingAddress.address) {
      props.history.push('/shipping')
   }
   
   const [paymentMethod, setPaymentMethod] = useState('PayPal')
   const dispatch = useDispatch()

   const submitHandler = async e => {
      e.preventDefault()
      // const { data } = await axios.post('/api/payment')
      // console.log(data)
      // window.snap.pay(data.transactionToken)

      dispatch(savePaymentMethod(paymentMethod))
      props.history.push('/placeorder')
   }
   return (
      <div>
         <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
         <form className="form" onSubmit={submitHandler}>
            <div>
               <h1>Payment Method</h1>
            </div>
            <div>
               <div>
                  <input 
                     type="radio" 
                     id="paypal" 
                     value="PayPal" 
                     name="paymentMethod" 
                     required 
                     checked
                     onChange={e => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="paypal">PayPal</label>
               </div>
            </div>
            <div>
               <div>
                  <input 
                     type="radio" 
                     id="stripe" 
                     value="Stripe" 
                     name="paymentMethod" 
                     required 
                     onChange={e => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="stripe">Stripe</label>
               </div>
            </div>
            <div>
               <button className="primary" type="submit">
                  Continue
               </button>
            </div>
         </form>
      </div>
   )
}

export default Payment
