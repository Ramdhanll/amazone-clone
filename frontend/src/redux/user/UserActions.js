import axios from 'axios'
import { CART_REMOVE_ALL } from '../cart/CartTypes'
import store from '../store'
import {
   DONE,
   USER_SIGNIN_REQUEST,
   USER_SIGNIN_FAIL,
   USER_SIGNIN_SUCCESS,
   USER_SIGNOUT,
   USER_REGISTER_REQUEST,
   USER_REGISTER_SUCCESS,
   USER_REGISTER_FAIL
} from './UserTypes'

export const signin = async (email, password) => {
   store.dispatch({
      type: USER_SIGNIN_REQUEST,
      payload: { email, password }
   })

   try {
      const { data } = await axios.post('/api/users/signin', { email, password })
      store.dispatch({
         type: USER_SIGNIN_SUCCESS,
         payload: data
      })
      localStorage.setItem('userInfo', JSON.stringify(data))
      return {
         type: DONE
      }
   } catch (error) {
      return {
         type: USER_SIGNIN_FAIL,
         payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message
      }
   }
}

export const register = async (name, email, password) => {
   store.dispatch({
      type: USER_REGISTER_REQUEST,
      payload: { email, password }
   })

   try {
      const { data } = await axios.post('/api/users/register', { name, email, password })
      store.dispatch({type: USER_REGISTER_SUCCESS,payload: data})
      store.dispatch({type: USER_SIGNIN_SUCCESS,payload: data})
      localStorage.setItem('userInfo', JSON.stringify(data))
      return {
         type: DONE
      }
   } catch (error) {
      return {
         type: USER_REGISTER_FAIL,
         payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message
      }
   }
}

export const signout = () => {
   localStorage.removeItem('userInfo')
   localStorage.removeItem('cartItems')
   store.dispatch({
      type: CART_REMOVE_ALL
   })
   return {
      type: USER_SIGNOUT
   }
}
