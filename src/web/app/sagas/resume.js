import { take, put, call, fork, takeEvery } from 'redux-saga/effects'
import * as actions from '../actions'
import * as types from '../actions/types'
import api from '../services'

function* updateResume(user) {
  try {
    const resume = yield call(api.resume.update,user)
    yield put(actions.updateResume.success(resume))
  } catch(err){
    yield put(actions.updateResume.failure(err.message))
  }
}

function* watchUpdateResume() {
  while(true){
    const user = yield take(types.RESUME_UPDATE_REQUEST)
    yield call(updateResume,user)
  }
}

function* fetchResume() {
  try {
    yield put(actions.fetchResume.request)
    const resume = yield call(api.resume.get)
    yield put(actions.fetchResume.success(resume))
  } catch(err) {
    yield put(actions.fetchResume.failure(err.message))
  }
}

function* wathFetchResume() {
  while(true){
    yield take(types.RESUME_FETCH)
    yield call(fetchResume)
  }
}

export default [
  fork(watchUpdateResume),
]

