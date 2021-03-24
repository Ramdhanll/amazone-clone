import { combineReducers } from 'redux'
import { productList, productDetails, productCreate, productUpdate, productDelete } from './product/ProductReducer'
import { cart } from './cart/CartReducer'
import { userRegister, userSignin, userDetails, userUpdateProfile, userList } from './user/UserReducer'
import { orderCreate, orderDetails, orderPay, orderMineList, orderList, orderDelete, orderDeliver } from './order/OrderReducer'

const rootReducer = combineReducers({
   userSignin,
   userRegister,
   userDetails,
   userUpdateProfile,
   userList,
   productList,
   productDetails,
   productCreate,
   productUpdate,
   productDelete,
   cart,
   orderList,
   orderCreate,
   orderDelete,
   orderDetails,
   orderPay,
   orderMineList,
   orderDeliver,
})

export default rootReducer