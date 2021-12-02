const mysqlConn = require('../properties/sqlProperties'); // mysql 설정 파일 module 화

module.exports = {
    dataResult : {},
    doPosting : function(userName,tempColumn){
        
        let status = '';
        //console.log('userName,tempColumn =>'+userName,tempColumn);
        console.log('글작성로직 실행...');
        try{
            mysqlConn.conn().connect();
            mysqlConn.conn().query(`insert into temp(userName) values('${userName}')`, (error, data, fields) => {
                if (error) throw error;
                //console.log(data);
            })
            mysqlConn.conn().query(`insert into temp2(tempColumn) values('${tempColumn}')`, (error, data, fields) => {
                if (error) throw error;
                //console.log(data);
            })
            mysqlConn.conn().end();
            status = 'success';
            return {status};

        }catch(error){
            console.log('error ! =>' , error);
            status = 'fail';
            return {status};

        }
    },
    delete:function(board_seq){
        
        let status = '';
        console.log('글 삭제 로직 실행 ...');
        try{
            mysqlConn.conn().connect();
            //delete from temp where user_seq = 35;
            //delete from temp2 where seq_id = 35;
            mysqlConn.conn().query(`delete from temp where user_seq = ${board_seq}`, (error, data, fields) => {
                if (error) throw error;
                //console.log(data);
            })
            mysqlConn.conn().query(`delete from temp2 where seq_id = ${board_seq}`, (error, data, fields) => {
                if (error) throw error;
                //console.log(data);
            })
            
            status = 'success';
            return {status};
        }catch(error){
            console.log(error);
            status = 'fail';
            return {status};
        }

    },

   
    viewData:function(getIdx ,callback){
        console.log('글 보여주기 ( update ) 로직 실행 ...');
    
        try{
            mysqlConn.conn().connect();
            mysqlConn.conn().query(`select 
                t1.user_seq
                ,t1.userName
                ,t2.seq_id
                ,t2.tempColumn
                from temp t1
                left join (select seq_id , tempColumn from temp2) t2 on t1.user_seq  = t2.seq_id
                where t1.user_seq  = ${getIdx}`, (error, data, fields) => {
                if (error) throw error;

                return callback(data);   
            })

        }catch(error){
            console.log('error =>' , error);
        }
    },
    doUpdate : function(hashParams , callback){
        console.log('글 수정하기 로직 실행 ...');
       // 문자열 (varchar)일 경우 '' 사용 
        
        let status = '';
        try{
            mysqlConn.conn().connect();
            // temp table update 
            mysqlConn.conn().query(`
            UPDATE temp
            SET userName = '${hashParams.userName}'
            WHERE user_seq = ${hashParams.board_seq}`
            ,(error, data, fields) => {
                if (error) throw error;
  
            })
            // temp2 table update 
            mysqlConn.conn().query(`
            UPDATE temp2
            SET tempColumn = '${hashParams.tempColumn}'
            WHERE seq_id = ${hashParams.board_seq} 
            `, (error, data, fields) => {
                if (error) throw error;
  
            })

            status = 'success';

        }catch(error){
            console.log('error =>' , error);
            status = 'fail';
        }

        return {status}
    }
}