import React, {useState, useEffect, useCallback} from 'react';
import {useParams} from 'react-router';
import './movie-grid.scss';
import MovieCard from '../movie-card/MovieCard';
import Button, {OutlineButton} from '../button/Button';
import axiosConfig from "../../api/axiosConfig";
import {message} from "antd";

const MovieGrid = () => {

    const moviesType = useParams();
    console.log(moviesType)

    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [typeData, setTypeData] = useState([]);
    const [params, setParams] = useState({
        typeId: '',
        categoryId: '',
        search: '',
    });

    useEffect(() => {
        axiosConfig.get(`/api/basic/movie?typeId=${params.typeId}&categoryId=${moviesType.category === 'movies' ? 1 : 2}&search=${params.search}&order=&page=0&size=14`).then(res => {
            if (res.status === 200) {
                setItems(res.data.data.content);
                setTotalPage(res.data.data.totalPages);
            }
        }).catch(err => {
            message.error("Error while getting movie data :'(");
        })
        axiosConfig.get(`/api/basic/type?search=&order=desc`).then(res => {
            setTypeData(res.data);

        }).catch(err => {
            message.error("Error while getting type data :'(");
        })
    }, [moviesType])

    const loadMore = async () => {
        axiosConfig.get(`/api/basic/movie?typeId=${params.typeId}&categoryId=${moviesType.category === 'movies' ? 1 : 2}&search=${params.search}&order=&page=${page}&size=14`).then(res => {
            if (res.status === 200) {
                setItems([...items, ...res.data.data.content]);
            }
        }).catch(err => {
            message.error("Error while getting movie data :'(");
        })

        setPage(page + 1);
    }
    const goToSearch = () => {
        axiosConfig.get(`/api/basic/movie?typeId=${params.typeId}&categoryId=${moviesType.category === 'movies' ? 1 : 2}&search=${params.search}&order=&page=0&size=14`).then(res => {
            if (res.status === 200) {
                setItems(res.data.data.content);
                setTotalPage(res.data.data.totalPages);
            }
        }).catch(err => {
            message.error("Error while getting movie data :'(");
        })
    };

    return (
        <>
            <div className="section mb-3">
                <div className="movie-search" style={{display: 'flex'}}>
                    <input className='input' type='text' placeholder="Enter keyword"
                           onChange={(e) => setParams(prevState => ({
                               ...prevState,
                               search: e.target.value
                           }))}/>

                    <select type='select' name='typeId' className='form-control1__input'
                            onChange={(e) => setParams(prevState => ({
                                ...prevState,
                                typeId: e.target.value
                            }))}
                    >
                        {
                            typeData?.data && typeData?.data.map((item) =>
                                <option key={item.id} value={item.id}>{item.name}</option>
                            )
                        }
                        <option value={''}>None</option>
                    </select>
                    <Button style={{marginLeft: '3rem'}} className="small" onClick={goToSearch}>Search</Button>
                </div>
            </div>
            <div className="movie-grid">
                {
                    items.map(item => <MovieCard item={item}
                                                 key={item.id}/>)
                }
            </div>
            {
                page < totalPage ? (
                    <div className="movie-grid__loadmore">
                        <OutlineButton className="small" onClick={loadMore}>Load more</OutlineButton>
                    </div>
                ) : null
            }
        </>
    );
}

export default MovieGrid;
