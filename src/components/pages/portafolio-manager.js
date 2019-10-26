import React, { Component } from 'react';
import axios from "axios";

export default class PortafolioManager extends Component {
    constructor(){
        super();
        this.state = {
            portafolioItems: []
        }
    }

    getPortafolioItems() {
        axios.get("https://davidmartinez.devcamp.space/portfolio/portfolio_items", 
        {withCredentials: true
        }).then(response => {
            this.setState({
                portafolioItems: [...response.data.portafolio_items]
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
                <div className="left-colum">
                    <h1>Portafolio form</h1>
                </div>
                <div className="right-colum">
                    <h1>Portafolio sidebar</h1>
                </div>
            </div>
        );
    }
}