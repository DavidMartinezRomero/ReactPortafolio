import React, { Component } from 'react';
import PortafolioItem from './portafolio-item';
import axios from "axios";

export default class PortafolioReact extends Component {
    constructor () {
        super();

        this.state = {
            pageTitle: "Welcome to my portafolio",
            data: [
            ]
        };
        this.handleFilter = this.handleFilter.bind(this);
    }

    handleFilter(filter) {
        if(filter === "CLEAR_FILTERS") {
            this.getPortafolioItems();
        } else {
            this.getPortafolioItems(filter);
        }
    }

    getPortafolioItems(filter = null) {
        axios.get('https://davidmartinez.devcamp.space/portfolio/portfolio_items')
        .then(response => {
            if(filter) {
                this.setState({
                    data: response.data.portfolio_items.filter(item => {
                        return item.category === filter;
                    })
                });
            } else {
                this.setState({
                    data: response.data.portfolio_items
                });
            }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
      }

    PortafolioItems() {
        return this.state.data.map(item => {
            return <PortafolioItem 
            key={item.id} 
            item={item}
            />;
        });
    }

    componentDidMount() {
        this.getPortafolioItems();
    }

    render() {
        if (this.state.isLoading) {
            return <div>Is loading ...</div>
        }
        return(
            <div className="homepage-wrapper">
                <div className="filter-links">
                    <button className="btn" onClick={() => this.handleFilter("eCommerce")}>eCommerce</button>
                    <button className="btn" onClick={() => this.handleFilter("Scheduling")}>Scheduling</button>
                    <button className="btn" onClick={() => this.handleFilter("Enterprise")}>Enterprise</button>
                    <button className="btn" onClick={() => this.handleFilter("CLEAR_FILTERS")}>All</button>
                </div>
                <div className="portafolio-items-wrapper">
                    {this.PortafolioItems()}
                </div>
            </div>  
        );
    }
}