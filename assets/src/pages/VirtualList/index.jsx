
import React, { Component } from 'react';
import { List } from 'react-virtualized'
import './style.less'


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount(){
        //http://10.200.3.16:3202
        // Frame.http.get('/api/client/check_version_enable',{version: '0.2.0'},function (data) {
        //     console.log(data)
        // })

        barChartCom('bar_charts_example')
    }
    componentWillUnmount(){

    }

    render() {
        return (
            <div className="virtual_html">
                <List
                    width={300}
                    height={300}
                    rowCount={list.length}
                    rowHeight={20}
                    rowRenderer={rowRenderer}
                />
            </div>
        );
    }
}

export default Home;
