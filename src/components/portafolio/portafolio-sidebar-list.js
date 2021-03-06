import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PortafolioSidebarLsit = (props) => {
    const PortafolioList = props.data.map(portafolioItem => {
        return (
            <div key={portafolioItem.id} className="portafolio-item-thumb">
                <div className="portafolio-thumb-img">
                    <img src={portafolioItem.thumb_image_url} />
                </div>
                <div className="text-content">
                    <div className="title">{portafolioItem.name}</div>
                        <div className="actions">
                            
                            <a className="action-icon" onClick={() => props.handleEditClick(portafolioItem)}>
                                <FontAwesomeIcon icon="edit" />
                            </a>
                            
                            <a className="action-icon" onClick={() => props.handleDeleteClick(portafolioItem)}>
                                <FontAwesomeIcon icon="trash" />
                            </a>
    
                        </div>
                </div>
            </div>
        )
    })
    return <div className="portafolio-sidebar-list-wrapper">{PortafolioList}</div>
}

export default PortafolioSidebarLsit;