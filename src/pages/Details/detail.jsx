import React, {useEffect, useState, useRef} from 'react';
import {useParams} from 'react-router';
import background from '../../assets/detailBg.jpeg'
import './detail.scss';

import axiosConfig from "../../api/axiosConfig";
import {message} from "antd";
import RandomMovieList from "../../components/movie-list/RandomMovieList";
import MovieRate from "../../components/rate/MovieRate";

const Detail = () => {

    const {id} = useParams();

    const [item, setItem] = useState(null);

    const iframeRef = useRef(null);

    useEffect(() => {
        axiosConfig.get(`/api/basic/movie/${id}`).then(res => {
            if (res.status === 200) {
                setItem(res.data.data);
                console.log(res.data.data)
            }
        }).catch(err => {
            console.log(err)
            message.error("Error while getting movie info :'(");
        })
    }, [id]);
    return (
        <>
            {
                item && (
                    <>
                        <div className="banner"
                             style={{backgroundImage: `url(${background})`}}></div>
                        <div className="mb-3 movie-content container">
                            <div className="movie-content__poster">
                                <div className="movie-content__poster__img"
                                     style={{backgroundImage: `url(http://54.169.180.127${item.avatar})`}}></div>
                            </div>
                            <div className="movie-content__info">
                                <h1 style={{color: '#fff'}} className="title">
                                    {item.title}
                                </h1>
                                <div className="genres">
                                    <span className="genres__item">{item.category.name}</span>
                                </div>
                                <MovieRate id={item.id} rate={item.averageRating}/>
                                <p className="overview">{item.description}</p>
                            </div>
                        </div>
                        <div className="container">
                            <div className="section mb-3">
                                <div className="video">
                                    <div className="video__title">
                                        <h2 style={{color: '#fff'}}>{item.title} Trailer:</h2>
                                    </div>
                                    <iframe
                                        src={`https://www.youtube.com/embed/${item.trailer}`}
                                        height='450px'
                                        width="50%"
                                        title="video"
                                    ></iframe>
                                </div>
                            </div>
                            <div className="section mb-3">
                                <div className="section__header mb-2">
                                    <h2>Similar</h2>
                                </div>
                                <RandomMovieList id={item.category.id}/>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
}

export default Detail;
