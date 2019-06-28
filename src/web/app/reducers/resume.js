import * as types from '../actions/types'
import { combineReducers } from 'redux'

const initialState = {
  loading: true,
  error: '',
  payload: {}
}

const resume = (state = initialState, action) => {
  switch(action.type){
    case types.RESUME_REQUEST:
    case types.RESUME_UPDATE_REQUEST:
      return {
        ...state
      }
    case types.RESUME_SUCCESS:
    case types.RESUME_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        payload: action.payload.resume
      }
    case types.RESUME_FAILURE:
    case types.RESUME_UPDATE_FAILURE:
      return {
        ...state,
        error: action.payload.err
      }
    default:
      return state
  }
}



export default resume
