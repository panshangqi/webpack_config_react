
import React, { Component } from 'react';
import {Menu, Icon, Button,Layout} from 'antd'
import Frame from '@components/frame'
import $ from 'jquery'
import './style.less'
const SubMenu = Menu.SubMenu;
const { Header, Sider, Content } = Layout;
import logo from '@imgs/favicon.png'
import antd_icon from '@imgs/antd.svg'
class PageHead extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.headHeight = 65
        this.state = {
            selected_key: '1',
            windowHeight: $(window).height() - this.headHeight
        }
    }
    componentDidMount(){
        var self = this
        $(window).resize(function() {
            console.log($(window).height())
            self.setState({
                windowHeight: $(window).height() - self.headHeight
            })
        });
    }
    componentWillUnmount(){

    }
    MenuSelectClick = ({item, key, Event}) =>{
        this.setState({
            selected_key: key
        })
        if(key === '1'){
            window.location.href = '#/summary'
        }else if(key === '2'){
            window.location.href = '#/antd_plugs'
        }else if(key === '5'){
            window.location.href = '#/echarts_plugs'
        }else if(key === '6'){
            window.location.href = '#/echarts_plugs_line'
        }else if(key === '7'){
            window.location.href = '#/echarts_plugs_spread'
        }
    }
    renderMenu(){
        return (
            <Menu
                selectedKeys={[this.state.selected_key]}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={this.state.collapsed}
                onSelect={this.MenuSelectClick}
            >
                <Menu.Item key="1">
                    <Icon type="edit" />
                    <span>概 述</span>
                </Menu.Item>
                <Menu.Item key="2">
                    <img src={antd_icon}/>
                    <span className="text">Antd插件</span>
                </Menu.Item>
                <SubMenu
                    key="3"
                    title={<span>
                        <Icon type="area-chart" />
                        <span>Echart插件</span>
                    </span>}
                >
                    <Menu.Item key="5">柱形图</Menu.Item>
                    <Menu.Item key="6">折线图</Menu.Item>
                    <Menu.Item key="7">散点图</Menu.Item>
                </SubMenu>

                <SubMenu
                    key="sub2"
                    title={
                        <span>
                <Icon type="appstore" />
                <span>Navigation Two</span>
              </span>
                    }
                >
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="11">Option 11</Menu.Item>
                        <Menu.Item key="12">Option 12</Menu.Item>
                    </SubMenu>
                </SubMenu>
            </Menu>
        )
    }
    render() {
        return (
            <div className="page_html">

                <Layout>
                    <Header style={{padding: 0}}>
                        <img className="logo" src={logo}/>
                    </Header>
                    <Layout style={{height: this.state.windowHeight}}>
                        <Sider>{this.renderMenu()}</Sider>
                        <Content>
                            <div className="content">
                                {this.props.children}
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default PageHead;
