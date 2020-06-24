module.exports=options=>{
    return async function adminAuth(ctx,next){
        if(ctx.session.openId){
            await next()
        }else{
            ctx.body={
                code:401,
                message:'access is denied'
            }
        }
    }
}