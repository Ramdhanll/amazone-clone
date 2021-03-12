import { DONE, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from "./UserTypes"

const initialState = {
   loading: true,
   userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}
}

export const userSignin = (state = initialState, action) => {
   switch (action.type) {
      case DONE:
         return state
      case USER_SIGNIN_REQUEST: 
         return { loading: true }
      case USER_SIGNIN_SUCCESS:
         return { loading: false, userInfo: action.payload }
      case USER_SIGNIN_FAIL:
         return { loading: false, error: action.payload }
      case USER_SIGNOUT:
         return {}
      default:
         return state
   }
}