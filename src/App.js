import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Wallet from './pages/Wallet/index';
import Login from './pages/Login/index';

function App() {
  return (
    <Switch>
      <Route path="/carteira">
        <Wallet />
      </Route>
      <Route exact path="/">
        <Login />
      </Route>
    </Switch>
  );
}

export default App;