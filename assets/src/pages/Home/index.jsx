
import React, { Component } from 'react';
import {Button} from 'antd'
import Frame from '@components/frame'
import './style.less'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount(){
        //http://10.200.3.16:3202
        Frame.http.get('/api/client/check_version_enable',{version: '0.2.0'},function (data) {
            console.log(data)
        })
    }
    componentWillUnmount(){

    }

    render() {
        return (
            <div className="home_html">
                <span className="title">Hello2111221001</span>
                <span>{process.env.NODE_ENV}</span>
                <Button>Btn1</Button>
            </div>
        );
    }
}

export default Home;
