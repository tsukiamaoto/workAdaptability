import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import Home from './main/components/'
import Resume from './Resume/components'
// import Post from '../containers/addPost'
import history from '../store/history'
// import Article from '../containers/article'
// import Edit from '../containers/editPost'

const App = () => (
  <Router history={history}>
    <Switch>
      <Route exact path = "/" component = {Home} />
      <Route path = "/resume" component = {Resume} />
      {/* <Route path="/post" component={Post} />
      <Route path="/article/:id/edit" component={Edit} />
      <Route path="/article/:id" component={Article} /> */}
    </Switch>
  </Router>
)

export default App
