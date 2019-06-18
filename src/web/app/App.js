import React, { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import Home from './components/main'
import Resume from './components/Resume'
import Login from './components/Login'
import Register from './components/Register'
import User from './components/User'
import history from '../store/history'
// import { I18nextProvider } from 'react-i18next'

const Loader = () => <div>loading...</div>
const App = () => (
  <Suspense fallback={<Loader/>}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path = "/" component = {Home} />
        <Route path = "/resume" component = {Resume} />
        <Route path = "/login" component = {Login} />
        <Route path = "/register" component = {Register} />
        <Route path = "/information" component = {User} />
      </Switch>
    </ConnectedRouter>
  </Suspense>
)

export default App
