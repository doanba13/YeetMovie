import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AuthProvider} from "./store/AuthContext";
import {BrowserRouter} from "react-router-dom";
import ScrollToTop from "./config/ScrollToTop";

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
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

