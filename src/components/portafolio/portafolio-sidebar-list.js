import React from 'react';

const PortafolioSidebarLsit = (props) => {
    const PortafolioList = props.data.map(portafolioItem => {
        return (
            <div className="portafolio-item-thumb">
                <div className="portafolio-thumb-img">
                    <img src={portafolioItem.thumb_image_url} />
                </div>
                <h1 className="title">{portafolioItem.name}</h1>
                <h2>{portafolioItem.id}</h2>
            </div>
        )
    })
    return <div className="portafolio-sidebar-list-wrapper">{PortafolioList}</div>
}

export default PortafolioSidebarLsit;