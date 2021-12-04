var express = require('express');
var router = express.Router();
const fs = require('fs');
const fileDir = '/Users/helloworld/myapp/public/images/';
const existCheck = require('./checkFiles');
//multer module import 
let multer  = require('multer');
/**
 * file upload 시 multer 부가 설정 을통해 파일을 업로드 할수있습니다.
 * ex) 원본이름의 파일업로드 , 날짜 등을 파일 업로드시 이름에 부가적으로 설정하여 업로드 가능 
 */
 let storage  = multer.diskStorage({ // 2
    destination(req, file, cb) {
      cb(null, 'public/images/');
    },
    filename(req, file, cb) {
      cb(null, `${file.originalname}`);
    },
  });
  let uploadWithOriginalFilename = multer({ storage: storage }); 

/**
 * File upload page 이동합니다.
 * http://localhost:3000/uploadFiles/linkToFileUpload 
 */
router.get('/linkToFileUpload', function(req, res, next) {
  
  res.render('filePages/fileUploadPage.html');
});
/**
 * fileUpload api 
 */

 router.post('/uploadFile', uploadWithOriginalFilename.single('userFile'), function(req,res){ 
  
    res.send('파일이 저장되었습니다.');
});

/** 
 * fileDownload Api
 */
 router.get('/downloadFiles',(req,res)=>{

      let fileName = req.param('fileName');
      filePath = fileDir+fileName;
      existCheck.checkFiles(filePath,fs,function(status){
        if(status === true){
          console.log('file is ' + status);
          res.download(filePath);
        }else{
           res.send('파일이 존재하지않습니다.');
        }
    });  

  })

  /**
   * link to fileDownload page test
   */
  router.get('/fileDownloadPage',(req,res)=>{
  
    res.render('filePages/fileDownload.html');
  
  })

  


module.exports = router;
