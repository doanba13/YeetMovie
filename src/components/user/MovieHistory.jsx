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
            <Card title="Watched Movie" headStyle={{color: '#fff', fontSize: '1.4rem'}}
                  style={{
                      width: '100%',
                      backgroundColor: '#1B1B1B',
                      height: '100%',
                      borderRadius: '5px',
                      padding: '1rem'
                  }}>
                <Table key={(record) => record.id} style={{backgroundColor: '#1B1B1B'}}
                       dataSource={authCtx.userData.history}
                       columns={columns} pagination={false}/>
            </Card>
        </>
    );
};
export default MovieHistory;