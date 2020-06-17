import React,{useState} from 'react'
import marked from 'marked'
import '../static/css/AddArticle.scss'
import {Row,Col,Input,Select,Button,DatePicker} from 'antd'
const {Option}=Select
const {TextArea}=Input
function AddArticle(){
    const [articleContent,setArticleContent]=useState('')
    const [showHtml,setShowHtml]=useState('预览内容')
    const [introduce,setIntroduce]=useState('')
    const [introduceHtml,setIntroduceHtml]=useState('简介内容')
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
                            <Select defaultValue="1" size="large">
                                <Option value="1">随笔小篆家回到家</Option>
                                <Option value="2">技术</Option>
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