const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const multer = require("multer");
const StockContr = require('../controllers/stock.contr')
const issueStockContr = require('../controllers/issueStock.contr')
const fineContr = require ('../controllers/fine.contr')
const libContr = require('../controllers/lib.contr')
const stuContr = require('../controllers/students.contr')
const attContr = require('../controllers/attendance.contr')
//const cookieParser = require("cookie-parser");
//const session = require('express-session');
//const cenflix = require("../controllers/cenflixController");
//const {Authentication} = require("../middlewares/auth.js");



/*const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, "./public/images") },

})*/

const upload = multer({ dest: './assets/files' });
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());






router.post("/stock", StockContr.addStock);
router.get("/stock", StockContr.fetchall);
router.put("/stock", StockContr.updateStock);
router.delete("/stock", StockContr.deleteStock);


router.post("/stock/issue", issueStockContr.addIssueStock);
router.get("/stock/issue", issueStockContr.fetchall);
router.put("/stock/issue", issueStockContr.updateIssueStock);
router.patch("/stock/issue", issueStockContr.updateIssueStockStatus);
router.delete("/stock/issue", issueStockContr.deleteIssueStock);


router.post("/fine", fineContr.addFine);
router.get("/fine", fineContr.fetchall);
router.put("/fine", fineContr.updateFine);
router.patch("/fine", fineContr.updateFineStatus);
router.delete("/fine", fineContr.deleteFine);



router.post("/lib", libContr.issueBook);
router.get("/lib", libContr.fetchall);
router.put("/lib", libContr.updateIssuedBook);
router.patch("/lib", libContr.  updateIssuedBookStatus);
router.delete("/lib", libContr.deleteIssueBook);


router.get('/students', stuContr.fetchClass)
router.post('/students', stuContr.addStudent)
router.put('/students', stuContr.updateStudent)
router.delete('/students', stuContr.deleteStudent)
router.patch('/students', stuContr.promoteBatch)




router.get('/attendance', attContr.fetchAttendance)
router.post('/attendance', attContr.addAttendance)
router.delete('/attendance', attContr.deleteAttendance)
router.patch('/attendance', attContr.updateAttendance)






module.exports = router;