module.exports = {
    conn: function () {
        const mysql      = require('mysql');
        const connection = mysql.createConnection({
          host     : 'localhost',
          user     : 'root',
          password : '123qwe',
          database : 'sys' // db scheme
        });

      return connection;
    },
    
  };