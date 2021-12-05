const bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();

const jwt = require("jsonwebtoken");


/**
 * 로그인 페이지로 이동합니다.
 */
router.get('/login', function(req, res, next) {
 
  res.render('login.html');
});
/**
 * login api 
 */
router.post('/doLogin',(req,res)=>{
    let id = req.body.id;
    let password = req.body.password;

    let token = jwt.sign({
        
    },
    "secretKey",
    {
        subject:"PangYeon jwtToken",
        expiresIn : '60m',
        issuer : "pangyeon"
    });

    console.log('토큰생성 ' , token);

   

})





module.exports = router;
