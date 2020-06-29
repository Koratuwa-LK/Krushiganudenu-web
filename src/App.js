import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Landing from './components/landing/landing';
import Store from './components/store/store';
import Checkout from './components/checkout/checkout';
import Request from './components/request/request';
import Pool from './components/pool/pool';
import Farmer from './components/farmer';
import { AuthProvider } from './Auth';
import PrivateRoute from "./PrivateRoute";
import login from './login';
import signUp from './signUp';

function App() {
  return(
  <AuthProvider>
    <Router>
    <div>
      <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path="/login" component={login} />
          <Route exact path="/signup" component={signUp} />
          <Route exact path='/store' component={Store} />
          <PrivateRoute exact path='/checkout' component={Checkout} />
          <PrivateRoute exact path='/request' component={Request} />
          <PrivateRoute exact path='/pool' component={Pool} />
          <Route exact path='/farmer' component={Farmer} />
      </Switch>
    </div>
  </Router>
  </AuthProvider>
  );
}

export default App;
