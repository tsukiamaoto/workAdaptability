import { take, put, call, fork, takeEvery } from 'redux-saga/effects'
import * as actions from '../actions'
import * as types from '../actions/types'
import api from '../services'

function* login(action) {
  try {
    const account = action.payload
    const user = yield call(api.account.login,account)
    yield put(actions.login.success(user))
  } catch(err) {
    yield put(actions.login.failure(err.message))
  }
}

function* watchLogin() {
  while(true){
    const action = yield take(types.LOGIN_REQUEST)
    yield call(login,action)
  }
}

function* register(action) {
  try {
    const account = action.payload
    const user = yield call(api.account.register(account))
    yield put(actions.register.success(user))
  } catch(err) {
    yield put(actions.register.failure(err))
  }
}

function* watchRegister() {
  while(true){
    const action = yield take(types.REGISTER_REQUEST)
    yield call(register,action)
  }
}

export default [
  fork(watchLogin),
  fork(watchRegister)
]
