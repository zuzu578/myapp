
module.exports = {
    /**
     * 파일 존재 유무를 체크하는 모듈 
     * @param {*} filePath 
     * @param {*} fs 
     * @param {*} callback 
     * @returns 
     */
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
