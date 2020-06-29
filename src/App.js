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


function App() {
  return (
    <Router>
    <div>
      <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/store' component={Store} />
          <Route exact path='/checkout' component={Checkout} />
          <Route exact path='/request' component={Request} />
          <Route exact path='/pool' component={Pool} />
          <Route exact path='/farmer' component={Farmer} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;
