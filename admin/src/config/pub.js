

export default{
    callApi
}
function callApi(){
    const baseUrl="http://127.0.0.1:7001/admin/"
    return {
        checkLogin:`${baseUrl}login`,//登录
    }
}
