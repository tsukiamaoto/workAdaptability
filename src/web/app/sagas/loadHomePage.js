import { take, put, call, fork, takeEvery } from 'redux-saga/effects'
import * as actions from '../actions'
import * as types from '../actions/types'
import api from '../services'

function* loadHomePage(action){
  const page = action.payload
  try {
    const jobs = yield call(api.job.fetchJobs,page)
    yield put(actions.loadHomePage.success(jobs))
  } catch(err){
    yield put(actions.loadHomePage.failure(err.message))
  }
}

function* watchLoadHomePage() {
  while(true){
    const action = yield take(types.HOME_REQUEST)
    yield call(loadHomePage,action)
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

function* queryJob(action) {
  const payload = action.payload
  try {
    const jobs = yield call(api.job.queryJob,payload)
    yield put(actions.queryJob.success(jobs))
  } catch (err) {
    yield put(actions.queryJob.failure(err.message))
  }
}

function* watchQueryJob() {
  while(true){
    const action = yield take(types.JOBS_QUERY)
    yield call(queryJob,action)
  }
}

export default [
  fork(watchLoadHomePage),
  fork(watchJobPagination),
  fork(watchQueryJob)
]

