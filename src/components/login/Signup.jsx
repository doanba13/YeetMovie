import './Signup.scss';
import {Link} from "react-router-dom";
import {Form, Formik} from "formik";
import * as Yup from 'yup';
import axios from "axios";
import {message} from 'antd';
import {useHistory} from "react-router-dom";

const Signup = () => {
    const history = useHistory();
    const validate = Yup.object({
        fullname: Yup.string()
            .min(6, "Mininum 2 characters")
            .max(30, "Maximum 15 characters")
            .required("Required!"),
        username: Yup.string()
            .min(2, "Mininum 2 characters")
            .max(15, "Maximum 15 characters")
            .required("Required!"),
        email: Yup.string()
            .email("Invalid email format")
            .required("Required!"),
        password: Yup.string()
            .min(6, "Minimum 6 characters")
            .required("Required!"),
        confirm_password: Yup.string()
            .oneOf([Yup.ref("password")], "Password's not match")
            .required("Required!")
    });

    return (
        <Formik
            initialValues={{
                fullname: "",
                username: "",
                email: "",
                password: "",
                confirm_password: ""
            }}
            validationSchema={validate}
            onSubmit={(values => {
                const data = {
                    username: values.username,
                    fullName: values.fullname,
                    password: values.password,
                    email: values.email,
                };
                const url = 'http://54.169.180.127/movie/api/basic/user/create';
                axios.post(
                    url,
                    data,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                ).then(response => {
                    if (response.status === 200) {
                        message.success("Tạo tài khoản thành công :D");
                    }
                })
                    .catch(e => {
                        message.error('Đăng ký không thành công =))')
                        if (e.response && e.response.data) {
                            message.error('Đăng ký không thành công =))')
                        }
                    });
            })}

        >
            {formik => (
                <div className='content'>
                    <Form className='form'>
                        <div className='form-control'>
                            <label className='form-control__label' id='fullname'>Full name</label>
                            <span className='form-control__span'>
                        <input type='text' name='fullname' className='form-control__input'
                               value={formik.values.fullname}
                               onChange={formik.handleChange}/>
                                {formik.errors.username && formik.touched.username && (
                                    <p>{formik.errors.fullname}</p>
                                )}
                                 </span>
                        </div>
                        <div className='form-control'>
                            <label className='form-control__label' id='email'>Email</label>
                            <span className='form-control__span'>
                        <input type='email' name='email' className='form-control__input'
                               value={formik.values.email}
                               onChange={formik.handleChange}/>

                                {formik.errors.email && formik.touched.email && (
                                    <p>{formik.errors.email}</p>
                                )}
                                 </span>
                        </div>
                        <div className='form-control'>
                            <label className='form-control__label' id='username'>Username</label>
                            <span className='form-control__span'>
                        <input type='text' name='username' className='form-control__input'
                               value={formik.values.username}
                               onChange={formik.handleChange}/>

                                {formik.errors.username && formik.touched.username && (
                                    <p>{formik.errors.username}</p>
                                )}
                                 </span>
                        </div>
                        <div className='form-control'>
                            <label className='form-control__label' id='password'>Password</label>
                            <span className='form-control__span'>
                        <input type='password' name='password' className='form-control__input'
                               value={formik.values.password} onChange={formik.handleChange}/>

                                {formik.errors.password && formik.touched.password && (
                                    <p>{formik.errors.password}</p>
                                )}
                                 </span>
                        </div>
                        <div className='form-control'>
                            <label className='form-control__label' id='confirm_password'>Confirm Password</label>
                            <span className='form-control__span'>
                        <input type='password' name='confirm_password' className='form-control__input'
                               value={formik.values.confirm_password} onChange={formik.handleChange}/>

                                {formik.errors.confirm_password && formik.touched.confirm_password && (
                                    <p>{formik.errors.confirm_password}</p>
                                )}
                                 </span>

                        </div>
                        <div className='form-control__btn mb-2'>
                            <button className='btn' type='submit'>Sign up</button>
                        </div>
                        <div className='form-control'>
                            <Link to='/login'>
                                <p>Already have an account? Login now.</p>
                            </Link>
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    );
};

export default Signup;