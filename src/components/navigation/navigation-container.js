import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from "react-router";
import {NavLink} from "react-router-dom";

const NavigationComponent = (props) => {
    const dynamicLink = (route, linkText) => {
        return (
            <div className="nav-link-wrapper">
                <NavLink exact to="/portafolio-manager" activeClassName="nav-link-active">
                    {linkText}
                </NavLink>
            </div>
        );
    }

    const handleSignOut = () => {
        axios.delete("https://api.devcamp.space/logout", {withCredentials: true}).then(response => {
            if (response.status === 200) {
                props.history.push("/");
                props.handleSuccessfulLogout();
            }
            return response.data;
        }).catch(error => {
            console.log("error signin out", error);
        })
      };
      
        return(
            <div>
                <div className="nav-wrapper">
                    <div className="left-side">
                        <div className="nav-link-wrapper">
                            <NavLink exact to="/" activeClassName="nav-link-active">Home</NavLink>
                        </div>
                        <div className="nav-link-wrapper">
                            <NavLink exact to="/about-me" activeClassName="nav-link-active">About</NavLink>
                        </div>
                        <div className="nav-link-wrapper">
                            <NavLink exact to="/contact" activeClassName="nav-link-active">Contact</NavLink>
                        </div>
                        <div className="nav-link-wrapper">
                            <NavLink exact to="/blog" activeClassName="nav-link-active">Blog</NavLink>
                        </div>
                            {props.loggedInStatus === "LOGGED_IN" ? dynamicLink("/portafolio-manager", "Portafolio Manager") : null}
                    </div>
                        
                    <div className="right-side">
                        DAVID MARTINEZ
                        {props.loggedInStatus === "LOGGED_IN" ? 
                        <a onClick = {handleSignOut}>
                            <FontAwesomeIcon icon="sign-out-alt" />
                        </a> : null}
                    </div>
                </div>
            </div>
        );
    }

    export default withRouter(NavigationComponent);