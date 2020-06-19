'use strict'
const Controller=require('egg').Controller
class MainController extends Controller{
    async index(){
        this.ctx.body="12"
    }
    async checkLogin(){
        let userName=this.ctx.request.body.userName
        let passWord=this.ctx.request.body.password
        console.log(this.ctx.request.body)
        const results=await this.app.mysql.select('admin_user',{
            where:{userName:userName,passWord:passWord},
            columns:['userName']
        })
        // if(results){
        //     // 登录成功
        //     const  openId=new Date().getTime()
        //     // 有openId就属于正常登录状态
        //     ctx.session.openId={"openId":openId}
        //     ctx.body={
        //         code:0,
        //         message:'login',
        //         result:{
        //             "openId":openId,
        //             "userName":userName
        //         }
        //     }
        // }else{
        //     ctx.body={
        //         code:1300,
        //         message:'wrong username or password',
        //         result:null
        //     }
        // }
        
    }
}
module.exports=MainController