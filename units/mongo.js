const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb://localhost:27017/runoob";
const url = "mongodb://47.105.168.32:27017/runoob";
const DBNAME='book'

function insert(collection,data) {
    return new Promise(resolve => {
        try{
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbase = db.db(DBNAME);
                if(data.length==0){
                    resolve('suc')
                    return
                }
                dbase.collection(collection).insertMany(data, function(err, res) {
                    if (err) throw err;
                    resolve('suc')
                    db.close();
                });
            });
        }catch (e) {
            resolve('err')
        }
    })
}


function search(collection,data,sort) {
    return new Promise(resolve => {
        try{
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbase = db.db(DBNAME);
                dbase.collection(collection).find(data).sort(sort?sort:{}).toArray(function(err, result) { // 返回集合中所有数据
                    if (err) throw err;
                    resolve(result)
                    db.close();
                });
            });
        }catch (e) {
            resolve([])
        }
    })
}

//章节目录列表分页（暂时保留）
function searchPage(collection,data) {
    return new Promise(resolve => {
        try{
            let pagenum=data.pagenum?Number(data.pagenum):1
            let pagesize=data.pagesize?Number(data.pagesize):10
            delete data.pagenum
            delete data.pagesize
            data.num={
                $gte: (pagenum-1)*pagesize+1,
                $lte: pagenum*pagesize
            }

            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbase = db.db(DBNAME);
                dbase.collection(collection).find(data).sort({num:1}).toArray(function(err, result) { // 返回集合中所有数据
                    if (err) throw err;
                    resolve(result)
                    db.close();
                });
            });
        }catch (e) {
            resolve([])
        }
    })
}


//分页查询
function searchPaging(collection,data) {
    return new Promise(resolve => {
        try{
            let pagenum=data.pagenum?Number(data.pagenum):1
            let pagesize=data.pagesize?Number(data.pagesize):10
            let type=data.type?data.type:''


            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbase = db.db(DBNAME);
                dbase.collection(collection).find({type}).skip((pagenum-1)*pagesize).limit(pagesize).toArray(function(err, result) { // 返回集合中所有数据
                    if (err) throw err;
                    resolve(result)
                    db.close();
                });
            });
        }catch (e) {
            resolve([])
        }
    })
}



function updata(collection,whereStr,update) {
    return new Promise(resolve => {
        try{
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db(DBNAME);
                var updateStr = {$set: update};
                dbo.collection(collection).updateOne(whereStr, updateStr, function(err, res) {
                    resolve('suc')
                    db.close();
                });
            });
        }catch (e) {
            resolve('err')
        }
    })
}


function updataMany(collection,whereStr,update) {
    return new Promise(resolve => {
        try{
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db(DBNAME);
                var updateStr = {$set: update};
                dbo.collection(collection).updateMany(whereStr, updateStr, function(err, res) {
                    resolve('suc')
                    db.close();
                });
            });
        }catch (e) {
            resolve('err')
        }
    })
}

function deleteData(collection,whereStr){
    return new Promise(resolve => {
        try{
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db(DBNAME);
                dbo.collection(collection).deleteOne(whereStr, function(err, obj) {
                    if (err) throw err;
                    resolve('suc')
                    db.close();
                });
            });
        }catch (e) {
            resolve('err')
        }
    })

}




module.exports={
    insert:insert,
    search:search,
    updata:updata,
    updataMany:updataMany,
    deleteData:deleteData,
    searchPage:searchPage,
    searchPaging:searchPaging,
}
