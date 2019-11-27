import React, { Component } from "react";
import axios from "axios";

export default class PortafolioDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            portafolioItem: {}
        }
    }

    componentWillMount() {
        this.getPortafolioItem();
    }

    getPortafolioItem() {
        axios.get(`https://davidmartinez.devcamp.space/portfolio/portfolio_items/${this.props.match.params.slug}`, 
        { withCredentials: true }).then(response => {
            this.setState({
                portafolioItem: response.data.portfolio_item
            })
        }).catch(error => {
            console.log("getPortafolioItem response portafolio details", error);
        })
    }

    render() {
        const {
        banner_image_url,
        category,
        description,
        logo_url,
        name,
        thumb_image_url,
        url
        } = this.state.portafolioItem;

        const bannerStyles = {
            backgroundImage: "url(" + banner_image_url + ")",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center"
          };
          
          const logoStyles = {
            width: "200px"
          };

        return (

          <div className="portfolio-detail-wrapper">
            <div className="banner" style={bannerStyles}>
                  <img src={logo_url} style={logoStyles} />
            </div>
        
            <div className="portfolio-detail-description-wrapper">
                <div classNaem="description">{description}</div>
            </div>
        
            <div className="bottom-content-wrapper">
                <a href={url} className="site-link" target="_blank">
                    Visit {name}
                </a>
            </div>
          </div>
        );
    }
}