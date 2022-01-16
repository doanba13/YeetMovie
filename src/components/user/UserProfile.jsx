import {Link, Route, Switch, useRouteMatch} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../store/AuthContext";
import '../admin/adminPanel.scss';

import ProfileEdit from "./ProfileEdit";
import MovieHistory from "./MovieHistory";

const UserProfile = () => {
    let {path, url} = useRouteMatch();
    const authCtx = useContext(AuthContext);
    return (
        <section className='admin'>
            <div className='sidebar'>
                <nav className='sidebar__nav'>
                    <ul className='sidebar__list'>
                        <li className='sidebar__link'>
                            <Link to={`${url}/profile`}>Profile</Link>
                        </li>
                        <li className='sidebar__link'>
                            <Link to={`${url}/history`}>History</Link>
                        </li>
                        <li className='sidebar__link'>
                            <Link to={`${url}/liked-movies`}>Liked Movies</Link>
                        </li>
                        <li onClick={authCtx.logoutUser} className='sidebar__link'>
                            <a style={{color: '#ff0000', cursor: 'pointer'}}>Log Out</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div style={{width: '80%', heigh: '80vh', padding: '3rem'}}>
                <Switch>
                    <Route exact path={path} component={ProfileEdit}/>
                    <Route exact path={`${path}/profile`} component={ProfileEdit}/>
                    <Route exact path={`${path}/history`} component={MovieHistory}/>
                </Switch>
            </div>
        </section>
    );
};

export default UserProfile;