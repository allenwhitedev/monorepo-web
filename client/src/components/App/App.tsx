import React from 'react';
import './App.css';
import TestPage from '../TestPage/TestPage';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/test'>
          <TestPage />
        </Route>
      </Switch>
      <Redirect to='/test' />
    </BrowserRouter>
  )
}

export default App;
