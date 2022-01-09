import {Card} from "antd";
import AuthContext from "../../store/AuthContext";
import {useContext} from "react";
import {Formik, Form} from "formik";
import * as Yup from 'yup';
import './ProfileEdit.scss';
import axiosInstance from "../../api/axiosInstance";

const ProfileEdit = () => {
    const authCtx = useContext(AuthContext);
    const validate = Yup.object({
        fullName: Yup.string()
            .min(6, "Mininum 2 characters")
            .max(30, "Maximum 15 characters")
            .required("Required!"),
        email: Yup.string()
            .email("Invalid email format")
            .required("Required!"),
        password: Yup.string()
            .min(6, "Minimum 6 characters")
            .required("Required!"),
    });
    const validatePic = Yup.object({
        avatar: Yup.string()
            .required("Required!"),
    });

    return (
        <Card title={`${authCtx.user}'s Profile`}
              style={{fontSize: '1.6rem', backgroundColor: '#1B1B1B', borderRadius: '5px'}} headStyle={{color: '#fff'}}>
            <Formik initialValues={{
                fullName: authCtx.user.fullName,
                password: '',
                email: authCtx.user.email,
                username: authCtx.user.username,
            }}
                    validationSchema={validate}
                    onSubmit={(value) => {
                        axiosInstance.patch('/api/user', {
                            fullName: value.fullName,
                            password: value.password,
                            email: value.email,
                        }, {
                            'Content-Type': 'application/json'
                        }).then(res => {
                            console.log(res);
                        }).catch(err => {
                            console.log(err)
                        })
                    }}
            >
                {formik => (
                    <div className='content1'>
                        <Form className='form1'>
                            <div className='form-control1'>
                                <label className='form-control1__label' id='username'>Username</label>
                                <span className='form-control1__span'>
                        <input type='text' name='username' className='form-control1__input'
                               value={formik.values.username} disabled/>
                                </span>
                            </div>
                            <div className='form-control1'>
                                <label className='form-control1__label' id='fullName'>Full Name</label>
                                <span className='form-control1__span'>
                        <input type='text' name='fullName' className='form-control1__input'
                               value={formik.values.fullName} onChange={formik.handleChange}/>

                                    {formik.errors.fullName && formik.touched.fullName && (
                                        <p>{formik.errors.fullName}</p>
                                    )}
                                </span>
                            </div>
                            <div className='form-control1'>
                                <label className='form-control1__label' id='email'>Email</label>
                                <span className='form-control1__span'>
                        <input type='email' name='email' className='form-control1__input'
                               value={formik.values.email} onChange={formik.handleChange}/>

                                    {formik.errors.email && formik.touched.email && (
                                        <p>{formik.errors.email}</p>
                                    )}
                                </span>
                            </div>
                            <div className='form-control1'>
                                <label className='form-control1__label' id='password'>Password</label>
                                <span className='form-control1__span'>
                        <input type='password' name='password' className='form-control1__input'
                               value={formik.values.password} onChange={formik.handleChange}/>

                                    {formik.errors.password && formik.touched.password && (
                                        <p>{formik.errors.password}</p>
                                    )}
                                </span>
                            </div>
                            <div className='form-control1__btn mb-2'>
                                <button className='btn' type='submit'>Update</button>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
            <Formik initialValues={{
                avatar: '',
            }} validationSchema={validatePic}
                    onSubmit={(value) => {
                        let formData = new FormData();
                        formData.append('image', value.avatar);
                        axiosInstance.patch('/api/user/user-image', formData, {
                            'Content-Type': 'multipart/form-data'
                        })
                            .then(res => {
                                const data = res.data;
                                console.log(data);
                            }).catch(err => {
                            console.log(err)
                        })
                    }}
            >
                {formikPic => (<div className='content1'>
                    <Form className='form1'>
                        <div className='form-control1'>
                            <label className='form-control1__label' id='avatar'>Upload your avatar</label>
                            <span className='form-control1__span'>
                        <input type='file' name='avatar' className='form-control1__input' accept="image/jpg"
                               value={formikPic.values.avatar} onChange={formikPic.handleChange}/>
                                {formikPic.errors.avatar && formikPic.touched.avatar && (
                                    <p>{formikPic.errors.avatar}</p>
                                )}
                                </span>
                        </div>
                        <div className='form-control1__btn mb-2'>
                            <button className='btn' type='submit'>Upload</button>
                        </div>
                    </Form>
                </div>)}
            </Formik>
        </Card>
    );
}

export default ProfileEdit;