import  React,{useState} from 'react'
import 'antd/dist/antd.css'
import {Card,Spin,Input} from 'antd'
import {createFromIconfontCN} from '@ant-design/icons'
const IconFont = createFromIconfontCN({
    scriptUrl:[
        '//at.alicdn.com/t/font_1888734_9tohw3kesp.js'
    ]
})
function Login(){
    const [userName,setUserName]= useState('')
    const [password,setPassword] =useState('')
    const [isLoading,setIsLoading] = useState(false)
    return (
        <div className="login-wrapper">
            <Spin tip="loading..." spinning={isLoading}  >
                <Card title="博客后台管理系统" style={{width:400,background:'red'}} headStyle={{textAlign:'center'}}>
                    <div>
                        <Input id="userName" size="large" placeholder="用户名" prefix={<IconFont type="iconuser"/>}/>
                    </div>
                    <div>
                        <Input id="password" size="large" placeholder="密码" prefix={<IconFont type="iconpassword"/>}/>
                    </div>

                </Card>
            </Spin>
        </div>
    )
}
export default Login