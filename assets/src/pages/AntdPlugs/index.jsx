
import React, { Component } from 'react';
import { Button, Radio, Icon, Input  } from 'antd';
import Frame from '@components/frame'
import './style.less'
const Search = Input.Search;
class AntdPlugs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'large',
        }
    }
    componentDidMount(){

    }
    componentWillUnmount(){

    }
    handleSizeChange = (e) => {
        this.setState({ size: e.target.value });
    }
    render() {
        const size = this.state.size;
        return (
            <div className="antd_plugs_html">
                <Radio.Group value={size} onChange={this.handleSizeChange}>
                    <Radio.Button value="large">Large</Radio.Button>
                    <Radio.Button value="default">Default</Radio.Button>
                    <Radio.Button value="small">Small</Radio.Button>
                </Radio.Group>
                <br />
                <br />
                <Button type="primary" size={size}>
                    Primary
                </Button>
                <Button size={size}>Normal</Button>
                <Button type="dashed" size={size}>
                    Dashed
                </Button>
                <Button type="danger" size={size}>
                    Danger
                </Button>
                <Button type="link" size={size}>
                    Link
                </Button>
                <br />
                <br />
                <Button type="primary" icon="download" size={size} />
                <Button type="primary" icon="download" size={size}>
                    Download
                </Button>
                <Button type="primary" icon="download" size={size}>
                    Download
                </Button>
                <br />
                <br />
                <Button.Group size={size}>
                    <Button type="primary">
                        <Icon type="left" />
                        Backward
                    </Button>
                    <Button type="primary">
                        Forward
                        <Icon type="right" />
                    </Button>
                </Button.Group>

                <Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    style={{ width: 200 }}
                />
                <br />
                <br />
                <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
                <br />
                <br />
                <Search
                    placeholder="input search text"
                    enterButton="Search"
                    size="large"
                    onSearch={value => console.log(value)}
                />
            </div>
        );
    }
}

export default AntdPlugs;
