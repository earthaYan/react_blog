import React,{useState} from 'react'
import {Route} from 'react-router-dom'
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import '../static/css/AdminIndex.scss'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props){
    const [collapsed,setCollapsed]=useState(false)
    const onCollapse=(collapsed)=>{
        setCollapsed(collapsed)
    }
    const clickArticleManager=(e)=>{
      if(e.key==='addArticle'){
        props.history.push('/index/add')
      }else{
        props.history.push('/index/list/')
      }
    }
    return(
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo">logo</div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            {/* <Menu.Item key="1" icon={<PieChartOutlined />}>
              工作台
            </Menu.Item> */}
            <SubMenu key="sub1" icon={<UserOutlined />} title="文章管理" onClick={clickArticleManager}>
              <Menu.Item key="addArticle">添加文章</Menu.Item>
              <Menu.Item key="articleList">文章列表</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              留言管理
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>后台管理</Breadcrumb.Item>
              <Breadcrumb.Item>工作台</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24,backgroundColor:'#fff', minHeight: 360 }}>
              <div>
                <Route path='/index/' exact component={AddArticle}/>
                <Route path='/index/add/' exact  component={AddArticle}/>
                <Route path='/index/add/:id' exact  component={AddArticle}/>
                <Route path='/index/list/' exact component={ArticleList}/>
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design+react+mysql ©2020 Created by 月月颜</Footer>
        </Layout>
      </Layout>
    )
  }

export default AdminIndex