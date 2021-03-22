import { combineReducers } from 'redux'
import { productList, productDetails, productCreate, productUpdate, productDelete } from './product/ProductReducer'
import { cart } from './cart/CartReducer'
import { userRegister, userSignin, userDetails, userUpdateProfile } from './user/UserReducer'
import { orderCreate, orderDetails, orderPay, orderMineList, orderList } from './order/OrderReducer'

const rootReducer = combineReducers({
   productList,
   productDetails,
   productCreate,
   productUpdate,
   productDelete,
   cart,
   userSignin,
   userRegister,
   orderList,
   orderCreate,
   orderDetails,
   orderPay,
   orderMineList,
   userDetails,
   userUpdateProfile,
})

export default rootReducer