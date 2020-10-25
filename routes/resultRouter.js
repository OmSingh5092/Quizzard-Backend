const express = require('express');
const router = express.Router();

const resultCtrl = require('../controllers/resultCtrl');
const verifyUser = require('../middlewares/verifyMW').user;

router.post('/create',verifyUser,resultCtrl.createResult);
router.post('/update',verifyUser,resultCtrl.updateResult);
router.get('/get/subject',verifyUser,resultCtrl.getResultOfSubject);
router.get('/get/student/quiz',verifyUser,resultCtrl.getResultByQuizandStudent);    

module.exports = router;