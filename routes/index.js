var express = require('express');
var router = express.Router();

const mysqlConn = require('../properties/sqlProperties'); // mysql 설정 파일 module 화

const pageCalcul = require('../pageCalcul/pageCalcul'); // 페이징 계산 모듈
/* GET home page. */

router.get('/testApi', function(req, res, next) {
    let page ;
    let pageSize ;
    const pageInfo = req.query; // get parameters (queryString)
    try{
      
       page = parseInt(pageInfo.page); // nowPage 
       pageSize = parseInt(pageInfo.pageSize); // perPage (pageSize)

    }catch(error){
      
    }
    
    if(isNaN(page)){
      page = 1;
    }
    if(isNaN(pageSize)){
      pageSize = 10;
    }
    
    mysqlConn.conn().connect();
    mysqlConn.conn().query('select count(*) as count from temp',(error, data, fields) => {
      let start = 0 ;
      if (error) throw error; 
      if(page <= 0){
        page = 1;
      }else{
          start = (page -1) * pageSize;
      }
      if(page > Math.round(data[0].count) / pageSize){
          console.log('마지막 페이지입니다.');
            return null;
      }
      

      mysqlConn.conn().query(`SELECT * FROM temp LIMIT ${start}, ${pageSize}`,(error, data, fields) => {
        if (error) throw error;
        res.json(data)
        mysqlConn.conn().end();
      });

    });


  
});

router.get('/',(req,res)=>{
  res.render('index.html')
})


  

  




module.exports = router;
