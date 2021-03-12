import { CART_ADD_ITEM, CART_REMOVE_ALL, CART_REMOVE_ITEM, DONE } from "./CartTypes";

const initialState = {
   cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
}

export const cart = (state = initialState, action) => {
   switch (action.type) {
      case DONE:
         return state
      case CART_ADD_ITEM:
         const item = action.payload
         const existItem = state.cartItems.find(x => x.product === item.product)
         if (existItem) {
            return {
               ...state,
               cartItems: state.cartItems.map( x => x.product === existItem.product ? item : x )
            }
         }
         return { 
            ...state, 
            cartItems: [ ...state.cartItems, item ]
         }
      case CART_REMOVE_ITEM:
         return { 
            ...state, 
            cartItems: state.cartItems.filter( x => x.product !== action.payload)
         }
      case CART_REMOVE_ALL:
         return { cartItems: []}
      default:
         return state;
   }
}
