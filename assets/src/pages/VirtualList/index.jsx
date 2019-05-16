
import React, { Component } from 'react';
import { List } from 'react-virtualized'
import $ from 'jquery'
import './style.less'
import datalist from './data.jsx'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: datalist.body.students,
            listWidth: ($(window).width() - 250),
            listHeight: $(window).height() - 100
        }
        this.lineHeight = 38
        //console.log(this.state.list)
    }
    componentDidMount(){
        var self = this
        $(window).resize(function () {
            self.setState({
                listWidth: $(window).width() - 250,
                listHeight: $(window).height() - 100
            })
        })
    }
    componentWillUnmount(){

    }
    rowRenderer = ({key,index, style}) => {
        var item = this.state.list[index]
        //console.log(style)
        return (
            <div
                key={key}
                index={index}
                style={style}
                className="list_row"
            >

                <div style={{width:'30%',textAlign: 'center'}}>{item.real_name}</div>
                <div style={{width:'16%'}}>{item.exam_number}</div>
                <div style={{width:'16%'}}>{item.class_name}</div>
                <div style={{width:'16%'}}>{item.school_id}</div>
                <div style={{width:'16%'}}>{item.room_number}</div>
                <div style={{width:'16%'}}>{item.student_id}</div>
            </div>
        )
    }
    render() {
        return (
            <div className="virtual_html">
                <List
                    width={this.state.listWidth}
                    height={this.state.listHeight}
                    rowCount={this.state.list.length}
                    rowHeight={this.lineHeight}
                    rowRenderer={this.rowRenderer}
                />
            </div>
        );
    }
}

export default Home;
