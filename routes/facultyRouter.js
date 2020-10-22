const express = require('express');
const router = express.Router();

const facultyCtrl = require('../controllers/facultyCtrl')
const verifyUser = require('../middlewares/verifyMW').user;

router.get('/get',verifyUser,facultyCtrl.getProfile);
router.post('/update',verifyUser,facultyCtrl.updateProfile);
router.post('/subject/add',verifyUser,facultyCtrl.addSubject);
router.delete('/subject/remove',verifyUser,facultyCtrl.removeSubject);

module.exports = router;