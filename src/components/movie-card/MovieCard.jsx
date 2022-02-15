import React from 'react';

import './movie-card.scss';

import {Link} from 'react-router-dom';

import Button from '../button/Button';

const MovieCard = props => {

    const link = `/movies/${props.item.id}`
    return (
        <Link to={link}>
            <div className="movie-card" style={{backgroundImage: `url(http://54.169.180.127${props.item.avatar})`}}>
                <Button>
                    <i className="bx bx-play"></i>
                </Button>
            </div>
            <h3 className="movie-card__title">{props.item.title}</h3>
        </Link>
    );
}

export default MovieCard;
