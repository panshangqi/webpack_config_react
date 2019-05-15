
import React, { Component } from 'react';
import {Button} from 'antd'
import Frame from '@components/frame'
import './style.less'

class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount(){

    }
    componentWillUnmount(){

    }

    render() {
        return (
            <div className="summary_html">
                <h2 className="title">构建方法</h2>
                <p>1. git clone webpack_config_react</p>
                <p>2. cd webpack_config_react</p>
                <p>3. npm install</p>
                <p>4. npm run eject</p>
                <p>5. cd..</p>
                <p>6. npm install</p>
            </div>
        );
    }
}

export default Summary;
