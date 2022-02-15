import './Signup.scss';
import {Link} from "react-router-dom";
import {Formik, Form} from "formik";
import * as Yup from 'yup';
import AuthContext from "../../store/AuthContext";
import {useContext} from "react";
import axios from "axios";
import {message} from "antd";


const Login = () => {
    const authCtx = useContext(AuthContext);
    const validate = Yup.object({
        username: Yup.string()
            .min(2, "Mininum 2 characters")
            .max(15, "Maximum 15 characters")
            .required("Required!"),
        password: Yup.string()
            .min(3, "Minimum 3 characters")
            .required("Required!"),
    });

    return (
        <Formik
            initialValues={{
                username: "",
                password: "",
            }}
            validationSchema={validate}
            onSubmit={async (values) => {
                let formData = new FormData();

                formData.append('username', values.username);
                formData.append('password', values.password);

                const config = {
                    headers: {'content-type': 'multipart/form-data'}
                }
                const url = 'https://anhcuong.org/movie/api/basic/user/login';
                axios.post(url, formData, config)
                    .then(response => {
                        const authData = response.data;
                        authCtx.loginUser(authData.data);
                        message.success('Đăng nhập thành công')
                    })
                    .catch(error => {
                        console.log(error);
                        message.error('Không thể đăng nhập =))')
                    });
            }}
        >
            {formik => (
                <div className='content'>
                    <Form className='form'>
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
                        <div className='form-control__btn mb-2'>
                            <button className='btn' type='submit'>Login</button>
                        </div>
                        <div className='form-control__link'>
                            <Link to='/signup'>
                                <p>Didn't had any account? Sign up now.</p>
                            </Link>
                            <Link to='/resetpassword'>
                                <p>Forgot your password? Reset it now.</p>
                            </Link>
                        </div>
                    </Form>
                </div>
            )}

        </Formik>
    );
};

export default Login;