import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Landing from './components/landing/landing';
import Store from './components/store';


function App() {
  return (
    <Router>
    <div>
  {/*     <h2>Welcome to React Router Tutorial</h2>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul className="navbar-nav mr-auto">
        <li><Link to={'/'} className="nav-link"> Home </Link></li>
        <li><Link to={'/contact'} className="nav-link">Contact</Link></li>
        <li><Link to={'/about'} className="nav-link">About</Link></li>
      </ul>
      </nav>
      <hr /> */}
      <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/store' component={Store} />
          
      </Switch>
    </div>
  </Router>
  );
}

export default App;
