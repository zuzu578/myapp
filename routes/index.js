var express = require('express');
var router = express.Router();
//import {paging} from '../pageCalcul/pageCalcul';
const mysqlConn = require('../properties/sqlProperties'); // mysql 설정 파일 module 화
//const paging = await require('ts-node').importESM('./specifier-of-esm-module', module);
//const paging = require('../pageCalcul/pageCalcul'); // 페이징 계산 모듈
//const { default: paging } = require('../pageCalcul/pageCalcul');
const pagingCalcul = require('../pageCalcul/pageCalcul');

/**
 * 게시물을 가져옵니다.
 */
router.get('/fetchList', function (req, res, next) {
  let page;
  let pageSize;
  const pageInfo = req.query; // get parameters (queryString)
  try {

    page = parseInt(pageInfo.page); // nowPage 
    pageSize = parseInt(pageInfo.pageSize); // perPage (pageSize)

  } catch (error) {

  }

  if (isNaN(page)) {
    page = 1;
  }
  if (isNaN(pageSize)) {
    pageSize = 10;
  }

  mysqlConn.conn().connect();
  mysqlConn.conn().query('select count(*) as count from temp', (error, data, fields) => {
    // pageNation Bar rendering 시 필요한 변수 값 받아오기 
    let { startPage, endPage, hidePost, maxPost, totalPage, currentPage } = pagingCalcul.paging(page, data[0].count);
    let fetchDataListObj = {};
    let start = 0;
    if (error) throw error;
    if (page <= 0) {
      page = 1;
    } else {
      start = (page - 1) * pageSize;
    }
    if (page > Math.round(data[0].count) / pageSize) {
      console.log('마지막 페이지입니다.');
      return null;
    }


    mysqlConn.conn().query(
    ` 
    select 
    t1.user_seq
    ,t1.userName
    ,t2.seq_id
    ,t2.tempColumn
    from temp t1
    inner join (select seq_id , tempColumn from temp2) t2 on t1.user_seq  = t2.seq_id LIMIT ${start}, ${pageSize}`
    , (error, data, fields) => {
      if (error) throw error;
      console.log('fetch data by sql =>', data);
      fetchDataListObj = {
        'data': data,
        'startPage': startPage,
        'endPage': endPage,
        'hidePost': hidePost,
        'maxPost': maxPost,
        'totalPage': totalPage,
        'currentPage': currentPage,
      }
      mysqlConn.conn().end();
      //res.json(fetchDataListObj) json return 
      res.render('test.html', { 'fetchDataListObj': fetchDataListObj });

    });


  });



});

router.get('/linkToPost', (req, res) => {
  res.render('posting.html')
})









module.exports = router;
