const express = require('express');
const router = express.Router();

const studentCtrl = require('../controllers/studentCtrl')
const verifyUser = require('../middlewares/verifyMW').user;

router.get('/get',verifyUser,studentCtrl.getProfile);
router.get('/get/all',verifyUser,studentCtrl.getAllStudents);
router.post('/update',verifyUser,studentCtrl.updateProfile);

module.exports = router;