import axios from 'axios'
import {
   PRODUCT_LIST_REQUEST,
   PRODUCT_LIST_SUCCESS,
   PRODUCT_LIST_FAIL,
   PRODUCT_DETAILS_REQUEST,
   PRODUCT_DETAILS_SUCCESS,
   PRODUCT_DETAILS_FAIL,
   PRODUCT_CREATE_REQUEST,
   PRODUCT_CREATE_FAIL,
   PRODUCT_CREATE_SUCCESS,
   PRODUCT_UPDATE_REQUEST,
   PRODUCT_UPDATE_FAIL,
   PRODUCT_UPDATE_SUCCESS
} from './ProductTypes'


export const listProducts = () => async dispatch => {
   dispatch({type: PRODUCT_LIST_REQUEST})
   try {
      const { data } = await axios.get('/api/products')
      dispatch({
         type: PRODUCT_LIST_SUCCESS,
         payload: data.products
      })
   } catch (error) {
      dispatch({
         type: PRODUCT_LIST_FAIL,
         payload: error.message
      })
   }
}

export const detailsProduct = (productId) => async dispatch => {
   dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId})

   try {
      const { data } = await axios.get(`/api/products/${productId}`)
      dispatch({
         type: PRODUCT_DETAILS_SUCCESS,
         payload: data
      })
   } catch (error) {
      dispatch({
         type: PRODUCT_DETAILS_FAIL,
         payload: error.response && error.response.data.message 
                     ? error.response.data.message : error.message
      })
   }
}

export const createProduct = () => async (dispatch, getState) => {
   dispatch({ type: PRODUCT_CREATE_REQUEST })
   const { userSignin: { userInfo }} = getState()

   try {
      const { data } = await axios.post('/api/products', {}, {
         headers: {
            Authorization: `Bearer ${userInfo.token}`
         }
      })
      dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data.product })
   } catch (error) {
      dispatch({
         type: PRODUCT_CREATE_FAIL,
         payload: error.response && error.response.data.mesage ?
            error.response.data.message : error.message
      })
   }
}

export const updateProduct = product => async (dispatch, getState ) => {
   dispatch({ type: PRODUCT_UPDATE_REQUEST })
   const { userSignin: { userInfo }} = getState()

   try {
      const { data } = await axios.put(`/api/products/${product._id}`, product, {
         headers: {
            Authorization: `Bearer ${userInfo.token}`
         }
      })
      dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data})
   } catch (error) {
      dispatch({ 
         type: PRODUCT_UPDATE_FAIL,
         payload: error.message && error.response.data.message ? 
            error.response.data.message : error.message
      })
   }
}