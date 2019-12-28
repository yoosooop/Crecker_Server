var express = require("express");
var router = express.Router();

var moment = require('moment')

const defaultRes = require("../../../module/utils/utils");
const statusCode = require("../../../module/utils/statusCode");
const resMessage = require("../../../module/utils/responseMessage");
const db = require("../../../module/pool");
/*   
    idx
    제목
    내용(string)
    private(0,1)
    createAt
*/
/* GET home page. */

// router.get("/", function(req, res, next) {
//   res.send("respond with a resource");
// });

router.get("/question/:flag", async (req, res) => {
    let selectLawQuery;
    if(req.params.flag == 0) { //답변순
        selectLawQuery = 'SELECT * FROM Law ORDER BY answerTime DESC';
    }
    else if (req.params.flag == 1) { //등록순 
        selectLawQuery = 'SELECT * FROM Law ORDER BY createAt DESC';
    }
    else if(req.params.flag == 2) { //조회순 
        selectLawQuery = 'SELECT * FROM Law ORDER BY views DESC';
    }

    const selectLawResult = await db.queryParam_None(selectLawQuery)

    console.log(selectLawResult)

    if (!selectLawResult)
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, "DB 오류 입니다"));    // 작품 삭제 성공
    else
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "법류 문의 조회 성공", selectLawResult));    // 작품 삭제 성공
    
    

});
router.post("/question", async (req, res) => {
    const insertLawQuery = 'INSERT INTO Law (title, contents, privateYN, answerYN, views ,createAt) VALUES (?,?,?,?,?,?)';
    const insertLawResult = await db.queryParam_Arr(insertLawQuery, [req.body.title, req.body.contents, req.body.privateYN, 0 , 0,moment().format('YYYY-MM-DD HH:mm:ss') ])

    if (!insertLawResult)
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, "DB 오류 입니다"));    // 작품 삭제 성공
    else
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "법류 문의 입력 성공"));    // 작품 삭제 성공
    
    

});
// INSERT, UPDATE, DELETE 가 한 라우트에 2개 이상이면 트랜젝션으로 묶는다.
// 답변 등록은 Postman으로 직접 등록
router.post("/answer", async (req, res) => {
    const insertLawQuery = 'INSERT INTO Law (title, contents, privateYN, createAt) VALUES (?,?,?,?)';
    const insertLawResult = await db.queryParam_Arr(insertLawQuery, [req.body.title, req.body.contents, req.body.privateYN, moment().format('YYYY-MM-DD HH:mm:ss') ])

    res.status(200).send(defaultRes.successTrue(statusCode.OK, "법류 문의 입력 성공"));    // 작품 삭제 성공

});

module.exports = router;
//localhost:3000/
