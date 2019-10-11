import React, { Component } from 'react';
import PortafolioItem from './portafolio-item';

export default class PortafolioReact extends Component {
    constructor () {
        super();

        this.state = {
            pageTitle: "Welcome to my portafolio",
            // isLoading: true,
            data: [
                {title: "Quip", category: "eCommerce", slug: "quip"},
                {title: "Eventbrite", category: "Scheduling", slug: "eventbrite"},
                {title: "Ministry-safe", category: "Enterprise", slug: "ministry-safe"},
                {title: "Swingaway", category: "eCommerce", slug: "swingaway"},
                {title: "Swingaway", category: "eCommerce", slug: "swingaway"}
            ]
        };
        this.handleFilter = this.handleFilter.bind(this);
    }

    handleFilter(filter) {
        this.setState({
            data: this.state.data.filter(item => {
                return item.category === filter;
            })
        })
    }

    PortafolioItems() {

        return this.state.data.map(item => {
            return <PortafolioItem title={item.title} url={"google.com"} slug={item.slug}/>;
        });
    }

    render() {
        if (this.state.isLoading) {
            return <div>Is loading ...</div>
        }
        return(
            <div>
                <h2>{this.state.pageTitle}</h2>

                <button onClick={() => this.handleFilter("eCommerce")}>eCommerce</button>
                <button onClick={() => this.handleFilter("Scheduling")}>Scheduling</button>
                <button onClick={() => this.handleFilter("Enterprise")}>Enterprise</button>

                {this.PortafolioItems()}
            </div>
        );
    }
}