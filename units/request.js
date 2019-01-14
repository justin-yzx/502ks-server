const request = require('request');
const ua = require('./ua')

function myRequest(URL) {
    return new Promise(resolve => {
        var Options = {
            method: 'GET',
            encoding: null,
            url:URL,
            timeout:100000,
            headers:{
                "User-Agent":ua()
            },
        };
        request(Options,function(err,res,body){
            if(err){
                console.log('请求成功');
                console.log(err);
                resolve({
                    err:err,
                    res:res,
                    body:''
                })
                return
            }
            resolve({
                err:err,
                res:res,
                body:body
            })
        });
    })
}

module.exports=myRequest
