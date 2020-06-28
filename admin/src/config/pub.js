export default{
    callApi
}
function callApi(){
    const baseUrl="http://127.0.0.1:7001/admin/"
    return {
        checkLogin:`${baseUrl}login`,//登录
        getTypeInfo:`${baseUrl}getTypeInfo`,//获取文章分类列表
        addArticle:`${baseUrl}addArticle`,//添加文章
        updateArticle:`${baseUrl}updateArticle`,//修改文章
        getArticleList:`${baseUrl}getArticleList`,//文章列表
    }
}

