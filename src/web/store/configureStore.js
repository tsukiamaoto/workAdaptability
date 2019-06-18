import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import history from './history'
import createReducers from './reducers'
import rootSaga from './sagas'


const sagaMiddleware = createSagaMiddleware()

const configureStore = () => {

  const store = createStore(
    createReducers(history),
    applyMiddleware(sagaMiddleware)
  )

  sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore
