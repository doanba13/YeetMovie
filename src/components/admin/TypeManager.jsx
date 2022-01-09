import * as Yup from "yup";
import {Space, Card, message, Table} from "antd";
import {Form, Formik} from "formik";
import axiosInstance from "../../api/axiosInstance";
import {useState} from "react";

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        align: 'center'
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
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
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <a onClick={() => {
                    message.error('This feature hadnt done yet  ;.;')
                }}>Update</a>
                <a onClick={() => {
                    axiosInstance.delete(`/api/type/${record.id}`).then((res) => {
                        if (res.status === 200) {
                            message.success('Type has been deleted :(');
                        }
                    }).catch(err => {
                        console.log(err);
                        message.error('Can not deleted type :(');
                    });
                }}>Delete</a>
            </Space>
        ),
        align: 'center',
    },
];


const TypeManager = () => {
    const [typeData, setTypeData] = useState([]);
    console.log(typeData);
    const validate = Yup.object({
        type: Yup.string()
            .min(2, "Mininum 2 characters")
            .max(30, "Maximum 15 characters")
            .required("Required!"),
    });
    const validateSearch = Yup.object({
        order: Yup.string()
            .required("Required!"),
    });

    const newTypeData = typeData.data?.map((item) => ({
        createDate: new Date(item.createDate).toLocaleDateString("en-US"),
        updateDate: new Date(item.updateDate).toLocaleDateString("en-US"),
        type: item.name,
        id: item.id
    }))

    return (
        <Card title='Movie Type'
              style={{fontSize: '1.6rem', backgroundColor: '#1B1B1B', borderRadius: '5px'}} headStyle={{color: '#fff'}}>
            <Formik initialValues={{
                type: '',
            }}
                    validationSchema={validate}
                    onSubmit={(value) => {
                        axiosInstance.post('/api/type', {
                            name: value.type,
                        }, {
                            'Content-Type': 'application/json'
                        }).then(res => {
                            if (res.status === 200) {
                                message.success("Type added successfully :)");
                            }
                        }).catch(err => {
                            message.error("Type added failed :'(");
                        })
                    }}
            >
                {formikAdd => (
                    <div className='content1'>
                        <Form className='form1'>
                            <div className='form-control1'>
                                <label className='form-control1__label' id='type'>Add movie type</label>
                                <span className='form-control1__span'>
                        <input type='text' name='type' className='form-control1__input'
                               value={formikAdd.values.type} onChange={formikAdd.handleChange}/>
                                    {formikAdd.errors.type && formikAdd.touched.type && (
                                        <p>{formikAdd.errors.type}</p>
                                    )}
                                </span>
                            </div>
                            <div className='form-control1__btn mb-2'>
                                <button className='btn' type='submit'>Add</button>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
            <Formik initialValues={{
                search: '',
                order: 'desc'
            }}
                    validationSchema={validateSearch}
                    onSubmit={(value) => {
                        axiosInstance.get(`/api/basic/type?search=${value.search}&order=${value.order}`).then(res => {
                            setTypeData(res.data);
                        }).catch(err => {
                            message.error("Error while getting type data :'(");
                        })
                    }}
            >
                {formikSearch => (
                    <div className='content1'>
                        <Form className='form1'>
                            <div className='form-control1'>
                                <label className='form-control1__label' id='search'>Type</label>
                                <span className='form-control1__span'>
                        <input type='text' name='search' className='form-control1__input'
                               value={formikSearch.values.search} onChange={formikSearch.handleChange}
                               placeholder={'Find all type? just click search ;)'}/>
                                    {formikSearch.errors.search && formikSearch.touched.search && (
                                        <p>{formikSearch.errors.search}</p>
                                    )}
                        </span>
                            </div>
                            <div className='form-control1'>
                                <label className='form-control1__label' id='order'>Order</label>
                                <span className='form-control1__span'>
                        <select type='select' name='order' className='form-control1__input'
                                onChange={formikSearch.handleChange}>
                        <option value='desc'>Descend</option>
                        <option value='insc'>Increase</option>
                        </select>
                                    {formikSearch.errors.type && formikSearch.touched.type && (
                                        <p>{formikSearch.errors.type}</p>
                                    )}
                        </span>
                            </div>
                            <div className='form-control1__btn mb-2'>
                                <button className='btn' type='submit'>Tìm kiếm</button>
                            </div>
                        </Form>
                        {newTypeData && <Table key={(record) => record.id} style={{backgroundColor: '#1B1B1B'}}
                                               dataSource={newTypeData}
                                               columns={columns} pagination={false}/>}
                    </div>
                )}
            </Formik>
        </Card>
    );
};

export default TypeManager;