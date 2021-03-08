import {
   PRODUCT_LIST_REQUEST,
   PRODUCT_LIST_SUCCESS,
   PRODUCT_LIST_FAIL,
   PRODUCT_DETAILS_REQUEST,
   PRODUCT_DETAILS_SUCCESS,
   PRODUCT_DETAILS_FAIL
} from './ProductTypes'

// eslint-disable-next-line import/no-anonymous-default-export
export const productList = ( state = { loading: true, products: [] }, action) => {
   switch (action.type) {
      case PRODUCT_LIST_REQUEST:
         return { loading: true }
      case PRODUCT_LIST_SUCCESS:
         return { loading: false, products: action.payload }
      case PRODUCT_LIST_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const productDetails = (state= { loading: true, product: []}, action) => {
   switch (action.type) {
      case PRODUCT_DETAILS_REQUEST:
         return { loading: true }
      case PRODUCT_DETAILS_SUCCESS:
         return { loading: false, product: action.payload }
      case PRODUCT_DETAILS_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state;
   }
}