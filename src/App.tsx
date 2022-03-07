import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { ListUsers } from './pages/ListUsers'
import { RegisterUsers } from './pages/RegisterUsers'
import React from 'react'
import { SelectUser } from './pages/SelectUsers'
import { EditUser } from './pages/EditUsers'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ListUsers} />
        <Route path="/register" component={RegisterUsers} />
        <Route path="/select/:id" component={SelectUser} />
        <Route path="/edit/:id" component={EditUser} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
