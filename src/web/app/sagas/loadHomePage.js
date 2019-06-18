import { take, put, call, fork, takeEvery } from 'redux-saga/effects'
import * as actions from '../actions'
import * as types from '../actions/types'
import api from '../services'

function* loadHomePage(){
  try {
    const jobs = yield call(api.job.fetchAllJobs)
    yield put(actions.loadHomePage.success(jobs))
  } catch(err){
    yield put(actions.loadHomePage.failure(err.message))
  }
}

function* watchLoadHomePage() {
  while(true){
    yield take(types.HOME_REQUEST)
    yield call(loadHomePage)
  }
}

function* JobPagination(action){
  const page = action.payload
  try {
    const results = yield call(api.job.fetchPageJob,page)
    yield put(actions.pagination.success(results))
  } catch(err) {
    yield put(actions.pagination.failure(err.message))
  }
}

function* watchJobPagination() {
  while(true){
    const actioin = yield take(types.PAGINATION_REQUEST)
    yield call(JobPagination,actioin)
  }
}

export default [
  fork(watchLoadHomePage),
  fork(watchJobPagination)
]

