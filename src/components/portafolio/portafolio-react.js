import React, { Component } from 'react';
import PortafolioItem from './portafolio-item';
import axios from "axios";

export default class PortafolioReact extends Component {
    constructor () {
        super();

        this.state = {
            pageTitle: "Welcome to my portafolio",
            // isLoading: true,
            data: [
            ]
        };
        this.handleFilter = this.handleFilter.bind(this);
        // this.getPortafolioItems = this.getPortafolioItems.bind(this); 

    }

    handleFilter(filter) {
        this.setState({
            data: this.state.data.filter(item => {
                return item.category === filter;
            })
        })
    }

    getPortafolioItems() {
        axios.get('https://davidmartinez.devcamp.space/portfolio/portfolio_items')
        .then(response => {
          // handle success
        //   console.log(response.data.portfolio_items);
            this.setState({
                data: response.data.portfolio_items
            });
        })
        .catch(error => {
          // handle error
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
                <div className="portafolio-items-wrapper">
                    <button className="btn" onClick={() => this.handleFilter("eCommerce")}>eCommerce</button>
                    <button className="btn" onClick={() => this.handleFilter("Scheduling")}>Scheduling</button>
                    <button className="btn" onClick={() => this.handleFilter("Enterprise")}>Enterprise</button>
                    {this.PortafolioItems()}
                </div>  
        );
    }
}