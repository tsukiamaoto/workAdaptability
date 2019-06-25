import * as types from '../actions/types'
import { combineReducers } from 'redux'

const initialState = {
  isLogin: false,
  isLogout: false,
  error: '',
  user: {}
}

const account = combineReducers({
  fetch: (state = initialState, action) => {
    switch(action.type){
      case types.USER_LOGIN_REQUEST:
        return {
          ...state
        }
      case types.USER_LOGIN_SUCCESS:
        return {
          isLogin: true,
          user: action.payload.user
        }
      case types.USER_LOGIN_FAILURE:
        return {
          err: action.err
        }
      default:
        return state
    }
  },
  login: (state = initialState, action) => {
    switch(action.type){
      case types.LOGIN_REQUEST:
        return {
          ...state,
        }
      case types.LOGIN_SUCCESS:
        return {
          ...state,
          isLogin: true,
          user: action.payload.user
        }
      case types.LOGIN_FAILURE:
        return {
          error: action.payload.err
        }
      default:
        return state
    }
  },
  logout: (state= initialState, action) => {
    switch(action.type){
      case types.LOGOUT_REQUEST:
        return {
          ...state
        }
      case types.LOGOUT_SUCCESS:
        return {
          ...state,
          isLogout:true,
        }
      case types.LOGOUT_FAILURE:
        return {
          error: action.payload.err
        }
      default:
        return state
    }
  },
  register: (state = initialState, action) => {
    switch(action.type){
      case types.REGISTER_REQUEST:
        return {
          ...state,
          loading: true
        }
      case types.REGISTER_SUCCESS:
        return {
          ...state,
          loading: false,
        }
      case types.REGISTER_FAILURE:
        return {
          error: true
        }
      default:
        return state
    }
  }
})
export default account
