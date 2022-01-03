import {Link, Route, Switch, BrowserRouter, useRouteMatch, useParams} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../store/AuthContext";
import './adminPanel.scss';
import UserManager from "./UserManager";
import MovieManager from "./MovieManager";
import CategoryManager from "./CategoryManager";
import TypeManager from "./TypeManager";
import EpisodeManager from "./EpisodeManager";
import ProfileEdit from "../user/ProfileEdit";

const AdminPanel = () => {
    let {path, url} = useRouteMatch();
    const params = useParams();
    console.log(params);
    const authCtx = useContext(AuthContext);
    return (
        <section className='admin'>
            <div className='sidebar'>
                <nav className='sidebar__nav'>
                    <ul className='sidebar__list'>
                        <li className='sidebar__link'>
                            <Link to={`${url}/user-manager`}>User Manager</Link>
                        </li>
                        <li className='sidebar__link'>
                            <Link to={`${url}/movie-manager`}>Movie Manager</Link>
                        </li>
                        <li className='sidebar__link'>
                            <Link to={`${url}/category-manager`}>Category Manager</Link>
                        </li>
                        <li className='sidebar__link'>
                            <Link to={`${url}/type-manager`}>Type Manager</Link>
                        </li>
                        <li className='sidebar__link'>
                            <Link to={`${url}/episode-manager`}>Episode Manager</Link>
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
                    <Route exact path={`${path}/user-manager`} component={UserManager}/>
                    <Route exact path={`${path}/movie-manager`} component={MovieManager}/>
                    <Route exact path={`${path}/category-manager`} component={CategoryManager}/>
                    <Route exact path={`${path}/type-manager`} component={TypeManager}/>
                    <Route exact path={`${path}/episode-manager`} component={EpisodeManager}/>
                </Switch>
            </div>
        </section>
    );
};

export default AdminPanel;