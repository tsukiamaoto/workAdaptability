import * as types from '../actions/types'

const initialState = {
  loading: true,
  error: false,
  user: []
}

const user = (state = initialState, action) => {
  switch(action.type){
    case types.INFORMATION_REQUEST:
      return {
        ...state,
        loading: true
      }
    case types.INFORMATION_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.user
      }
    case types.INFORMATION_FAILURE:
      return {
        error: true
      }
    default:
      return state
  }
}

export default user
