import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Route } from "react-router-dom";

import Home from "./components/Home";
import User from "./components/User";

import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter basename="/app">
        <div>
            <Route path="/home" component={Home} />
            <Route path="/user" component={User} />
        </div>
    </BrowserRouter>,
    document.getElementById('root'));

registerServiceWorker();
