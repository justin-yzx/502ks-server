const express = require('express');
const router = express.Router();
const db = require('../units/mongo');
const data =require('../units/data');

//获取书籍列表
router.use('/getbooklist',async (req,res) =>{
    let param = req.query || req.params;
    let query={}
    if(param.type){
        query.type=param.type
    }
    let bookList =await db.search('bookname',query)
    res.json(data.suc(bookList));
});

//获取书籍详情
router.use('/getbookinfo',async (req,res) =>{
    let param = req.query || req.params;
    let query={}
    query.bookid=param.id
    let bookList =await db.search('bookname',query)
    res.json(data.suc(bookList));
});

//获取章节列表
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

//获取章节内容
router.use('/getcontent',async (req,res) =>{
    let param = req.query || req.params;
    let query={}
    if(param.id&&param.num){
        query.chapterid=param.id
        let content =await db.search('chaptercontent',query)

        let lastNum=[];
        let nextNum=[];
        let thisNum=[];
        if(content[0]){
            thisNum=await db.search('chapternum',{bookid:content[0]['bookid'],num:parseInt(param.num)})
            lastNum=await db.search('chapternum',{bookid:content[0]['bookid'],num:parseInt(param.num)-1})
            nextNum=await db.search('chapternum',{bookid:content[0]['bookid'],num:parseInt(param.num)+1})
        }
        res.json(data.suc({
            book:content[0]?content[0]:{},
            lastNum:lastNum[0],
            nextNum:nextNum[0],
            thisNum:thisNum[0],
        }));
    }else {
        res.json(data.err('错误'));
    }
});


module.exports = router;
