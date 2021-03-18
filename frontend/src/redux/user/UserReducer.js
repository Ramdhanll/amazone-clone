import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_RESET, USER_UPDATE_PROFILE_SUCCESS } from "./UserTypes"

const initialStateUserSignin = {
   userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

export const userSignin = (state = initialStateUserSignin, action) => {
   switch (action.type) {
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

const userDetailsState = {
   loading: true
}

export const userDetails = (state = userDetailsState, action) => {
   switch (action.type) {
      case USER_DETAILS_REQUEST:
         return { loading: true }
      case USER_DETAILS_SUCCESS:
         return { loading: false, user: action.payload }
      case USER_DETAILS_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

const userUpdateProfileState = {}

export const userUpdateProfile = (state = userUpdateProfileState, action) => {
   switch (action.type) {
      case USER_UPDATE_PROFILE_REQUEST:
         return { loading: true }
      case USER_UPDATE_PROFILE_SUCCESS:
         return { loading: false, success: true }
      case USER_UPDATE_PROFILE_FAIL:
         return { loading: false, error: action.payload }
      case USER_UPDATE_PROFILE_RESET:
         return {}
      default:
         return state
   }
}