let express = require('express');
let router = express.Router();
let userImple = require('../TestuserImple/userImple');

router.get('/',(req,res)=>{
  const fetchData = userImple.doSelect((result)=>{
    console.log('fetchData  -->' , result);
  })
 

})

module.exports = router;
