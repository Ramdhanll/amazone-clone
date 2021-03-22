import axios from 'axios'
import {
   ORDER_CREATE_REQUEST,
   ORDER_CREATE_SUCCESS,
   ORDER_CREATE_FAIL,
   ORDER_DETAILS_REQUEST,
   ORDER_DETAILS_FAIL,
   ORDER_DETAILS_SUCCESS,
   ORDER_PAY_REQUEST,
   ORDER_PAY_FAIL,
   ORDER_PAY_SUCCESS,
   ORDER_MINE_LIST_REQUEST,
   ORDER_MINE_LIST_FAIL,
   ORDER_MINE_LIST_SUCCESS,
   ORDER_LIST_REQUEST,
   ORDER_LIST_SUCCESS,
   ORDER_LIST_FAIL,
} from './OrderTypes'

import { CART_EMPTY } from '../cart/CartTypes'

export const createOrder = order => async (dispatch, getState) => {
   dispatch({ type: ORDER_CREATE_REQUEST })

   try {
      const { userSignin: { userInfo }} = getState()
      const { data } = await axios.post('/api/orders', order, {
         headers: {
            Authorization: `Bearer ${userInfo.token}`
         }
      })
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order })
      dispatch({ type: CART_EMPTY })
      localStorage.removeItem('cartItems')
   } catch (error) {
      dispatch({ type: ORDER_CREATE_FAIL, 
         payload: error.response && error.response.data.message ?
                  error.response.data.message : error.message
      })
   }
}

export const detailsOrder = orderId => async (dispatch, getState) => {
   dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId })
   const { userSignin: { userInfo }} = getState()
   try {
      const { data } = await axios.get(`/api/orders/${orderId}`, {
         headers: {
            Authorization: `Bearer ${userInfo.token}`
         }
      })
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data})
   } catch (error) {
      dispatch({ type: ORDER_DETAILS_FAIL, payload: error.response && error.response.data.message ? 
         error.response.data.message : error.message
      })
   }
}

export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
   dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } })

   const { userSignin: { userInfo } } = getState()

   try {
      const { data } = axios.put(`/api/orders/${order._id}/pay`, paymentResult, {
         headers: {
            Authorization: `Bearer ${userInfo.token}`
         }
      })
      dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
   } catch (error) {
      dispatch({ type: ORDER_PAY_FAIL, payload: error.response && error.response.data.message ? 
         error.response.data.message : error.message
      })
   }
}


export const listOrderMine = () => async (dispatch, getState) => {
   dispatch({ type: ORDER_MINE_LIST_REQUEST })
   const { userSignin: { userInfo }} = getState()

   try {
      const { data } = await axios.get('/api/orders/mine', {
         headers: {
            Authorization: `Bearer ${userInfo.token}`
         }
      })
      dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data })
   } catch (error) {
      dispatch({ type: ORDER_MINE_LIST_FAIL, payload: error.response && error.response.data.message ? 
         error.response.data.message : error.message
      })
   }
}

export const listOrders = () => async (dispatch, getState) => {
   const { userSignin: { userInfo }} = getState()
   dispatch({type: ORDER_LIST_REQUEST})

   try {
      const { data } = await axios.get('/api/orders', {
         headers: {
            Authorization: `Bearer ${userInfo.token}`
         }
      })
      dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
   } catch (error) {
      console.log(error)
      dispatch({
         type: ORDER_LIST_FAIL,
         payload: 'kaka'
         // payload: error.message && error.response.data.message ? 
         //    error.response.data.message : error.message
      })
   }
}