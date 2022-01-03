import {useState, useEffect, useRef} from "react";
import './hero.scss';

import SwiperCore, {Autoplay} from 'swiper';
import {Swiper, SwiperSlide} from "swiper/react";

import Button, {OutlineButton} from "../button/Button";
import Modal, {ModalContent} from "../modal/Modal";

import tmdbApi, {category, movieType} from "../../api/tmdbConfig";
import apiConfig from "../../api/apiConfig";

import {useHistory} from "react-router-dom";


const Hero = () => {
    SwiperCore.use([Autoplay]);
    const [moviesList, setMoviesList] = useState([]);
    useEffect(() => {
        const getMovies = async () => {
            const params = {pages: 1};
            try {
                const response = await tmdbApi.getMovieList(movieType.popular, {params});
                setMoviesList(response.results.slice(0, 4));
                console.log(response);
            } catch {
                console.log('error :(');
            }
        }
        getMovies();
    }, [])


    console.log(moviesList);

    return (
        <div className='hero-slice'>
            <Swiper modules={[Autoplay]} grabCursor={true} spaceBetween={0} slicePerView={1}>
                {moviesList.map((item, i) => (
                    <SwiperSlide key={i}>
                        {({isActive}) => (
                            <HeroSliceItem item={item} classname={isActive ? 'active' : ''}/>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
            {moviesList.map((item, i) => <TrailerModal key={i} item={item}/>)}
        </div>
    );
};

const HeroSliceItem = (props) => {
    let history = useHistory();
    const item = props.item;
    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);
        const videos = await tmdbApi.getVideos(category.movie, item.id);
        if (videos.results.length > 0) {
            const videoSrc = 'https://youtube.com/embed/' + videos.results[0].key;
            modal.querySelector('.modal__content > iframe').setAttribute('src', videoSrc);
        } else {
            modal.querySelector('.modal__content > iframe').innerHTML = 'No trailer!';
        }
        modal.classList.toggle('active');
    };

    return (
        <div className={`hero-slice__item ${props.classname}`} style={{backgroundImage: `url(${background})`}}>
            <div className="hero-slice__item__content container">
                <div className="hero-slice__item__content__info">
                    <h2 style={{color: '#fff'}} className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button onClick={() => {
                            history.push('/movie/' + item.id)
                        }}>
                            Watch now
                        </Button>
                        <OutlineButton onClick={setModalActive}>
                            Watch Trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className="hero-slice__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt=''/>
                </div>
            </div>
        </div>
    );
};

const TrailerModal = (props) => {
    const item = props.item;

    const iframeRef = useRef(null);

    const onClose = () => iframeRef.current.setAttribute('src', '');

    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} content='trailer' width='100%' height='500px' style={{borderRadius: '5px'}}/>
            </ModalContent>
        </Modal>
    );
};

export default Hero;