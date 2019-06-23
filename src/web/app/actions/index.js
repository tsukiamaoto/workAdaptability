import { createAction } from 'redux-actions'
import * as types from './types'

const loadHomePage = createAction(types.HOME_REQUEST, payload => payload)
loadHomePage.success = createAction(types.HOME_SUCCESS, response => response)
loadHomePage.failure = createAction(types.HOME_FAILURE, error => error)

const pagination = createAction(types.PAGINATION_REQUEST, page => page)
pagination.success = createAction(types.PAGINATION_SUCCESS, response => response)
pagination.failure = createAction(types.PAGINATION_FAILURE, error => error)

const login = createAction(types.LOGIN_REQUEST, user => user)
login.success = createAction(types.LOGIN_SUCCESS, response => response)
login.failure = createAction(types.LOGIN_FAILURE, error => error)

const register = createAction(types.REGISTER_REQUEST, user => user)
register.success = createAction(types.REGISTER_SUCCESS, response => response)
register.failure = createAction(types.REGISTER_FAILURE, error => error)

const queryJob = createAction(types.JOBS_QUERY, query => query)
queryJob.success = createAction(types.JOBS_QUERY_SUCCESS, response => response)
queryJob.failure = createAction(types.JOBS_QUERY_FAILURE, error => error)

const fetchJob = createAction(types.JOBS_FETCH, options => options)
fetchJob.request = createAction(types.JOBS_REQUEST, payload => undefined)
fetchJob.success = createAction(types.JOBS_SUCCESS, (payload, response) => response)
fetchJob.failure = createAction(types.JOBS_FAILURE, error => error)

const fetchResume = createAction(types.RESUME_FETCH, options => options)
fetchResume.request = createAction(types.RESUME_REQUEST, payload => undefined)
fetchResume.success = createAction(types.RESUME_SUCCESS, (payload, response) => response)
fetchResume.failure = createAction(types.REGISTER_FAILURE, error => error)

const updateResume = createAction(types.RESUME_UPDATE_REQUEST, user => user)
updateResume.success = createAction(types.RESUME_UPDATE_SUCCESS, response => response)
updateResume.failure = createAction(types.RESUME_UPDATE_FAILURE, error => error)

const fetchInfromation = createAction(types.INFORMATION_FETCH, options => options)
fetchInfromation.request = createAction(types.INFORMATION_FETCH, payload => undefined)
fetchInfromation.success = createAction(types.INFORMATION_SUCCESS, (payload, response) => response)
fetchInfromation.failure = createAction(types.INFORMATION_FAILURE, error => error)

export {
  loadHomePage,
  login,
  pagination,
  register,
  fetchJob,
  queryJob,
  updateResume,
  fetchResume,
  fetchInfromation,
}
