const mysqlConn = require('../properties/sqlProperties'); // mysql 설정 파일 module 화

/**
 * @test
 * 
 */

module.exports = {
    doSelect: (callback) => {
        try{
            mysqlConn.conn().connect();
            mysqlConn.conn().query(`
            select
            t1.user_name,
            t1.user_address,
            t2.board_seq,
            t2.board_content
            from test_user t1 inner join test_user_content t2 on t1.user_seq =t2.user_seq `
            , (error, data, fields) => {
                    if (error) throw error;
                    return callback(data);
                 
                })
        }
        catch(error){
            console.log(error);
        }


       

        
    },
}