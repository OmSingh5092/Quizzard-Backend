const express = require('express');
const router = express.Router();

const adminCtrl = require('../controllers/adminCtrl');
const verifyUser = require('../middlewares/verifyMW').user;

router.get('/get',verifyUser,adminCtrl.getProfile);
router.get('/get/students',verifyUser,adminCtrl.getStudents);
router.get('/get/faculties',verifyUser,adminCtrl.getFaculties);
router.post('/register/student',verifyUser,adminCtrl.registerStudent);
router.post('/register/faculty',verifyUser,adminCtrl.registerFaculty);
router.post('/update',verifyUser,adminCtrl.updateProfile);
router.post('/create',adminCtrl.createAdmin);

module.exports = router;