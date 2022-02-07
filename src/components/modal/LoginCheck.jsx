import loginImg from "../../assets/loginCheck.png"
import './loginCheck.scss'

const LoginCheck = () => {
    return (
        <div className="container-modal">
            <div className="content-modal">
                <img style={{height: '300px'}} src={loginImg}/>
                <h1>You need Login to rate this movie.</h1>
                <h3>Create account</h3>
            </div>
        </div>
    );
};

export default LoginCheck;