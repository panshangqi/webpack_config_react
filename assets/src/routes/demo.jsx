import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,Redirect, Link, Switch} from 'react-router-dom';
import { createHashHistory } from 'history';
import 'antd/dist/antd.less'
import BasePage from '@components/BasePage'
import EchartsPlugsBar from '@pages/EchartsPlugs/bar_echarts.jsx'
import EchartsPlugsLine from '@pages/EchartsPlugs/line_echarts.jsx'
import EchartsPlugsSpread from '@pages/EchartsPlugs/spread_echarts.jsx'
import Summary from '@pages/Summary'
import AntdPlugs from '@pages/AntdPlugs'
import VirtualList from '@pages/VirtualList'

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
        <BasePage>
            <Switch>
                <Route exact path="/echarts_plugs_bar" component={EchartsPlugsBar}/>
                <Route exact path="/echarts_plugs_line" component={EchartsPlugsLine}/>
                <Route exact path="/echarts_plugs_spread" component={EchartsPlugsSpread}/>
                <Route exact path="/summary" component={Summary}/>
                <Route exact path="/antd_plugs" component={AntdPlugs}/>
                <Route exact path="/virtual_list" component={VirtualList}/>
                <Route component={VirtualList} />
            </Switch>
        </BasePage>
    </Router>
    , document.getElementById('root'));

