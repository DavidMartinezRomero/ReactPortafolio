import React,{ Component } from "react";
import { Link } from "react-router-dom";

export default class PortafolioItem extends Component {
    constructor(props) {
        super(props);   
        this.state={
            portafolioItemClass: ""
        }
    }

    handleMouseEnter() {
        this.setState({portafolioItemClass: 'image-blur'})
    }

    handleMouseLeave() {
        this.setState({portafolioItemClass: ''})
    }

    render(){
        const { id, description, thumb_image_url, logo_url} = this.props.item;
        return (
            <Link to={`/portafolio/${id}`}>
                <div className="portafolio-item-wrapper" 
                    onMouseEnter={() => this.handleMouseEnter()}
                    onMouseLeave={() => this.handleMouseLeave()}
                >
                    <div
                        className={"portafolio-img-background " + this.state.portafolioItemClass}
                        style={{
                            backgroundImage:"url(" + thumb_image_url + ")"
                        }}
                    />

                    <div className="img-text-wrapper">
                        <div className="logo-wrapper">
                            <img src={logo_url}/>
                        </div>
                        <div className="subtitle">
                            {description}
                        </div>
                    </div>
                </div>
            </Link>
    );
    }
}