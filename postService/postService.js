var express = require('express');
var router = express.Router();

const posting = require('./postServiceImpl');

/**
 * 글 작성 페이지로 이동합니다. 
 */
router.get('/linkToPost', (req, res) => {
    res.render('posting.html')
  })
/**
 * 글 작성하는 api 
 */
router.post('/doPosting',(req,res)=>{
    // parameters (post method 에서 parameter 받는법)
    let userName = req.body.userName;
    let tempColumn = req.body.tempColumn;
   // console.log('test! ',userName,tempColumn);
   // 글을 작성합니다. 
    let {status} =  posting.doPosting(userName,tempColumn);

    console.log('transcation result => ', status);
    if(status == 'success'){
        res.redirect('/fetchList'); 
    }else{
        res.json(status);
    }
})
/**
 * 글 업데이터 페이지로 이동합니다. (글 상세보기 페이지 / 업데이트 페이지 역할 수행 )
 */
router.get('/linkToUpdate',(req,res)=>{
    var data;
    let getIdx = req.param('board_idx');
   // node js callback
   // https://stackoverflow.com/questions/31875621/how-to-properly-return-a-result-from-mysql-with-node
    var stuff_i_want = {};

    posting.viewData(getIdx, function(result){
    for(let i = 0 ; i < result.length ; i++){
        stuff_i_want = result[i];
    }
    res.render('update.html',{stuff_i_want});
    });
})
/**
 * update api 
 */
router.post('/doUpdate',(req,res)=>{
  let hashParams = {};
  // 업데이트할 데이터의 인덱스 값을 받아온다. 
  let board_seq = req.body.board_seq;
  // 업데이트할 내용을 받아온다.
  let userName = req.body.userName;
  let tempColumn = req.body.tempColumn;
  // params 
  hashParams = {
      'board_seq' : board_seq,
      'userName' : userName,
      'tempColumn' : tempColumn,
  }
  // 업데이트처리하기.
 let {status} =  posting.doUpdate(hashParams)

 if(status === 'success'){

    res.json(status);
 }else{
     console.log('transcation fail..');
     res.json(status);
  

 }
    
  



})
/**
 * delete api 
 * http://localhost:3000/postRouter/doDelete
 */

router.delete('/doDelete',(req,res)=>{
    let board_seq = req.param('board_seq');
    console.log('board_seq=>',board_seq);
    // 게시물을 삭제합니다. 
    let {status} =  posting.delete(board_seq);

    if(status === true){
        res.json(status);
    }else{
        res.json(status);
    }
})


  module.exports = router;