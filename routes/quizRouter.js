const express = require('express');
const router = express.Router();

const quizCtrl = require('../controllers/quizCtrl')
const verifyUser = require('../middlewares/verifyMW').user;

router.get('/get/faculty',verifyUser,quizCtrl.getQuizByFaculty);
router.get('/get/subject',verifyUser,quizCtrl.getQuizBySubject);
router.get('/get/student',verifyUser,quizCtrl.getQuizByStudent);
router.get('/get',verifyUser,quizCtrl.getQuiz);
router.post('/create',verifyUser,quizCtrl.createQuiz);
router.post('/update',verifyUser,quizCtrl.updateQuiz);
router.delete('/delete',verifyUser,quizCtrl.deleteQuiz);

module.exports = router;