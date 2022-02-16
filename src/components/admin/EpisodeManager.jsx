import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Card, message, Modal, Table} from "antd";
import axiosConfig from "../../api/axiosConfig";
import axiosInstance from "../../api/axiosInstance";

const EpisodeManager = () => {
    const {movieId} = useParams();
    const [movie, setMovie] = useState();
    const [epsTitle, setEpsTitle] = useState('');
    const [path, setPath] = useState('');
    const [epsVisible, setEpsVisible] = useState({
        visible: false,
        id: ''
    });

    useEffect(() => {
        axiosConfig.get(`/api/basic/movie/${movieId}`).then(res => {
            if (res.status === 200) {
                setMovie(res.data.data);
            }
        }).catch(err => {
            console.log(err)
            message.error("Error while getting movie info :'(");
        })
    }, [movieId]);

    console.log(movie);

    const epsTitleChangeHandler = (e) => {
        setEpsTitle(e.target.value)
    }
    const epsPathChangeHandler = (e) => {
        setPath(e.target.value)
    }

    const onsubmitHandler = () => {
        axiosInstance.post('/api/episode', {
            name: epsTitle,
            path: path,
            movieId: movieId
        }).then(res => {
            if (res.status === 200) {
                message.success('Add episode successfully!')
            }
        }).catch(err => {
            console.log(err)
            message.error('Add episode failed!')
        })
    }

    const updateEpisodeHandler = () => {
        axiosInstance.patch(`/api/episode/${epsVisible.id}`, path.length === 0 ? {name: epsTitle} : epsTitle.length === 0 ? {path: path} : {
            name: epsTitle,
            path: path
        }).then(res => {
            if (res.status === 200) {
                message.success('Update episode successfully!')
            }
        }).catch(err => {
            console.log(err)
            message.error('Update episode failed!')
        })
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: 'center'
        },
        {
            title: 'Path',
            dataIndex: 'path',
            key: 'path',
            align: 'center',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            align: 'center',
            render: (record) => (<>
                    <a onClick={() => setEpsVisible({
                        visible: true,
                        id: record.id
                    })} style={{marginRight: '1rem'}}>Update</a>
                    <a onClick={() => {
                        axiosInstance.delete(`/api/episode/${record.id}`).then((res) => {
                            if (res.status === 200) {
                                message.success('Episode has been deleted :(');
                            }
                        }).catch(err => {
                            console.log(err);
                            message.error('Can not deleted episode :(');
                        });
                    }}>Delete</a>
                </>
            )
        },
    ]

    return (
        <>
            <Modal title="Add Episode" visible={epsVisible.visible} onOk={updateEpisodeHandler}
                   onCancel={() => setEpsVisible({
                       visible: false,
                       id: ''
                   })}>
                <label className='form-control1__label' style={{color: '#000'}} id='epsTitle'>Add Episode
                    title</label>
                <input type='text' style={{border: '1px solid #000', borderRadius: '5px'}} name='epsTitle'
                       className='form-control1__input'
                       onChange={epsTitleChangeHandler}/>
                <label className='form-control1__label' style={{color: '#000'}} id='epsPath'>Add path</label>
                <input type='text' style={{border: '1px solid #000', borderRadius: '5px'}} name='epsPath'
                       className='form-control1__input'
                       onChange={epsPathChangeHandler}/>
            </Modal>
            <Card title={movie?.title}
                  style={{fontSize: '1.6rem', backgroundColor: '#1B1B1B', borderRadius: '5px'}}
                  headStyle={{color: '#fff'}}>
                <div style={{marginBottom: '2rem', display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <label className='form-control1__label' style={{color: '#fff'}} id='epsTitle'>Add Episode
                            title</label>
                        <input type='text' style={{border: '1px solid #000', borderRadius: '5px'}} name='epsTitle'
                               className='form-control1__input'
                               onChange={epsTitleChangeHandler}/>
                    </div>
                    <div>
                        <label className='form-control1__label' style={{color: '#fff'}} id='epsPath'>Add path</label>
                        <input type='text' style={{border: '1px solid #000', borderRadius: '5px'}} name='epsPath'
                               className='form-control1__input'
                               onChange={epsPathChangeHandler}/>
                    </div>
                    <div className='form-control1__btn mb-2'>
                        <button className='btn' type='submit' onClick={onsubmitHandler}>Add</button>
                    </div>
                </div>
                <Table columns={columns} dataSource={movie?.episodes}/>
            </Card>
        </>
    );
};

export default EpisodeManager;