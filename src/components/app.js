import React, { Component } from 'react';
import {  BrowserRouter as Router, Switch, Route} from "react-router-dom";
import axios from "axios";

import NavigationContainer from './navigation/navigation-container';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Blog from './pages/blog';
import PortafolioDetails from './portafolio/portafolio-details';
import Auth from './pages/auth';
import NoMatch from './pages/no-match';


export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    }
    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    })
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  checkLoginStatus () {
    return axios.get ( " https://api.devcamp.space/logged_in " , { withCredentials : true 
  }).then(response => {
      const loggedIn = response.data.logged_in;
      const loggedInStatus = this.state.loggedInStatus;
    });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <NavigationContainer />

            <h2>{this.state.loggedInStatus}</h2>

              <Switch>
                <Route exact path="/" component={Home} />
                
                <Route
                  path="/auth"
                  render={props => (
                    <Auth
                      {...props}
                      handleSuccessfulLogin={this.handleSuccessfulLogin}
                      handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                    />
                  )}
                /> 
                
                <Route  path="/about-me" component={About} />
                <Route  path="/contact" component={Contact} />
                <Route  path="/blog" component={Blog} />
                <Route  exact path="/portafolio/:slug" component={PortafolioDetails} />
                <Route component={NoMatch} />
              </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
