import { combineReducers } from 'redux'
import { productList, productDetails, productCreate } from './product/ProductReducer'
import { cart } from './cart/CartReducer'
import { userRegister, userSignin, userDetails, userUpdateProfile } from './user/UserReducer'
import { orderCreate, orderDetails, orderPay, orderMineList } from './order/OrderReducer'

const rootReducer = combineReducers({
   productList,
   productDetails,
   productCreate,
   cart,
   userSignin,
   userRegister,
   orderCreate,
   orderDetails,
   orderPay,
   orderMineList,
   userDetails,
   userUpdateProfile
})

export default rootReducer