import React from 'react'
import 'antd/dist/antd.css'
import '../static/css/components/nav.scss'
import {Row,Col,Menu} from 'antd'
import { createFromIconfontCN } from '@ant-design/icons'
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1888734_usmcd7miyh.js',
});
const Nav=()=>(
    <div className="header">
        <Row type="flex" justify="center">
            <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                <span className="header-logo">Logo</span>
                <span className="header-text">this is slogan</span>
            </Col>
            <Col xs={0} sm={0} md={14} lg={8} xl={6}>
                <Menu mode="horizontal">
                    <Menu.Item key="tex"><IconFont type="iconhome"/>首页</Menu.Item>
                    <Menu.Item key="life"><IconFont type="iconwechat"/>生活</Menu.Item>
                    <Menu.Item  key="pic"><IconFont type="iconcamera"/>摄影</Menu.Item>
                </Menu>
            </Col>
        </Row>
    </div>
)
export default Nav
