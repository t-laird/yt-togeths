import React, { Component} from 'react';
import { Switch, Route } from 'react-router';
import { withRouter } from 'react-router';
import './App.scss';
import Room from './Components/Room';
import Home from './Components/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route component={Room} path="/watch/:uuid"></Route>
          <Route component={Home} path="/"></Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);