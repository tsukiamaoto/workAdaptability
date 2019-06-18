import * as types from '../actions/types'

const initialState = {
  loading: true,
  error: '',
  payload: {}
}

const homePage = (state = initialState, action) => {
  switch(action.type){
    case types.HOME_REQUEST:
    case types.PAGINATION_REQUEST:
      return {
        ...state,
        loading: true
      }
    case types.HOME_SUCCESS:
    case types.PAGINATION_SUCCESS:
      return {
        ...state,
        loading: false,
        payload: action.payload
      }
    case types.HOME_FAILURE:
    case types.PAGINATION_FAILURE:
      return {
        error: action.error
      }
    default:
      return state
  }
}


export default homePage
