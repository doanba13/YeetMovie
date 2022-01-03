import './footer.scss';

import {Link} from "react-router-dom";

import background from '../../assets/footer-bg.jpeg';
import logo from '../../assets/ylogo.png';

const Footer = () => {
    return (
        <div className='footer'
             style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)), url(${background})`}}>
            <div className="footer__content container">
                <div className="footer__content__logo">
                    <div className="logo">
                        <img src={logo} alt=""/>
                        <Link to='/'>NotFlush</Link>
                    </div>
                </div>
                <div className="footer__content__menus">
                    <div className="footer__content__menu">
                        <Link to='/'>Home</Link>
                        <Link to='/'>Contact</Link>
                        <Link to='/'>Terms of Services</Link>
                        <Link to='/'>About us</Link>
                    </div>
                    <div className="footer__content__menu">
                        <Link to='/'>Live</Link>
                        <Link to='/'>FAQ</Link>
                        <Link to='/'>Premium</Link>
                        <Link to='/'>Privacy Policy</Link>
                    </div>
                    <div className="footer__content__menu">
                        <Link to='/'>You must watch</Link>
                        <Link to='/'>Recent releash</Link>
                        <Link to='/'>Top IMDB</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;