import { CART_ADD_ITEM, CART_ADD_ITEM_FAIL, CART_EMPTY, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "./CartTypes";

const initialState = {
   cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
   shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {},
   paymentMethod: 'PayPal'
}

export const cart = (state = initialState, action) => {
   switch (action.type) {
      case CART_ADD_ITEM:
         const item = action.payload
         const existItem = state.cartItems.find(x => x.product === item.product)
         if (existItem) {
            return {
               ...state,
               error: '',
               cartItems: state.cartItems.map( x => x.product === existItem.product ? item : x )
            }
         }
         return { 
            ...state, 
            error: '',
            cartItems: [ ...state.cartItems, item ]
         }
      case CART_REMOVE_ITEM:
         return { 
            ...state, 
            error: '',
            cartItems: state.cartItems.filter( x => x.product !== action.payload)
         }
      case CART_ADD_ITEM_FAIL:
         return { ...state, error: action.payload }
      case CART_EMPTY:
         return { ...state, error: '', cartItems: [],}
      case CART_SAVE_SHIPPING_ADDRESS:
         return {...state, shippingAddress: action.payload}
      case CART_SAVE_PAYMENT_METHOD:
         return {...state, paymentMethod: action.payload}
      default:
         return state;
   }
}
