import {useRef} from "react";
import './hero.scss';

import SwiperCore, {Autoplay} from 'swiper';
import {Swiper, SwiperSlide} from "swiper/react";

import Button, {OutlineButton} from "../button/Button";
import Modal, {ModalContent} from "../modal/Modal";

import {useHistory} from "react-router-dom";

const moviesList = [
    {
        id: 1,
        title: 'Spider-Man: No Way Home',
        overview: 'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.',
        avatar: '/image/movie/1/spdman.jpg',
        backdrop: 'uhYpkLSnlOXTQDmNnu1X4MHMt1S.jpg',
        trailer: 'JfVOs4VSpmA'
    },
    {
        id: 4,
        title: 'Encanto',
        overview: 'The tale of an extraordinary family, the Madrigals, who live hidden in the mountains of Colombia, in a magical house, in a vibrant town, in a wondrous, charmed place called an Encanto. The magic of the Encanto has blessed every child in the family with a unique gift from super strength to the power to heal—every child except one, Mirabel. But when she discovers that the magic surrounding the Encanto is in danger, Mirabel decides that she, the only ordinary Madrigal, might just be her exceptional family\'s last hope.',
        avatar: '/image/movie/4/encanto_6_11zon.jpg',
        backdrop: 'cwZT8GlyNbZa81NqCFtS5WJgo4d.jpg',
        trailer: 'hEQWILdb5yg'
    },
    {
        id: 9,
        title: 'Eternals',
        overview: 'The Eternals are a team of ancient aliens who have been living on Earth in secret for thousands of years. When an unexpected tragedy forces them out of the shadows, they are forced to reunite against mankind’s most ancient enemy, the Deviants.',
        avatar: '/image/movie/9/eternal_7_11zon.jpg',
        backdrop: '4NybrtAXRtJd2h83fOTPGftz3LI.jpg',
        trailer: 'x_me3xsvDgk'
    },
    {
        id: 10,
        title: 'The Ice Age Adventures of Buck Wild',
        overview: 'The fearless one-eyed weasel Buck teams up with mischievous possum brothers Crash & Eddie as they head off on a new adventure into Buck\'s home: The Dinosaur World.',
        avatar: '/image/movie/10/iceage_16_11zon.jpg',
        backdrop: 'qw02SUqrrdTjAOPCFJBPyKaVf4z.jpg',
        trailer: '0U0L4uT0btQ'
    },
    {
        id: 17,
        title: 'Uncharted',
        overview: 'A young street-smart, Nathan Drake and his wisecracking partner Victor “Sully” Sullivan embark on a dangerous pursuit of “the greatest treasure never found” while also tracking clues that may lead to Nathan’s long-lost brother.',
        avatar: '/image/movie/17/uncharted_41_11zon.jpg',
        backdrop: 'rPk56gdrPpXo4zgml28Ct5g9WSV.jpg',
        trailer: 'eHp3MbsCbMg'
    },
];


const Hero = () => {
    SwiperCore.use([Autoplay]);

    return (
        <div className='hero-slice'>
            <Swiper modules={[Autoplay]} autoplay={{delay: 6000}} grabCursor={true} spaceBetween={0} slicePerView={1}>
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
    const background = 'https://image.tmdb.org/t/p/original//' + item.backdrop;

    const setModalActive = () => {
        const modal = document.querySelector(`#modal_${item.id}`);
        const videoSrc = 'https://youtube.com/embed/' + item.trailer;
        modal.querySelector('.modal__content > iframe').setAttribute('src', videoSrc);
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
                    <img src={`https://anhcuong.org${item.avatar}`} alt=''/>
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