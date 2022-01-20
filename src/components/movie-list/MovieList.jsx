import {useEffect, useState} from "react";
import PropTypes from "prop-types";

import './movieList.scss';

import {SwiperSlide, Swiper} from "swiper/react";

import apiConfig from "../../api/apiConfig";
import tmdbApi, {category} from "../../api/tmdbConfig";
import MovieCard from "../movie-card/MovieCard";

const MovieList = props => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {};

            if (props.type !== 'similar') {
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMovieList(props.type, {params});
                        break;
                    default:
                        response = await tmdbApi.getTvList(props.type, {params});
                }
            } else {
                response = await tmdbApi.similar(props.category, props.id);
            }
            setItems(response.results);
        }
        getList();
    }, []);

    return (
        <div className='movies-list'>
            <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
                {items.map((item, i) => (
                    <SwiperSlide key={i}>
                        <MovieCard item={item} category={props.category}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

MovieList.propsTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string,
}

export default MovieList;