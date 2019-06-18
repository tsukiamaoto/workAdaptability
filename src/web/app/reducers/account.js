import * as types from '../actions/types'
import { combineReducers } from 'redux'

const initialState = {
  loading: true,
  error: '',
  user: {}
}

const account = combineReducers({
  login: (state = initialState, action) => {
    switch(action.type){
      case types.LOGIN_REQUEST:
        return {
          ...state,
          loading: true
        }
      case types.LOGIN_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.user
        }
      case types.LOGIN_FAILURE:
        return {
          error: true
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
