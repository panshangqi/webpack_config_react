
import React, { Component } from 'react';
import Frame from '@components/frame'
import './style.less'
import barChartCom from './bar_chart_com'
import echarts from "echarts/lib/echarts";
import 'echarts/lib/chart/line'
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount(){
        var myChart = echarts.init(document.getElementById('charts_example'));
        myChart.setOption({
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }]
        })
    }
    componentWillUnmount(){

    }

    render() {
        return (
            <div className="line_html">
                <h2>eCharts Line Demo</h2>
                <div>
                    <div id="charts_example" style={{ width: 400, height: 250 }}></div>
                </div>
            </div>
        );
    }
}

export default Home;
