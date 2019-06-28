import * as types from '../actions/types'

const initialState = {
  loading: true,
  error: '',
  payload: {}
}

const homePage = (state = initialState, action) => {
  switch(action.type){
    case types.HOME_REQUEST:
    case types.JOBS_QUERY:
      return {
        ...state
      }
    case types.HOME_SUCCESS:
    case types.JOBS_QUERY_SUCCESS:
      return {
        ...state,
        loading: false,
        payload: action.payload
      }
    case types.HOME_FAILURE:
    case types.JOBS_QUERY_FAILURE:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}


export default homePage
