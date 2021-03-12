import { combineReducers } from 'redux'
import { productList, productDetails } from './product/ProductReducer'
import { cart } from './cart/CartReducer'
import { userRegister, userSignin } from './user/UserReducer'

const rootReducer = combineReducers({
   productList,
   productDetails,
   cart,
   userSignin,
   userRegister
})

export default rootReducer