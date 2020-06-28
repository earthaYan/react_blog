import React,{useState,useEffect} from 'react'
import {List,Row,Col,message, Button,Space} from 'antd'
import '../static/css/ArticleList.scss'
import pub from '../config/pub'
import axios from 'axios'

function ArticleList(props){
    const [list,setList]=useState([])
    const getArticleList=()=>{
        axios.defaults.withCredentials=true
        axios.get(pub.callApi().getArticleList).then(res=>{
            if(res.data.code===0){
                setList(res.data.results.articles)
            }
        })
    }
    useEffect(()=>{
        // 数组为空表示只进行一次
        getArticleList()
    },[])
    return (
        <div className="list-wrapper">
            <List 
                bordered
                dataSource={list}
                header={
                       <Row>
                           <Col span={8}><b>标题</b></Col>
                           <Col span={4}><b>分类</b></Col>
                           <Col span={4}><b>查看人数</b></Col>
                           <Col span={4}><b>添加时间</b></Col>
                           <Col span={4}><b>操作</b></Col>
                       </Row> 
                }
                renderItem={item=>(
                    <List.Item>
                        <Row>
                           <Col span={8}>{item.title}</Col>
                           <Col span={4}>{item.typeName}</Col>
                           <Col span={4}>{item.viewCount}</Col>
                           <Col span={4}>{item.addTime}</Col>
                           <Col span={4}>
                               <Space>
                                   <Button type="primary">修改</Button>
                                   <Button type="danger">删除</Button>
                               </Space>
                           </Col>
                       </Row> 
                    </List.Item>
                )}/>
        </div>
    )
}
export default ArticleList
