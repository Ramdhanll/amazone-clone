import axios from 'axios'
import {
   PRODUCT_LIST_REQUEST,
   PRODUCT_LIST_SUCCESS,
   PRODUCT_LIST_FAIL
} from './ProductTypes'

import store from '../store'

export const listProducts = async () => {
   store.dispatch({type: PRODUCT_LIST_REQUEST})
   try {
      const { data } = await axios.get('http://localhost:5000/api/products')
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