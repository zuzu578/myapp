
module.exports = {
    paging : function (page, totalPost){
       // console.log('페이징 계산 로직 실행..');
        const maxPost = 10; // (1)
        const maxPage = 10; // (2)
        let currentPage = page ? parseInt(page) : 1; // (3)
        const hidePost = page === 1 ? 0 : (page - 1) * maxPost; // (4)
        const totalPage = Math.ceil(totalPost / maxPost); // (5)
        
        if (currentPage > totalPage) { // (6)
          currentPage = totalPage;
        }
      
        const startPage = Math.floor(((currentPage - 1) / maxPage)) * maxPage + 1; // (7)
        let endPage = startPage + maxPage - 1; // (8)
      
        if (endPage > totalPage) { // (9)
          endPage = totalPage;
        }
       //console.log(startPage, endPage, hidePost, maxPost, totalPage, currentPage);
      
        return { startPage, endPage, hidePost, maxPost, totalPage, currentPage } // (10)
      }
}
   
    

    
    



  

 