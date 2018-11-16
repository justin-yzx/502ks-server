const express = require('express');
const router = express.Router();
const db = require('../units/mongo');
const data =require('../units/data');


router.use('/getbooklist',async (req,res) =>{
    let param = req.query || req.params;
    let query={}
    if(param.type){
        query.type=param.type
    }
    let bookList =await db.search('bookname',query)
    res.json(data.suc(bookList));
});

router.use('/getchapterlist',async (req,res) =>{
    let param = req.query || req.params;
    let query={}
    if(param.id){
        query.bookid=param.id
        query.pagenum=param.pagenum
        query.pagesize=param.pagesize
        let chapterList =await db.searchPage('chapternum',query)
        res.json(data.suc(chapterList));
    }else {
        res.json(data.err('错误'));
    }
});

router.use('/getcontent',async (req,res) =>{
    let param = req.query || req.params;
    let query={}
    if(param.id){
        query.chapterid=param.id
        let chapterList =await db.search('chaptercontent',query)
        res.json(data.suc(chapterList));
    }else {
        res.json(data.err('错误'));
    }
});


module.exports = router;
