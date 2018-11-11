function suc(data) {
    return{
        code:200,
        data:data,
        msg:'success'
    }
}
function err(data='内部错误') {
    return{
        code:500,
        msg:data
    }
}

module.exports={
    suc,
    err
}
