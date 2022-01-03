import {Route, Switch} from 'react-router-dom';

import Home from '../pages/home';
import Catalog from '../pages/catalog';
import Detail from '../pages/detail';
import Signup from "../components/login/Signup";
import Login from "../components/login/Login";
import ForgotPassword from "../components/login/ForgotPassword";
import AdminPanel from "../components/admin/AdminPanel";

const Routes = () => {
    return (
        <Switch>
            <Route
                path='/login'
                exact
                component={Login}
            />
            <Route
                path='/resetpassword'
                exact
                component={ForgotPassword}
            />
            <Route
                path='/signup'
                exact
                component={Signup}
            />
            <Route
                path='/admin'
                component={AdminPanel}
            />
            <Route
                path='/:category/search/:keyword'
                component={Catalog}
            />
            <Route
                path='/:category/:id'
                component={Detail}
            />
            <Route
                path='/:category'
                component={Catalog}
            />

            <Route
                path='/'
                exact
                component={Home}
            />
        </Switch>
    );
};

export default Routes;