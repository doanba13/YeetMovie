import {Card, message} from "antd";
import AuthContext from "../../store/AuthContext";
import {useContext, useState} from "react";
import {Formik, Form} from "formik";
import * as Yup from 'yup';
import './ProfileEdit.scss';
import axiosInstance from "../../api/axiosInstance";

const ProfileEdit = () => {
    const [img, setImg] = useState(null);
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

    const onFileChange = (event) => {
        setImg(event.target.files[0]);
    };
    const onFileUpload = (id) => {

        const formData = new FormData();
        formData.append(
            "image",
            img
        );
        axiosInstance.patch('/api/user/user-image', formData, {
            'Content-Type': 'multipart/form-data'
        }).then(res => {
            if (res.status === 200) {
                message.success('Avatar upload successfully ;)')
            }
        }).catch(err => {
            console.log(err)
            message.success('Avatar upload failed ;(')
        })
    };

    return (
        <Card title={`${authCtx.userData.username}'s Profile`}
              style={{fontSize: '1.6rem', backgroundColor: '#1B1B1B', borderRadius: '5px'}} headStyle={{color: '#fff'}}>
            <Formik initialValues={{
                fullName: authCtx.userData.fullName,
                password: '',
                email: authCtx.userData.email,
                username: authCtx.userData.username,
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
            <div className='form-control1' style={{display: 'flex'}}>
                <input style={{width: '50%'}} className='form-control1__input' type="file" onChange={onFileChange}/>
                <button style={{width: '25%', marginTop: '.5rem'}} className='btn'
                        onClick={() => onFileUpload(authCtx.userData.id)}>
                    Upload
                </button>
            </div>
        </Card>
    );
}

export default ProfileEdit;