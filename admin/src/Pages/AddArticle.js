import React,{useState,useEffect} from 'react'
import marked from 'marked'
import '../static/css/AddArticle.scss'
import {Row,Col,Input,Select,Button,DatePicker, message} from 'antd'
import pub from '../config/pub'
import axios from 'axios'
const {Option}=Select
const {TextArea}=Input
function AddArticle(props){
    // 0是新增加，非0是修改
    const [articleId,setArticleId]=useState(0)
    const [articleTitle,setArticleTitle]=useState('')
    // 文章
    const [articleContent,setArticleContent]=useState('')
    const [showHtml,setShowHtml]=useState('预览内容')
    // 简介
    const [introduce,setIntroduce]=useState('')
    const [introduceHtml,setIntroduceHtml]=useState('简介内容')
    // 日期
    const [createDate,setCreateDate]=useState()
    const [updateDate,setUpdateDate]=useState()
    // 文章类别
    const [typeInfo,setTypeInfo]=useState([])
    const [selectedType,setSelectedType]=useState('技术')
    marked.setOptions({
        renderer:new marked.Renderer(),
        // github标准的markdown
        gfm:true,
        // 尽可能兼容markdown.pl，默认false
        pedantic:false,
        //清理输出，忽略已经输入的html代码,false
        sanitize:false,
        // 允许支持表格语法
        tables:true,
        // 允许回车换行
        breaks:false,
        // 旧的内容被pedantic过滤掉,默认false
        smartLists:true,
        // 使用新的标点，默认false
        smartypants:false
    })
    const changeContent=(e,target1)=>{
        let html= marked(e.target.value)
        if(target1==='show'){
            setArticleContent(e.target.value) 
            setShowHtml(html)
        }else{
            setIntroduce(e.target.value)
            setIntroduceHtml(html)
        }
    }
    const getTypeInfo=()=>{
        axios({
            method:'get',
            url:pub.callApi().getTypeInfo,
            withCredentials:true//必须带上这个参数否则会返回401错误
        }).then(res=>{
            if(res.data.code===0){
                setTypeInfo(res.data.result)
            }
            else if(res.data.code===401){
                localStorage.removeItem('openId')
                message.error('您的登录已过期，请重新登录')
                props.history.push('/')  
            }
        })
    }
    const typeSelect=(value)=>{
        setSelectedType(value)
    }
    useEffect(()=>{
        getTypeInfo()
    },[])
    return(
        <div className="add-wrapper">
            <Row gutter={5}>
                {/* 左侧 */}
                <Col   span={18}>
                    <Row gutter={10} className="left-top">
                        <Col span={20}>
                            <Input placeholder="文章标题" size="large"/>
                        </Col>
                        <Col span={4}>
                            <Select defaultValue={selectedType} size="large" onChange={typeSelect}>
                                {
                                    typeInfo.map(type=>{
                                        return (<Option key={type.id} value={type.Id}>{type.typeName}</Option>)
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea className="markdown-content" 
                                rows={35} placeholder="文字内容" onChange={(e)=>{changeContent(e,'show')}}/>
                            <div className="introduce-html"></div>
                        </Col>
                        <Col span={12}>
                            <div className="html show-html"
                                dangerouslySetInnerHTML={{__html:showHtml}}>
                            </div>
                        </Col>
                    </Row>
                </Col>
                {/* 右侧 */}
                <Col  span={6} className="right-content">
                    <Row className="btnGroup">
                        <Col span={11}>
                            <Button size="large">暂存文章</Button>
                        </Col>
                        <Col span={11}>
                            <Button type="primary" size="large">发布文章</Button>
                        </Col>
                    </Row>
                    {/* 文章简介 */}
                    <Row>
                        <Col span={24}>
                            <TextArea placeholder="文章简介" rows={4} onChange={(e)=>changeContent(e,'introduce')}/>
                        </Col>
                    </Row>
                    <Row>
                        {/* 简介预览 */}
                        <Col span={24}>
                            <div className="html introduce-html" dangerouslySetInnerHTML={{__html:introduceHtml}}></div>
                        </Col>
                    </Row>
                    <Row gutter={4}>
                        <Col span={12}>
                            <DatePicker placeholder="发布日期"/>
                        </Col>
                        <Col span={12}>
                            <DatePicker placeholder="修改日期"/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}  
export default AddArticle