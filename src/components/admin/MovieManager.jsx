import {Form, Formik} from "formik";
import axiosInstance from "../../api/axiosInstance";
import {Card, message, Space, Table} from "antd";
import * as Yup from "yup";
import {category} from "../../api/tmdbConfig";
import {useEffect, useState} from "react";

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        align: 'center'
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
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
                    axiosInstance.delete(`/api/category/${record.id}`).then((res) => {
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

const MovieManager = () => {
    const [categoryData, setCategoryData] = useState([]);
    const [typeData, setTypeData] = useState([]);

    useEffect(() => {
        axiosInstance.get(`/api/basic/category?search=&order=desc`).then(res => {
            setCategoryData(res.data);

        }).catch(err => {
            message.error("Error while getting category data :'(");
        })
        axiosInstance.get(`/api/basic/type?search=&order=desc`).then(res => {
            setTypeData(res.data);

        }).catch(err => {
            message.error("Error while getting category data :'(");
        })
    }, [])

    const validate = Yup.object({
        title: Yup.string()
            .min(6, "Mininum 2 characters")
            .required("Required!"),
        description: Yup.string()
            .min(6, "Mininum 2 characters")
            .required("Required!"),
        trailer: Yup.string()
            .min(6, "Mininum 2 characters")
            .required("Required!"),
        typeId: Yup.string()
            .required("Required!"),
        categoryId: Yup.string()
            .required("Required!"),
    });
    const validateSearch = Yup.object({
        order: Yup.string()
            .required("Required!"),
    });

    return (
        <Card title='Movie Category'
              style={{fontSize: '1.6rem', backgroundColor: '#1B1B1B', borderRadius: '5px'}} headStyle={{color: '#fff'}}>
            <Formik initialValues={{
                title: '',
                description: '',
                trailer: '',
                typeId: '',
                categoryId: '',
            }}
                    validationSchema={validate}
                    onSubmit={(value) => {
                        axiosInstance.post('/api/movie', value, {
                            'Content-Type': 'application/json'
                        }).then(res => {
                            if (res.status === 200) {
                                message.success('Movie added successfully ;)')
                            }
                        }).catch(err => {
                            console.log(err)
                            message.error('Movie added fail :(')
                        })
                        console.log(value);
                    }}
            >
                {formik => (
                    <div className='content1'>
                        <Form className='form1'>
                            <div className='form-control1'>
                                <label className='form-control1__label' id='title'>Add title</label>
                                <span className='form-control1__span'>
                        <input type='text' name='title' className='form-control1__input'
                               value={formik.values.title} onChange={formik.handleChange}/>
                                    {formik.errors.title && formik.touched.title && (
                                        <p>{formik.errors.title}</p>
                                    )}
                                </span>
                            </div>
                            <div className='form-control1'>
                                <label className='form-control1__label' id='description'>Add description</label>
                                <span className='form-control1__span'>
                        <input type='text' name='description' className='form-control1__input'
                               value={formik.values.description} onChange={formik.handleChange}/>
                                    {formik.errors.description && formik.touched.description && (
                                        <p>{formik.errors.description}</p>
                                    )}
                                </span>
                            </div>
                            <div className='form-control1'>
                                <label className='form-control1__label' id='trailer'>Add trailer</label>
                                <span className='form-control1__span'>
                        <input type='text' name='trailer' className='form-control1__input'
                               value={formik.values.trailer} onChange={formik.handleChange}/>
                                    {formik.errors.trailer && formik.touched.trailer && (
                                        <p>{formik.errors.trailer}</p>
                                    )}
                                </span>
                            </div>
                            <div className='form-control1'>
                                <label className='form-control1__label' id='typeId'>Type</label>
                                <span className='form-control1__span'>
                        <select type='select' name='typeId' className='form-control1__input'
                                onChange={formik.handleChange}>
                       {
                           typeData?.data && typeData?.data.map((item) =>
                               <option value={item.id}>{item.name}</option>
                           )
                       }
                        </select>
                                    {formik.errors.typeId && formik.touched.typeId && (
                                        <p>{formik.errors.typeId}</p>
                                    )}
                        </span>
                            </div>
                            <div className='form-control1'>
                                <label className='form-control1__label' id='categoryId'>Category</label>
                                <span className='form-control1__span'>
                        <select type='select' name='categoryId' className='form-control1__input'
                                onChange={formik.handleChange}>
                       {
                           categoryData?.data && categoryData?.data.map((item) =>
                               <option value={item.id}>{item.name}</option>
                           )
                       }
                        </select>
                                    {formik.errors.categoryId && formik.touched.categoryId && (
                                        <p>{formik.errors.categoryId}</p>
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
            {/*         <Formik initialValues={{
                path: ''
           }}
                    validationSchema={validateImg}
                    onSubmit={(value) => {
                        axiosInstance.get(`/api/basic/category?search=${value.search}&order=${value.order}`).then(res => {
                            setCategoryData(res.data);
                        }).catch(err => {
                            message.error("Error while getting type data :'(");
                        })
                    }}
            >
                {formikImg => (
                    <div className='content1'>
                        <Form className='form1'>
                            <div className='form-control1'>
                                <label className='form-control1__label' id='path'>Movie poster</label>
                                <span className='form-control1__span'>
                        <input type='file' name='path' className='form-control1__input'
                               value={formikImg.values.path} onChange={formikImg.handleChange}
                               placeholder={'Find all type? just click search ;)'}/>
                                    {formikImg.errors.path && formikImg.touched.path && (
                                        <p>{formikImg.errors.path}</p>
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
*/}
            <Formik initialValues={{
                search: '',
                order: 'desc'
            }}
                    validationSchema={validateSearch}
                    onSubmit={(value) => {
                        axiosInstance.get(`/api/basic/category?search=${value.search}&order=${value.order}`).then(res => {
                            setCategoryData(res.data);
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
                                <button className='btn' type='submit'>Search</button>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </Card>
    );
};

export default MovieManager;