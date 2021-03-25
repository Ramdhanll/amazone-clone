import { 
   USER_DELETE_FAIL, 
   USER_DELETE_REQUEST, 
   USER_DELETE_RESET, 
   USER_DELETE_SUCCESS, 
   USER_DETAILS_FAIL, 
   USER_DETAILS_REQUEST, 
   USER_DETAILS_SUCCESS, 
   USER_DETAILS_RESET,
   USER_LIST_FAIL, 
   USER_LIST_REQUEST, 
   USER_LIST_SUCCESS, 
   USER_REGISTER_FAIL, 
   USER_REGISTER_REQUEST, 
   USER_REGISTER_SUCCESS, 
   USER_SIGNIN_FAIL, 
   USER_SIGNIN_REQUEST, 
   USER_SIGNIN_SUCCESS, 
   USER_SIGNOUT, 
   USER_UPDATE_FAIL, 
   USER_UPDATE_PROFILE_FAIL, 
   USER_UPDATE_PROFILE_REQUEST, 
   USER_UPDATE_PROFILE_RESET, 
   USER_UPDATE_PROFILE_SUCCESS, 
   USER_UPDATE_REQUEST, 
   USER_UPDATE_RESET, 
   USER_UPDATE_SUCCESS, 
   USER_TOPSELLERS_LIST_REQUEST,
   USER_TOPSELLERS_LIST_SUCCESS,
   USER_TOPSELLERS_LIST_FAIL
} from "./UserTypes"

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
      case USER_DETAILS_RESET:
         return { loading: true }
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

export const userList = (state = { loading: true }, action) => {
   switch (action.type) {
      case USER_LIST_REQUEST:
         return { loading: true }
      case USER_LIST_SUCCESS:
         return { loading: false, users: action.payload}
      case USER_LIST_FAIL:
         return { loading: false, error: action.payload}
      default:
         return state
   }
}

export const userDelete = (state = { }, action) => {
   switch (action.type) {
      case USER_DELETE_REQUEST:
         return { loading: true }
      case USER_DELETE_SUCCESS:
         return { loading: false, success: true }
      case USER_DELETE_FAIL:
         return { loading: false, error: action.payload }
      case USER_DELETE_RESET:
         return {}
      default:
         return state
   }
}

export const userUpdate = (state={}, action) => {
   switch (action.type) {
      case USER_UPDATE_REQUEST:
         return { loading: true }
      case USER_UPDATE_SUCCESS:
         return { loading: false, success: true, user: action.payload }
      case USER_UPDATE_FAIL:
         return { loading: false, error: action.payload }
      case USER_UPDATE_RESET:
         return {}
      default:
         return state
   }
}

export const userTopSellersList = (state = { users: []}, action) => {
   switch (action.type) {
      case USER_TOPSELLERS_LIST_REQUEST:
         return { loading: true }
      case USER_TOPSELLERS_LIST_SUCCESS:
         return { loading: false, users: action.payload }
      case USER_TOPSELLERS_LIST_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}