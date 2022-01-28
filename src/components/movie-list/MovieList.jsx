import {useEffect, useState} from "react";
import PropTypes from "prop-types";

import './movieList.scss';

import {SwiperSlide, Swiper} from "swiper/react";

import MovieCard from "../movie-card/MovieCard";
import {message} from "antd";
import axiosInstance from "../../api/axiosInstance";

const MovieList = props => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        axiosInstance.get(`/api/basic/movie?typeId=${props.typeId}&categoryId=&order=&search=&order=`).then(res => {
            if (res.status === 200) {
                setItems(res.data.data);
            }
        }).catch(err => {
            message.error("Error while getting movie data :'(");
        })
    }, []);

    console.log(items)

    return (
        <div className='movies-list'>
            <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
                {items && items.content?.map((item) => (
                    <SwiperSlide key={item.id}>
                        <MovieCard item={item}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

MovieList.propsTypes = {
    typeId: PropTypes.string.isRequired,
}

export default MovieList;