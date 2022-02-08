import {useContext, useEffect, useRef} from "react";
import './header.scss';
import {useLocation, Link, useHistory} from "react-router-dom";
import logo from '../../assets/ylogo.png';
import authContext from "../../store/AuthContext";
import {Avatar} from "antd";

const headerNav = [
    {
        display: 'Home',
        path: '/',
    },
    {
        display: 'Movies',
        path: '/movies',
    },
    {
        display: 'TV Series',
        path: '/tv',
    },
]

const Header = () => {
    const authCtx = useContext(authContext);
    const {pathname} = useLocation();
    const history = useHistory();
    const headerRef = useRef(null);
    const active = headerNav.findIndex(e => e.path === pathname);

    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');
            }
        };
        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        };
    }, [])

    return (
        <div className='header' ref={headerRef}>
            <div className="header__wrap container">
                <div className="logo">
                    <img src={logo} alt=""/>
                    <Link to='/'>notFlush</Link>
                </div>
                <ul className="header__nav">
                    {
                        headerNav.map((e, i) => (
                            <li key={i} className={`${i === active ? 'active' : ''}`}>
                                <Link to={e.path}>
                                    {e.display}
                                </Link>
                            </li>
                        ))
                    }
                    {authCtx.user && <li>
                        <a onClick={authCtx.logoutUser}>
                            Logout
                        </a>
                    </li>}
                    {!authCtx.user && <li>
                        <Link to={'/login'}>
                            Login
                        </Link>
                    </li>}
                    {authCtx.user &&
                        <li
                            onClick={() => authCtx.userData.username === 'admin' ? history.push('/admin') : history.push('/user')}>
                            <div className='user'>
                                <div className='user__logo'>
                                    <Avatar size='large'
                                            src={authCtx.userData?.avatar ? `http://54.169.180.127${authCtx.userData?.avatar}` : 'https://joeschmoe.io/api/v1/random'}
                                            alt="Han Solo"/>
                                </div>
                            </div>
                        </li>}
                </ul>
            </div>
        </div>
    );
};

export default Header;