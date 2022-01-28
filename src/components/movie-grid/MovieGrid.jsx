import React, {useState, useEffect, useCallback} from 'react';
import {useHistory, useParams} from 'react-router';
import './movie-grid.scss';
import MovieCard from '../movie-card/MovieCard';
import Button, {OutlineButton} from '../button/Button';
import axiosInstance from "../../api/axiosInstance";
import {message} from "antd";

const MovieGrid = () => {

    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [categoryData, setCategoryData] = useState([]);
    const [typeData, setTypeData] = useState([]);
    const [params, setParams] = useState({
        typeId: '',
        categoryId: '',
        order: '',
        search: '',
    });

    useEffect(() => {
        axiosInstance.get(`/api/basic/movie?typeId=${params.typeId}&categoryId=${params.categoryId}&order=${params.order}&search=${params.search}&order=&page=${page - 1}`).then(res => {
            if (res.status === 200) {
                setItems(res.data.data.content);
                setTotalPage(res.data.data.totalPages);
            }
        }).catch(err => {
            message.error("Error while getting movie data :'(");
        })
        axiosInstance.get(`/api/basic/category?search=&order=desc`).then(res => {
            setCategoryData(res.data);
        }).catch(err => {
            message.error("Error while getting category data :'(");
        })
        axiosInstance.get(`/api/basic/type?search=&order=desc`).then(res => {
            setTypeData(res.data);

        }).catch(err => {
            message.error("Error while getting type data :'(");
        })
    }, [])

    const loadMore = async () => {
        axiosInstance.get(`/api/basic/movie?typeId=${params.typeId}&categoryId=${params.categoryId}&order=${params.order}&search=${params.search}&order=&page=${page}`).then(res => {
            if (res.status === 200) {
                setItems([...items, ...res.data.data.content]);
            }
        }).catch(err => {
            message.error("Error while getting movie data :'(");
        })

        setPage(page + 1);
    }
    const goToSearch = () => {
        axiosInstance.get(`/api/basic/movie?typeId=${params.typeId}&categoryId=${params.categoryId}&order=${params.order}&search=${params.search}&order=&page=${page - 1}`).then(res => {
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
                    <input className='input' type='text' placeholder="Enter keyword" value={params.search}
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
                                <option value={item.id}>{item.name}</option>
                            )
                        }
                    </select>
                    <select type='select' name='categoryId' className='form-control1__input'
                            onChange={(e) => setParams(prevState => ({
                                ...prevState,
                                categoryId: e.target.value
                            }))}
                    >
                        {
                            categoryData?.data && categoryData?.data.map((item) =>
                                <option value={item.id}>{item.name}</option>
                            )
                        }
                    </select>
                    <select type='select' name='order' className='form-control1__input'
                            onChange={(e) => setParams(prevState => ({
                                ...prevState,
                                order: e.target.value
                            }))}
                    >
                        <option value='desc'>Descend</option>
                        <option value='insc'>Increase</option>
                    </select>

                    <Button style={{marginLeft: '3rem'}} className="small" onClick={goToSearch}>Search</Button>
                </div>
            </div>
            <div className="movie-grid">
                {
                    items.map((item) => <MovieCard item={item} key={item.id}/>)
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

/* const MovieSearch = props => {

    const history = useHistory();

    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

    const goToSearch = useCallback(
        () => {
            if (keyword.trim().length > 0) {
                history.push(`/${category[props.category]}/search/${keyword}`);
            }
        },
        [keyword, props.category, history]
    );

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        }
        document.addEventListener('keyup', enterEvent);
        return () => {
            document.removeEventListener('keyup', enterEvent);
        };
    }, [keyword, goToSearch]);

    return (
        <div className="movie-search">
            <input className='input' type='text' placeholder="Enter keyword" value={keyword}
                   onChange={(e) => setKeyword(e.target.value)}/>
            <Button style={{marginLeft: '3rem'}} className="small" onClick={goToSearch}>Search</Button>
        </div>
    )
} */

export default MovieGrid;