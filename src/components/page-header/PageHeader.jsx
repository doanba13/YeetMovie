import React from 'react';

import './page-header.scss';

import background from "../../assets/footer-bg.jpeg";

const PageHeader = props => {
    return (
        <div className="page-header"
             style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)), url(${background})`}}>
            <h2 style={{color: '#fff', fontSize: '2rem'}}>{props.children}</h2>
        </div>
    );
}


export default PageHeader;
