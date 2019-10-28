import React, { Component } from 'react';
import axios from "axios";

import PortafolioSidebarLsit from "../portafolio/portafolio-sidebar-list";
import PortafolioForm from '../portafolio/portafolio-form';

export default class PortafolioManager extends Component {
    constructor(){
        super();
        this.state = {
            portafolioItems: []
        }
        this.handleSuccessfulSubmission = this.handleSuccessfulSubmission.bind(this);
        this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
    }

    handleSuccessfulSubmission(portafolioItem){
        //TODO
        //update the portafolioItems state
        //and add the portafolioItem to the list
    }

    handleFormSubmissionError(error) {
        console.log("handleForSubmissionError error", error);
    }

    getPortafolioItems() {
        axios.get("https://davidmartinez.devcamp.space/portfolio/portfolio_items", 
        {withCredentials: true
        }).then(response => {
            this.setState({
                portafolioItems: [...response.data.portfolio_items]
            })
        }).catch(error => {
            console.log("error in portafolio item", error)
        })
    }

    componentDidMount() {
        this.getPortafolioItems();
    }

    render () {
        return (
            <div className="portafolio-manager-wrapper">
                <div className="left-column">
                    <PortafolioForm 
                    handleSuccessfulSubmission={this.handleSuccessfulSubmission}
                    handleFormSubmissionError={this.handleFormSubmissionError}
                    />
                </div>
                <div className="right-column">
                    <PortafolioSidebarLsit data={this.state.portafolioItems}/>
                </div>
            </div>
        );
    }
}