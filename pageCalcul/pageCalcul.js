
//const user = require('../userDao/userDao'); // userSelect Dao 
const mysqlConn = require('../properties/sqlProperties'); // mysql 설정 파일 module 화



   

  function totalCount(page,pageSize){

        let start = 0;
        let pageCount = [];
        mysqlConn.conn().connect();
        mysqlConn.conn().query('select count(*) as count from temp',(error, data, fields) => {
            console.log('데이터 총 카운트 ! ->',data);
        if (error) throw error; 
        //mysqlConn.conn().end();
        /*
        pageCount.push(data[0].count);

        if(page <= 0){
            page = 1;
        }else{
            start = (page -1) * pageSize;
        }
        const cnt = data[0].count;
        if(page > Math.round(cnt) / pageSize){
            return null;
        }
        
        //console.log('start / pageSize =>' , start , pageSize);
        //tempVar.push(start);
        //tempVar.push(pageSize);
        //console.log('this.tempVar =>' , this.tempVar);

        console.log('start!! =>' , start, pageSize);
        obj = {
            'start' : start,
            'end' : pageSize,
        } 
        console.log('object ===>' , obj);
        return obj;


       
        */

        });
        
       
     
    }



module.exports = {
    totalCount : totalCount
  
  };