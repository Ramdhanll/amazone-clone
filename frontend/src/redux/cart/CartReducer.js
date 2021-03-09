import { CART_ADD_ITEM, SUCCESS } from "./CartTypes";

const initialState = {
   cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
}

export const cart = (state = initialState, action) => {
   switch (action.type) {
      case SUCCESS:
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
         return { ...state, cartItems: [ ...state.cartItems, item ]}

      default:
         return state;
   }
}
