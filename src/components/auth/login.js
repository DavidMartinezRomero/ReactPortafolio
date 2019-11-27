import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class  extends Component {
    constructor(props){
    super(props);

        this.state = {
            email: "",
            password: "",
            errorText: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value,
        errorText: ""
    });
}

handleSubmit(event) {
    axios.post("https://api.devcamp.space/sessions",
    {
        client: {
            email: this.state.email,
            password: this.state.password,
            errorText: this.state.errorText
        }
    },
    {withCredentials: true}
    )
    .then(response => {
        if (response.data.status === 'created') {
            this.props.handleSuccessfulAuth();
        } else {
            this.setState({
                errorText: "Wrong email or password"
            });
            this.props.handleUnsuccessfulAuth();
        }
    }).catch(error => {
        this.setState({
            errorText: "An error ocurred"
        })
        this.props.handleUnsuccessfulAuth();
      });

    event.preventDefault();
}
    render () {
        return (
            <div>
                <h1>LOGIN TO ACCESS TO YOUR DASHBOARD</h1>
                <h1>{this.state.errorText}</h1>

                <form onSubmit={this.handleSubmit} className="auth-form-wrapper">
                    <div className="form-group">
                    <FontAwesomeIcon icon="envelope"/>
                        <input 
                            type="email" 
                            name="email"
                            placeholder="Your email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="form-group">
                    <FontAwesomeIcon icon="lock"/>
                        <input 
                            type="password" 
                            name="password"
                            placeholder="Your password"
                            value={this.state.password}
                            onChange={this.handleChange} 
                        />
                    </div>

                        <button type="Submit" className="btn">Login</button>
                </form>
            </div>
        );
    }
}