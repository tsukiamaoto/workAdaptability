import { all } from 'redux-saga/effects'
import loadHomePage from '../app/sagas/loadHomePage'
import resume from '../app/sagas/resume'
import account from '../app/sagas/account'
export default function* rootSaga() {
  yield all(loadHomePage)
  yield all(resume)
  yield all(account)
}
