
import React, { Component } from 'react';
import Frame from '@components/frame'
import './style.less'
import barChartCom from './bar_chart_com'
import echarts from "echarts/lib/echarts";
import 'echarts/lib/chart/scatter'
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount(){
        var myChart = echarts.init(document.getElementById('charts_example'));
        myChart.setOption({
            xAxis: {},
            yAxis: {},
            series: [{
                symbolSize: 20,
                data: [
                    [10.0, 8.04],
                    [8.0, 6.95],
                    [13.0, 7.58],
                    [9.0, 8.81],
                    [11.0, 8.33],
                    [14.0, 9.96],
                    [6.0, 7.24],
                    [4.0, 4.26],
                    [12.0, 10.84],
                    [7.0, 4.82],
                    [5.0, 5.68]
                ],
                type: 'scatter'
            }]
        })
    }
    componentWillUnmount(){

    }

    render() {
        return (
            <div className="spread_html">
                <h2>eCharts Scatter Demo</h2>
                <div>
                    <div id="charts_example" style={{ width: 400, height: 250 }}></div>
                </div>
            </div>
        );
    }
}

export default Home;
