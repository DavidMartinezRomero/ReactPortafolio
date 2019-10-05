import React, { Component } from 'react';
import moment from "moment";
import {  BrowserRouter as Router, Switch, Route} from "react-router-dom";
import PortafolioReact from './portafolio/portafolio-react';
import NavigationContainer from './navigation/navigation-container';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <Router>
          <div>
            <NavigationContainer />
              <Switch>
                <Route exact path="/" component={}>

                </Route>
              </Switch>
          </div>
        </Router>
        <h1>DevCamp React Starter</h1>
        {moment().format('MMMM Do YYYY, h:mm:ss a')}
        <PortafolioReact/>
      </div>
    );
  }
}
