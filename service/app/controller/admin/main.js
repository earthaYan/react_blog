'use strict'
const Controller=require('egg').Controller
class MainController extends Controller{
    async index(){
    }
    async checkLogin(){
        const {ctx}=this
        let userName=ctx.request.body.userName
        let passWord=ctx.request.body.password
        const results=await this.app.mysql.select('admin_user',{
            where:{userName:userName,passWord:passWord},
            columns:['userName']
        })
        if(results.length){
            // 登录成功
            const  openId=new Date().getTime()
            // 有openId就属于正常登录状态
            ctx.session.openId=openId
            ctx.body={
                code:0,
                result:{
                    "openId":openId,
                    "userName":userName
                }
            }
        }else{
            ctx.body={
                code:1300,
                message:'wrong username or password',
                result:null
            }
        }
    }
    async getTypeInfo(){
        const resType=await this.app.mysql.select('type')
        this.ctx.body={
            code:0,
            result:resType
        }
    }
}
module.exports=MainController