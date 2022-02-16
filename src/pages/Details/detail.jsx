import React, {useEffect, useState, useRef, useContext} from 'react';
import {useParams} from 'react-router';
import background from '../../assets/detailBg.jpeg'
import './detail.scss';

import axiosConfig from "../../api/axiosConfig";
import {message, Comment, List} from "antd";
import RandomMovieList from "../../components/movie-list/RandomMovieList";
import MovieRate from "../../components/rate/MovieRate";
import CommentSection from "../../components/comment/CommentSection";
import Heart from "../../components/button/Heart";
import Button, {SmallButton} from "../../components/button/Button";
import Modal, {ModalContent} from "../../components/modal/Modal";
import axiosInstance from "../../api/axiosInstance";
import authContext from "../../store/AuthContext";
import {EyeFilled, HeartFilled} from '@ant-design/icons'

const Detail = () => {

    const {id} = useParams();

    const [item, setItem] = useState(null);
    const [cmt, setCmt] = useState([]);
    const authCtx = useContext(authContext);

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

    const setModalActive = (eps) => {
        axiosConfig.post(`/api/basic/episode/${eps.id}`).catch(err => console.log(err));
        if (authCtx.user) {
            axiosInstance.patch(`/api/user/user-history`, {
                movieName: item.title,
                episodeName: eps.name,
                episodePath: eps.path
            }).catch(err => console.log(err))
        }
        const modal = document.querySelector(`#modal_${eps.id}`);
        modal.querySelector('.modal__content > iframe').setAttribute('src', eps.path);
        modal.classList.toggle('active');
    };

    const addCmt = (cmtData, epsNname) => {
        cmtData?.map((item) => {
            if (!cmt.includes(item)) {
                setCmt(prevState => [...prevState, {
                    author: (
                        <p style={{color: '#fff'}}>
                            {item.user.username} commented in {epsNname}
                        </p>
                    ),
                    avatar: item.user.avatar ? `http://54.169.180.127${item.user.avatar}` : 'https://joeschmoe.io/api/v1/random',
                    content: (
                        <p style={{color: '#fff'}}>
                            {item.content}
                        </p>
                    ),
                    datetime: new Date(item.createDate).toLocaleDateString("en-US")
                }])
            }
        })
    }
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
                                     style={{backgroundImage: `url(https://anhcuong.org${item.avatar})`}}></div>
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
                                {item.totalEpisode === 1 ? <>
                                        <Button onClick={() => {
                                            axiosConfig.post(`/api/basic/episode/${item.episodes[0].id}`).catch(err => console.log(err));
                                            if (authCtx.user) {
                                                axiosInstance.patch(`/api/user/user-history`, {
                                                    movieName: item.title,
                                                    episodeName: item.episodes[0].name,
                                                    episodePath: item.episodes[0].path
                                                }).catch(err => console.log(err))
                                            }
                                            const modal = document.querySelector(`#modal_${item.episodes[0].id}`);
                                            modal.querySelector('.modal__content > iframe').setAttribute('src', item.episodes[0].path);
                                            modal.classList.toggle('active');
                                        }
                                        }>Watch now</Button>
                                        <OpenPlayer handlerCmt={addCmt} title={item.title} item={item.episodes[0]}/>
                                    </>
                                    : <div className="section mb-3">
                                        <div className="video">
                                            <div className="video__title">
                                                <h2 style={{color: '#fff'}}>Episode list</h2>
                                            </div>
                                            <div>
                                                {item.episodes.map((eps => <>
                                                    <SmallButton onClick={() => setModalActive(eps)}
                                                                 key={eps.id}>{eps.name}</SmallButton>
                                                    <OpenPlayer handlerCmt={addCmt} title={item.title} item={eps}/>
                                                </>))}
                                            </div>
                                        </div>
                                    </div>}
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
                                    <h2>Comments</h2>
                                </div>
                                {cmt && <List
                                    className="comment-list"
                                    itemLayout="horizontal"
                                    dataSource={cmt}
                                    renderItem={item => (
                                        <li>
                                            <Comment
                                                actions={item.actions}
                                                author={item.author}
                                                avatar={item.avatar}
                                                content={item.content}
                                                datetime={item.datetime}
                                            />
                                        </li>
                                    )}
                                />}
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

const OpenPlayer = (props) => {
    const item = props.item;
    const [eps, setEps] = useState();
    const iframeRef = useRef(null);
    const [isCmt, setIsCmt] = useState(false);

    useEffect(() => {
        axiosConfig.get(`/api/basic/episode/${item.id}`).then(res => {
            setEps(res.data.data)
        }).catch(err => {
            message.error('Something went wrong!')
        })
    }, [isCmt])

    useEffect(() => {
        if (eps) {
            props.handlerCmt(eps.comments, item.name)
        }
    }, [eps])

    const isCommented = (isCmt) => {
        setIsCmt(isCmt);
    }

    const onClose = () => iframeRef.current.setAttribute('src', '');

    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <div
                    style={{display: 'flex', justifyContent: 'space-between', padding: '0 2rem', marginBottom: '1rem'}}>
                    <h1 style={{color: '#fff'}}>{props.title} - {item.name}</h1>
                    <Heart eps={eps} id={item.id}/>
                </div>
                <div style={{display: 'flex', padding: '0 2rem 1rem 2rem'}}>
                    <p style={{padding: '0 .5rem'}}>{eps?.numberView}<EyeFilled/></p>
                    <p style={{padding: '0 .5rem'}}>{eps?.totalLike}<HeartFilled/></p>
                </div>
                <iframe allowFullScreen={true} ref={iframeRef} content='trailer' width='100%' height='400px'
                        style={{borderRadius: '5px'}}/>
                <CommentSection commented={isCommented} id={item.id}/>
            </ModalContent>
        </Modal>
    );
};

export default Detail;
