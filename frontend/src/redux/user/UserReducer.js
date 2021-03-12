import { DONE, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from "./UserTypes"

const initialStateUserSignin = {
   userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

export const userSignin = (state = initialStateUserSignin, action) => {
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

const initialStateUserRegister = {

}

export const userRegister = (state = initialStateUserRegister, action) => {
   switch (action.type) {
      case DONE:
         return state
      case USER_REGISTER_REQUEST: 
         return { loading: true }
      case USER_REGISTER_SUCCESS:
         return { loading: false, userInfo: action.payload }
      case USER_REGISTER_FAIL:
         return { loading: false, error: action.payload }
      case USER_SIGNOUT:
         return {}
      default:
         return state
   }
}