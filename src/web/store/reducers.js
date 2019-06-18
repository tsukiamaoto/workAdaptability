import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
import account from '../app/reducers/account'
import homePage from '../app/reducers/homePage'
import job from '../app/reducers/job'
import resume from '../app/reducers/resume'
import user from '../app/reducers/user'

export default (history) => combineReducers({
  router: connectRouter(history),
  account,
  homePage,
  job,
  resume,
  user
})
