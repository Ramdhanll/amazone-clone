import { combineReducers } from 'redux'
import { productList, productDetails } from './product/ProductReducer'

const rootReducer = combineReducers({
   productList,
   productDetails
})

export default rootReducer