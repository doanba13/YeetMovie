import './Signup.scss';
import {Link} from "react-router-dom";
import {useFormik, Formik, Form} from "formik";
import * as Yup from 'yup';

const ForgotPassword = () => {
    const validate = Yup.object({
        email: Yup.string()
            .email("Invalid email format")
            .required("Required!"),
    });

    return (
        <Formik initialValues={{email: ""}}
                onSubmit={(values => {
                    alert(JSON.stringify(values, null, 2))
                })}
                validationSchema={validate}>

            {formik => (
                <div className='content'>
                    <Form className='form'>
                        <div className='form-control'>
                            <label className='form-control__label' id='username'>Email</label>
                            <span className='form-control__span'>
                        <input type='text' name='email' className='form-control__input'
                               value={formik.values.email}
                               onChange={formik.handleChange}/>
                                {formik.errors.email && formik.touched.email && (
                                    <p>{formik.errors.email}</p>
                                )}
                    </span>
                        </div>
                        <div className='form-control__btn mb-2'>
                            <button className='btn' type='submit'>Reset Password</button>
                        </div>
                        <div className='form-control'>
                            <Link to='/login'>
                                <p1>Move to Log in page?</p1>
                            </Link>
                        </div>
                    </Form>
                </div>
            )}

        </Formik>
    );
};

export default ForgotPassword;