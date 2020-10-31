const express = require('express');
const router = express.Router();

const subjectCtrl = require('../controllers/subjectCtrl');
const verifyUser = require('../middlewares/verifyMW').user;

router.get('/get',subjectCtrl.getSubject);
router.post('/create',verifyUser,subjectCtrl.addSubject);
router.delete('/delete',verifyUser,subjectCtrl.removeSubject);
router.get('/get/all',verifyUser,subjectCtrl.getAllSubjects);
router.get('/get/student',verifyUser,subjectCtrl.getSubjectsByStudent);

module.exports = router;