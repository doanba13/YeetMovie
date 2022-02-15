import {Table, Card} from 'antd';
import {useContext} from "react";
import AuthContext from "../../store/AuthContext";


const columns = [
    {
        title: 'Title',
        dataIndex: 'movieName',
        key: 'movieName',
        align: 'center'
    },
    {
        title: 'Episode',
        dataIndex: 'episodeName',
        key: 'episodeName',
        align: 'center'
    },
    {
        title: 'Link',
        dataIndex: 'episodePath',
        key: 'episodePath',
        align: 'center'
    },
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
        align: 'center'
    },
];

const MovieHistory = () => {
    const authCtx = useContext(AuthContext);
    return (
        <>
            <Card title="Watched Movie" style={{fontSize: '1.6rem', backgroundColor: '#1B1B1B', borderRadius: '5px'}}
                  headStyle={{color: '#fff', fontSize: '1.4rem'}}>
                <Table key={(record) => record.id} style={{backgroundColor: '#1B1B1B'}}
                       dataSource={authCtx.userData.history}
                       columns={columns} pagination={false}/>
            </Card>
        </>
    );
};
export default MovieHistory;