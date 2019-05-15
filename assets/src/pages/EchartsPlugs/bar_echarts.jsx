
import React, { Component } from 'react';
import Frame from '@components/frame'
import './style.less'
import barChartCom from './bar_chart_com'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount(){
        barChartCom('bar_charts_example')
    }
    componentWillUnmount(){

    }

    render() {
        return (
            <div className="bar_html">
                <h2>eCharts Bar Demo</h2>
                <div>
                    <div id="bar_charts_example" style={{ width: 400, height: 250 }}></div>
                </div>
            </div>
        );
    }
}

export default Home;
