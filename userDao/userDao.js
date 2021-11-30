const mysqlConn = require('../properties/sqlProperties'); // mysql 설정 파일 module 화

module.exports = {
    userCount : function(){
        mysqlConn.conn().connect();
        mysqlConn.conn().query('select count(*) from temp', 
        (error, data, fields) => {
        if (error) throw error;

        res.json(data)
        mysqlConn.conn().end();
        
        return data;
        });

        }
}