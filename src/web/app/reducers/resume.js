import * as types from '../actions/types'
import { combineReducers } from 'redux'

const initialState = {
  loading: true,
  error: '',
  payload: {}
}

const resume = (state = initialState, action) => {
  console.log(action)
  switch(action.type){
    case types.RESUME_UPDATE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case types.RESUME_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        payload: action.resume
      }
    case types.RESUME_UPDATE_FAILURE:
      return {
        ...state,
        error: true
      }
    default:
      return state
  }
}



export default resume
