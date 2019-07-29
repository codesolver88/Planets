import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import * as Routes from './Const/Navigation.js';
import PlanetContainer from './Container/PlanetContainer.js';
import Login from './Components/Login.js';
import Nopage from './Components/Nopage.js';
import './custom.css';
import './App.css';

function App() {
  return (
    <div className="App">
    <Router>
        <Switch>
        <Route exact path={Routes.LANDING} component={Login}/>
        <Route path={Routes.LOGIN} component={Login}/>
        <Route path={Routes.PLANET} component={PlanetContainer}/>
        <Route component={Nopage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
