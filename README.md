# myapp

# node js 로 간단한 crud 구현

# 1) node js + mysql pageNation 

- mysql 

select 
t1.user_seq
,t1.userName
,t2.seq_id
,t2.tempColumn
from temp t1
inner join (select seq_id , tempColumn from temp2) t2 on t1.user_seq  = t2.seq_id
limit 0 , 10
mysql 에서는 limit 으로 paging 처리를 할수있다.


클라이언트가 페이지네이션 하고자하는 페이지 넘버를 받는다.
<img width="901" alt="스크린샷 2021-12-01 오후 5 24 38" src="https://user-images.githubusercontent.com/69393030/144198280-ac116f73-be31-4f40-a100-4b87721ed36c.png">

그런다음 , 게시물의 총갯수 를 구한다. , 갯수를 구하면 , 사용자가 요청한 페이지 넘버와 , 게시물 총 카운트를 paging() 에 매개변수로 전달한다. paging() 은 페이징 처리 계산 하는 함수 모듈이다.


<img width="901" alt="스크린샷 2021-12-01 오후 5 23 40" src="https://user-images.githubusercontent.com/69393030/144198153-6294d756-78cc-4dbc-a0f4-0b178ed3a0b6.png">
해당 모듈 (paging() ) 에서 계산한뒤 페이징 관련 변수를 return 한다 , 
let { startPage, endPage, hidePost, maxPost, totalPage, currentPage } = pagingCalcul.paging(page, data[0].count); 
startPage , endPage , hidePost , maxPost , totalPage , currentPage 를 클라이언트에 object 로 만들어서 return 해준다.

<img width="901" alt="스크린샷 2021-12-01 오후 5 27 29" src="https://user-images.githubusercontent.com/69393030/144198713-28b94af3-d28d-42aa-a670-ef0e0b65e2dc.png">
클라이언트는 해당 object를 받아 렌더링처리를한다.
# 페이징 결과 
<img width="891" alt="스크린샷 2021-12-01 오후 5 27 50" src="https://user-images.githubusercontent.com/69393030/144198781-f89d8f82-029c-4689-b4de-25fef903a8be.png">


# node js file download / file upload 
- file download module 화 , callback function 활용 
- 하나의 function 에서 하나의 기능을 하도록 구현 
기존 소스 => 하나의 함수에서 파일 존재 여부 체크 , 파일 다운로드를 동시에 진행 
개선 소스 => 파일 다운로드 함수에서는 다운로드만 실시 , 파일 존재 여부 체크 함수를 모듈화 하여 callback() 하도록 구현 

<img width="631" alt="스크린샷 2021-12-04 오후 1 10 43" src="https://user-images.githubusercontent.com/69393030/144696430-edb106ca-fa77-4301-be44-e11c8a34e4fd.png">
- 파일 다운로드 기능만 이행하는 함수

<img width="631" alt="스크린샷 2021-12-04 오후 1 11 07" src="https://user-images.githubusercontent.com/69393030/144696437-902b67f8-9561-49b4-9b6c-1f4700c82a38.png">
- 파일 존재 여부 체크 기능만 하는 함수 모듈 


# callback , promise(async , await) , prmoise channing

``` javascript

/**
 * async await promise 
 */
const fetchData = () =>{
  return new Promise((resolve, reject)=>{
    resolve(20);
  })
}
const renderData = async() =>{
  let render = await fetchData();
  console.log(render);
}

renderData();

/**
 * promise chainning 
 */
const fetchData2 = (promise)=>{
  return new Promise((resolve , reject)=>{
    resolve(20);
  })
}

fetchData2()
.then((res)=>{
  console.log(res);
  return res + 1;
})
.then((res) =>{
  console.log(res);
  return res + 1; 
})
/**
 * callback function
 */
const callbackReturn = (callback) =>{

    return callback(20);
}

callbackReturn(function(result){
  console.log(result);
})

```
# sql 에서 fk 로 제약조건 걸고 설계 / fk 안걸고 그냥 pk 로 조인해서 설계 
``` sql

-- 포린키 제약조건 걸때 
create table test_user(
	user_seq int auto_increment not null primary key,
	user_name varchar(200),
	user_address varchar(200)
)


CREATE TABLE  test_user_content(
   user_seq int NOT NULL,
  board_seq int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (user_seq,board_seq),
  constraint user_content_fk
        foreign key (user_seq) references test_user (user_seq),
        board_content varchar(2000)
        
) ENGINE=MyISAM;


-- 포린키 제약조건 안걸고 , 일반적으로 pk 를 이용하려고 할때 설계 

create table test_1(
	user_seq int auto_increment not null primary key,
	user_name varchar(200),
	user_address varchar(200)

)

create table test_2(
	user_seq int , board_seq int,primary key(user_seq,board_seq), 
	 board_content varchar(2000)
	
)

```
위 코드 와 아래코드 특징은 , 특정한 pk 컬럼이 다른 테이블에서 참조하여 사용하고있는 외래키(foreign key ) 라는 점이지만 ,
constraint 제약을 걸어서 명시적으로 fk 를 선언한것과 안한것의 차이는 크다.
constraint 제약을 걸어서 fk 를 선언하게되면 ,삭제 , 수정 에 영향을끼친다. 반면 그렇지 않은경우는 영향을 끼치지 않는다.
constraint 제약을 걸어서 fk 를 선언하면 더 안전하게 , 데이터의 무결성 을 보장하게 된다.

