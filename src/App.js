import React from 'react'
import theme from './web/store/theme'
import { ThemeProvider } from '@material-ui/styles'
import { Provider } from 'react-redux'
import configureStore from './web/store/configureStore'
import Main from './web/app/App'
import CssBaseline from '@material-ui/core/CssBaseline'
import i18n from './i18n'

const store = configureStore()
const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Main />
    </ThemeProvider>
  </Provider>
)

export default App
