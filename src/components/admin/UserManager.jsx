import {Table, Card, Avatar} from 'antd';
import axiosInstance from "../../api/axiosInstance";
import {useEffect, useState} from "react";

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        align: 'center'
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        align: 'center'
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        align: 'center'
    },
    {
        title: 'Fullname',
        dataIndex: 'fullName',
        key: 'fullName',
        align: 'center'
    },
    {
        title: 'Create date',
        dataIndex: 'createDate',
        key: 'createDate',
        align: 'center'
    },
    {
        title: 'Update date',
        dataIndex: 'updateDate',
        key: 'updateDate',
        align: 'center'
    },
];

const UserManager = () => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const res = await axiosInstance.get('/api/user/get-all');
            if (res.status === 200) {
                setUserData(res.data.data)
            } else if (res.status === 403) {
                console.log('unauthorized?')
            }
        };
        getData();
    }, [])

    console.log(userData)

    const newData = userData.content?.map((item) => ({
        createDate: new Date(item.createDate).toLocaleDateString("en-US"),
        updateDate: new Date(item.updateDate).toLocaleDateString("en-US"),
        username: <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <p style={{marginRight: '1rem', marginBottom: '0'}}>{item.username}</p>
            <Avatar src={item.avatar ? `http://54.169.180.127/${item.avatar}` : "https://joeschmoe.io/api/v1/random"}/>
        </div>,
        fullName: item.fullName,
        email: item.email,
        avatar: null,
        id: item.id
    })).sort((a, b) => a.id - b.id);
    ;
    return (
        <>
            <Card title="User Manager" headStyle={{color: '#fff', fontSize: '1.4rem'}}
                  style={{
                      width: '100%',
                      backgroundColor: '#1B1B1B',
                      height: '100%',
                      borderRadius: '5px',
                      padding: '1rem'
                  }}>
                <Table key={(record) => record.id} style={{backgroundColor: '#1B1B1B'}} dataSource={newData}
                       columns={columns} pagination={false}/>
            </Card>
        </>
    );
};
export default UserManager;