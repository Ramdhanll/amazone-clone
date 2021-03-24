import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_EMPTY, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from './CartTypes'

export const addToCart = (productId, qty) => async (dispatch, state) => {
   const { data } = await axios.get(`/api/products/${productId}`)
   dispatch({
      type: CART_ADD_ITEM,
      payload: {
         name: data.name,
         image: data.image,
         price: data.price,
         countInStock: data.countInStock,
         product: data._id,
         seller: data.seller,
         qty
      }
   })
   localStorage.setItem('cartItems', JSON.stringify(state().cart.cartItems))
}

export const removeFromCart = async (productId) => async (dispatch, state) => {
   dispatch({
      type: CART_REMOVE_ITEM,
      payload: productId
   })

   localStorage.setItem('cartItems', JSON.stringify(state().cart.cartItems))
}

export const removeAllFromCart = () => dispatch => {
   dispatch({
      type: CART_EMPTY
   })
}

export const saveShippingAddress = (data) => dispatch => {
   dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data})
   localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = data => dispatch => {
   dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data })
}