import axios from 'axios'
import {
   PRODUCT_LIST_REQUEST,
   PRODUCT_LIST_SUCCESS,
   PRODUCT_LIST_FAIL,
   PRODUCT_DETAILS_REQUEST,
   PRODUCT_DETAILS_SUCCESS,
   PRODUCT_DETAILS_FAIL
} from './ProductTypes'

import store from '../store'

export const listProducts = async () => {
   store.dispatch({type: PRODUCT_LIST_REQUEST})
   try {
      const { data } = await axios.get('/api/products')
      return {
         type: PRODUCT_LIST_SUCCESS,
         payload: data.products
      }
   } catch (error) {
      return {
         type: PRODUCT_LIST_FAIL,
         payload: error.message
      }
   }
}

export const detailsProduct = async (productId) => {
   store.dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId})

   try {
      const { data } = await axios.get(`/api/products/${productId}`)
      return {
         type: PRODUCT_DETAILS_SUCCESS,
         payload: data
      }
   } catch (error) {
      return {
         type: PRODUCT_DETAILS_FAIL,
         payload: error.response && error.response.data.message 
                     ? error.response.data.message : error.message
      }
   }
}