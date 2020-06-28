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
    async addArticle(){
        var new_article=this.ctx.request.body
        let results=await this.app.mysql.insert('article',new_article)
        const insertSuccess = results.affectedRows === 1
        const insertId=results.insertId
        this.ctx.body={
            insertSuccess,
            insertId
        }
    }
    async updateArticle(){
        var new_article=this.ctx.request.body
        let results=await this.app.mysql.update('article',new_article)
        const updateSuccess = results.affectedRows === 1
        this.ctx.body={
            updateSuccess
        }
    }
    async getArticleList(){
        const sql=`SELECT article.id AS id,article.title AS title,article.addTime AS addTime,article.viewCount,type.typeName AS typeName FROM article LEFT JOIN TYPE ON article.typeId=type.id ORDER BY article.id DESC`
        let results=await this.app.mysql.query(sql)
        if(results.length){
            this.ctx.body={
                code:0,
                results:{
                    count:results.length,
                    articles:results
                }
            }
        }
    }
}
module.exports=MainController