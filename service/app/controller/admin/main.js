'use strict'
const Controller=require('egg').Controller
class MainController extends Controller{
    async index(){
        this.ctx.body="12"
    }
    async checkLogin(){
        const {ctx}=this
        let userName=ctx.request.body.userName
        let pwd=ctx.request.body.passWord
        const  sql="SELECT userName,pwd FROM admin_user WHERE userName='颜' AND pwd='12344'"
        const results=await this.app.mysql.query(sql)
        console.log(results)
        if(results.length){
            // 登录成功
            const  openId=new Date().getTime()
            // 有openId就属于正常登录状态
            ctx.session.openId={"openId":openId}
            ctx.body={
                code:0,
                message:'login successfully',
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
}
module.exports=MainController