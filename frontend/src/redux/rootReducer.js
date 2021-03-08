import { combineReducers } from 'redux'
import productList from './product/ProductReducer'

const rootReducer = combineReducers({
   productList
})

export default rootReducer