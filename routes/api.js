let URL='http://www.530p.com/'
const express = require('express');
const router = express.Router();
const db = require('../units/mongo');
const data =require('../units/data');
const request =require('../units/request')
const iconv = require('iconv-lite');
const cheerio = require('cheerio');

//获取首页推荐模块
router.use('/getindexlist',async (req,res) =>{
    let bookList =await db.search('indexdata',{})
    res.json(data.suc(bookList));
});


//获取首页推荐模块
router.use('/getsearch',async (req,res) =>{
    let param = req.query || req.params;
    let query={}
    if(param.str){
        let reg=new RegExp(param.str)
        query={
            $or:[
                {bookname:{$regex:reg}},
                {bookauther:{$regex:reg}},
                {desc:{$regex:reg}},
            ]
        }
        let bookList =await db.search('bookname',query)
        res.json(data.suc(bookList));
    }else {
        res.json(data.suc([]));
    }
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
    if(param.id){
        query.chapterid=param.id
        let lastNum=[];
        let nextNum=[];
        let thisNum=[];
        thisNum=await db.search('chapternum',{chapterid:param.id})
        lastNum=await db.search('chapternum',{bookid:thisNum[0]['bookid'],num:parseInt(thisNum[0]['num'])-1})
        nextNum=await db.search('chapternum',{bookid:thisNum[0]['bookid'],num:parseInt(thisNum[0]['num'])+1})
        let book=thisNum[0]
        let url=`${URL}test/${book.bookid}/${book.chapterid}.htm`

        request(url).then( function ({errBody,resBody,body}) {
            body = iconv.decode(body,'gbk');
            let $ = cheerio.load(body);
            let table=$('#cp_content')
            let txt=table.text().replace(/　/g, "\n").toString();
            res.json(data.suc({
                book:{
                    booktxt:txt,
                    bookid:book.bookid,
                    chapterid:book.chapterid
                },
                lastNum:lastNum[0],
                nextNum:nextNum[0],
                thisNum:thisNum[0],
            }));
        })
    }else {
        res.json(data.err('错误'));
    }
});


module.exports = router;
