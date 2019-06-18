import { all } from 'redux-saga/effects'
import loadHomePage from '../app/sagas/loadHomePage'
import resume from '../app/sagas/resume'
export default function* rootSaga() {
  yield all(loadHomePage)
  yield all(resume)
}
