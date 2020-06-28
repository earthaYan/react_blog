import  React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import pub from '../config/pub'
import axios from 'axios'
import 'antd/dist/antd.css'
import {Card,Spin,Input,Button,message} from 'antd'
import {createFromIconfontCN} from '@ant-design/icons'
import '../static/css/Login.scss'
const IconFont = createFromIconfontCN({
    scriptUrl:[
        '//at.alicdn.com/t/font_1888734_9tohw3kesp.js'
    ]
})
function Login(props){
    const [userName,setUserName]= useState('')
    const [password,setPassword] =useState('')
    const [isLoading,setIsLoading] = useState(false)
    const history=useHistory()
    const checkLogin=()=>{
        if(!userName||!password){
            message.error('用户名或密码不能为空')
            return false
        }   
        setIsLoading(true)
        axios.post(pub.callApi().checkLogin,{
            userName,
            password
        })
        .then(res=>{
            setIsLoading(false)
            if(res.data.code===0){
                localStorage.setItem("openId",res.data.result.openId)
                // props.history.push('/index')
                // 使用react-router的hook
                history.push('/index')
            }else{
                message.error('用户名或密码错误')
            }
        })
        .catch(e=>{
            console.log(e.message)
        })
    }
    return (
        <div className="login-wrapper">
            <Spin tip="loading..." spinning={isLoading}  >
                <Card title="博客后台管理系统" style={{width:400}}  headStyle={{textAlign:'center'}}>
                    <div className="input">
                        <Input id="userName" size="large" placeholder="用户名" 
                            prefix={<IconFont type="iconuser"/>}
                            onChange={(e)=>{setUserName(e.target.value)}}/>
                    </div>
                    <div className="input">
                        <Input.Password id="password" size="large" placeholder="密码" 
                            prefix={<IconFont type="iconpassword"/>}
                            onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div>
                    <Button size="large" type="primary" block onClick={checkLogin}>登    录</Button>
                </Card>
            </Spin>
        </div>
    )
}
export default Login