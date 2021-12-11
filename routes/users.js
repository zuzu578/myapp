let express = require('express');
let router = express.Router();
let userImple = require('../TestuserImple/userImple');

router.get('/',(req,res)=>{
  const fetchData = userImple.doSelect((result)=>{
    console.log(result);
  })

})

module.exports = router;
