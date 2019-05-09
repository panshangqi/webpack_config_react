import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,Redirect, Link, Switch} from 'react-router-dom';
import { createHashHistory } from 'history';
import 'antd/dist/antd.less'
import './index.less'
import Home from '@pages/Home'

var history = createHashHistory();
//loading-component 动态组件加载s
//使用 react-loadable 动态 import React 组件，让首次加载时只加载当前路由匹配的组件。
document.onreadystatechange = function () {
    console.log(document.readyState);
    if(document.readyState === 'complete') {

    }else{

    }
}
ReactDOM.render(
    <Router history={history}>
        <Switch>
            <Route exact path="/home" component={Home}/>
            <Route component={Home} />
        </Switch>
    </Router>
    , document.getElementById('root'));

