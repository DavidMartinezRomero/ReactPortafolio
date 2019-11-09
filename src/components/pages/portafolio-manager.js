import React, { Component } from 'react';
import axios from "axios";

import PortafolioSidebarLsit from "../portafolio/portafolio-sidebar-list";
import PortafolioForm from '../portafolio/portafolio-form';

export default class PortafolioManager extends Component {
    constructor(){
        super();
        this.state = {
            portafolioItems: [],
            portafolioToEdit: {}
        };
        this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
        this.handleEditFormSubmission = this.handleEditFormSubmission.bind(this);
        this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.clearPortafolioToEdit = this.clearPortafolioToEdit.bind(this);
    }

    clearPortafolioToEdit() {
        this.setState({
            portafolioToEdit: {}            
        })
    }

    handleEditClick(portafolioItem) {
        this.setState({
            portafolioToEdit: portafolioItem
        });
    }

    handleDeleteClick(portafolioItem) {
        axios
        .delete(`https://api.devcamp.space/portfolio/portfolio_items/${portafolioItem.id}` ,
        {withCredentials: true}
        )
        .then(response => {
            this.setState({
                portafolioItems: this.state.portafolioItems.filter(item => {
                    return item.id !== portafolioItem.id;                    
                })
            });
        }).catch(error => {
            console.log("handleDeleteClick error", error);
        })
    }

    handleNewFormSubmission(portafolioItem){

        this.setState({
            portafolioItems: [portafolioItem].concat(this.state.portafolioItems)
        });
    }

    handleEditFormSubmission() {
        this.getPortafolioItems();
    }

    handleFormSubmissionError(error) {
        console.log("handleForSubmissionError error", error);
    }

    getPortafolioItems() {
        axios.get("https://davidmartinez.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc", 
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
                    handleNewFormSubmission={this.handleNewFormSubmission}
                    handleEditFormSubmission={this.handleEditFormSubmission}
                    handleFormSubmissionError={this.handleFormSubmissionError}
                    clearPortafolioToEdit={this.clearPortafolioToEdit}
                    portafolioToEdit={this.state.portafolioToEdit}
                    />
                </div>
                <div className="right-column">
                    <PortafolioSidebarLsit 
                    handleDeleteClick={this.handleDeleteClick}
                    data={this.state.portafolioItems}
                    handleEditClick={this.handleEditClick}
                    />
                </div>
            </div>
        );
    }
}