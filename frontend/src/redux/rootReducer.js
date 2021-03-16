import { combineReducers } from 'redux'
import { productList, productDetails } from './product/ProductReducer'
import { cart } from './cart/CartReducer'
import { userRegister, userSignin } from './user/UserReducer'
import { orderCreate, orderDetails } from './order/OrderReducer'

const rootReducer = combineReducers({
   productList,
   productDetails,
   cart,
   userSignin,
   userRegister,
   orderCreate,
   orderDetails
})

export default rootReducer