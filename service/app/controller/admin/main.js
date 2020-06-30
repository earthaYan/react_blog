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
        const sql=`SELECT article.id AS id,article.title AS title,FROM_UNIXTIME(article.addTime,'%Y-%m-%d') AS addTime,article.viewCount,type.typeName AS typeName FROM article LEFT JOIN type ON article.typeId=type.id ORDER BY article.id DESC`
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
    async delArticle(){
        let id=this.ctx.params.id
        if(id){
            const res=await this.app.mysql.delete('article',{
                id
            })
            const del=res.affectedRows===1
            this.ctx.body={
                code:0,
                idDeleted:del
            }
        }else{
            this.ctx.body={
                code:1000,
                message:'an id is required'
            }
        }
    }
    async getArticleById(){
        let id=this.ctx.params.id
        if(id){
            const sql=`SELECT article.id AS id,article.title AS title,FROM_UNIXTIME(article.addTime,'%Y-%m-%d') AS addTime,FROM_UNIXTIME(article.updateTime ,'%Y-%m-%d') AS updateTime,article.viewCount,article.articleContent as content,article.introduce as introduce,article.typeId AS typeId,type.typeName AS typeName FROM article LEFT JOIN type ON article.typeId=type.id WHERE article.id=${id}`
            const results=await this.app.mysql.query(sql)
            this.ctx.body=results[0]
        }else{
            this.ctx.body={
                code:404,
                message:'id is required'
            }
        }
    }
}
module.exports=MainController