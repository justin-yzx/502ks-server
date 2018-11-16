const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/runoob";
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


function search(collection,data) {
    return new Promise(resolve => {
        try{
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbase = db.db(DBNAME);
                dbase.collection(collection). find(data).toArray(function(err, result) { // 返回集合中所有数据
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

function searchPage(collection,data) {
    return new Promise(resolve => {
        try{
            let pagenum=data.pagenum?Number(data.pagenum):1
            let pagesize=data.pagesize?Number(data.pagesize):10
            delete data.pagenum
            delete data.pagesize

            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbase = db.db(DBNAME);
                dbase.collection(collection). find(data).skip((pagenum-1)*pagesize).limit(pagesize).toArray(function(err, result) { // 返回集合中所有数据
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
}
