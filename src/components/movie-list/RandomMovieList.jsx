import {useEffect, useState} from "react";

import './movieList.scss';

import {SwiperSlide, Swiper} from "swiper/react";

import MovieCard from "../movie-card/MovieCard";
import {message} from "antd";
import axiosConfig from "../../api/axiosConfig";

const RandomMovieList = props => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        axiosConfig.get(`/api/basic/movie/random?categoryId=${props.id}`).then(res => {
            if (res.status === 200) {
                setItems(res.data.data);
            }
        }).catch(err => {
            console.log(err)
            message.error("Error while getting movie data in movie List :'(");
        })
    }, []);

    console.log(items)

    return (
        <div className='movies-list'>
            <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
                {items && items.map((item) => (
                    <SwiperSlide key={item.id}>
                        <MovieCard item={item}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default RandomMovieList;