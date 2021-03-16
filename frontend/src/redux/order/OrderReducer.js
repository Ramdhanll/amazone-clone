import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from "./OrderTypes";

const orderCreateState = {}

export const orderCreate = (state = orderCreateState, action) => {
   switch (action.type) {
      case ORDER_CREATE_REQUEST:
         return { loading: true }
      case ORDER_CREATE_SUCCESS:
         return { loading: false, success: true, order: action.payload }
      case ORDER_CREATE_FAIL:
         return { loading: false, error: action.payload }
      case ORDER_CREATE_RESET:
         return {}
      default:
         return state
   }
}

const orderDetailsState = {
   loading: true,
   order: {}
}

export const orderDetails = (state = orderDetailsState, action) => {
   switch (action.type) {
      case ORDER_DETAILS_REQUEST:
         return { ...state, loading: true}
      case ORDER_DETAILS_SUCCESS:
         return { ...state, loading: false, order: action.payload }
      case ORDER_DETAILS_FAIL:
         return { ...state, loading: false, error: action.payload }
      default:
         return state
   }
}
