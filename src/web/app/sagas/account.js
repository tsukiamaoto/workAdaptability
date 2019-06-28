import { take, put, call, fork } from 'redux-saga/effects'
import * as actions from '../actions'
import * as types from '../actions/types'
import api from '../services'
import history from '../../store/history'

function* fetchUser() {
  try {
    const user = yield call(api.account.fetchUser)
    yield put(actions.fetchUser.success(user))
  } catch(err) {
    yield put(actions.fetchUser.failure(err.message))
  }
}

function* watchFetchUser() {
  while(true){
    yield take(types.USER_LOGIN_REQUEST)
    yield call(fetchUser)
  }
}

function* login(action) {
  try {
    const account = action.payload
    const isLogin = yield call(api.account.login,account)
    yield put(actions.login.success(isLogin))
    if( isLogin.success ) history.push('/home')
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

function* logout(action) {
  try {
    const user = action.payload
    const isLogout = yield call(api.account.logout,user)
    yield put(actions.logout.success(isLogout))
    if ( isLogout.success ) history.push('/')
  } catch(err) {
    yield put(actions.logout.failure(err.message))
  }
}

function* wathLogout() {
  while(true){
    const action = yield take(types.LOGOUT_REQUEST)
    yield call(logout,action)
  }
}

function* register(action) {
  try {
    const account = action.payload
    const isRegister = yield call(api.account.register,account)
    yield put(actions.register.success(isRegister))
    if( isRegister.success ) history.push('/')
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
  fork(watchFetchUser),
  fork(watchLogin),
  fork(wathLogout),
  fork(watchRegister)
]
