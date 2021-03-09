import { combineReducers } from 'redux'
import { productList, productDetails } from './product/ProductReducer'
import { cart } from './cart/CartReducer'
const rootReducer = combineReducers({
   productList,
   productDetails,
   cart
})

export default rootReducer