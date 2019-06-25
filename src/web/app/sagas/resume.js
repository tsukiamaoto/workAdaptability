import { take, put, call, fork, takeEvery } from 'redux-saga/effects'
import * as actions from '../actions'
import * as types from '../actions/types'
import api from '../services'

function* updateResume(action) {
  try {
    const resume = yield call(api.resume.updateResume,action)
    yield put(actions.updateResume.success(resume))
  } catch(err){
    yield put(actions.updateResume.failure(err.message))
  }
}

function* watchUpdateResume() {
  while(true){
    const action = yield take(types.RESUME_UPDATE_REQUEST)
    yield call(updateResume,action)
  }
}

function* fetchResume(action) {
  try {
    const user = action.payload
    const resume = yield call(api.resume.fetchResume, user)
    yield put(actions.fetchResume.success(resume))
  } catch(err) {
    yield put(actions.fetchResume.failure(err.message))
  }
}

function* wathFetchResume() {
  while(true){
    const action = yield take(types.RESUME_FETCH)
    yield call(fetchResume, action)
  }
}

export default [
  fork(watchUpdateResume),
  fork(wathFetchResume)
]

