import  React,{useState} from 'react'
import pub from '../config/pub'
import axios from 'axios'
import 'antd/dist/antd.css'
import {Card,Spin,Input,Button} from 'antd'
import {createFromIconfontCN} from '@ant-design/icons'
import '../static/css/Login.scss'
const IconFont = createFromIconfontCN({
    scriptUrl:[
        '//at.alicdn.com/t/font_1888734_9tohw3kesp.js'
    ]
})
function Login(){
    const [userName,setUserName]= useState('')
    const [password,setPassword] =useState('')
    const [isLoading,setIsLoading] = useState(false)
    const checkLogin=()=>{
        setIsLoading(true)
        if(!userName||!password){
            return false
        }   
        axios.post(pub.callApi().checkLogin,{
            userName,
            password
        }).then(res=>{
            setIsLoading(false)
            console.log(res)
        }).catch(e=>{
            setIsLoading(false)
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