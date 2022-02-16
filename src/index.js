import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AuthProvider} from "./store/AuthContext";
import {BrowserRouter} from "react-router-dom";
import ScrollToTop from "./config/ScrollToTop";

ReactDOM.render(
    <BrowserRouter basename={'/'}>
        <ScrollToTop>
            <AuthProvider>
                <React.StrictMode>
                    <App/>
                </React.StrictMode>
            </AuthProvider>
        </ScrollToTop>
    </BrowserRouter>,
    document.getElementById('root')
);

