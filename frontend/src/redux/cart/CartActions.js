import axios from 'axios'
import { CART_ADD_ITEM, SUCCESS } from './CartTypes'
import store from '../store'

export const addToCart = async (productId, qty) => {
   const { data } = await axios.get(`/api/products/${productId}`)
   store.dispatch({
      type: CART_ADD_ITEM,
      payload: {
         name: data.name,
         image: data.image,
         price: data.price,
         countInStock: data.countInStock,
         product: data._id,
         qty
      }
   })
   localStorage.setItem('cartItems', JSON.stringify(store.getState().cart.cartItems))

   return {type: SUCCESS}
   
}