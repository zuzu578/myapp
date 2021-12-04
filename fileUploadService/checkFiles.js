
module.exports = {
    

    checkFiles: function (filePath,fs,callback) {
        let existStatus;
        const status = fs.existsSync(filePath);
        
        if(status === true){
            existStatus = status;
        }else{
            existStatus = status;
        }
    
        return callback(existStatus);
    },
  
  };
