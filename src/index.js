import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import theme from './web/store/theme'
import { ThemeProvider } from '@material-ui/styles'
import App from './web/app/App'
import { Provider } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
// import rootReducer from './reducers'
// const store = configureStore()
const store = createStore(applyMiddleware(thunk))

ReactDOM.render (
  <ThemeProvider theme={theme}>
    <Provider store = {store}>
      <CssBaseline />
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
)

