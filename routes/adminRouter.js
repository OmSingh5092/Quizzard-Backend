const express = require('express');
const router = express.Router();

const adminCtrl = require('../controllers/adminCtrl');
const verifyUser = require('../middlewares/verifyMW').user;

router.get('/get',verifyUser,adminCtrl.getProfile);
router.get('/get/students',verifyUser,adminCtrl.getStudents);
router.get('/get/faculties',verifyUser,adminCtrl.getFaculties);
router.get('/get/student',verifyUser,adminCtrl.getStudentById);
router.get('/get/faculty',verifyUser,adminCtrl.getFacultyById);
router.post('/add/student/subject',verifyUser,adminCtrl.addStudentSubject);
router.post('/add/faculty/subject',verifyUser,adminCtrl.addFacultySubject);
router.post('/remove/student/subject',verifyUser,adminCtrl.removeStudentSubject);
router.post('/remove/faculty/subject',verifyUser,adminCtrl.removeFacultySubject);
router.post('/register/student',verifyUser,adminCtrl.registerStudent);
router.post('/register/faculty',verifyUser,adminCtrl.registerFaculty);
router.post('/delete/student',verifyUser,adminCtrl.removeStudent);
router.post('/delete/faculty',verifyUser,adminCtrl.removeFaculty);
router.post('/update',verifyUser,adminCtrl.updateProfile);
router.post('/create',adminCtrl.createAdmin);

module.exports = router;