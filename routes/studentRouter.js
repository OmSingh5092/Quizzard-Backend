const express = require('express');
const router = express.Router();

const studentCtrl = require('../controllers/studentCtrl')
const verifyUser = require('../middlewares/verifyMW').user;

router.get('/get',verifyUser,studentCtrl.getProfile);
router.post('/update',verifyUser,studentCtrl.updateProfile);
router.post('/subject/add',verifyUser,studentCtrl.addSubject);
router.delete('/subject/remove',verifyUser,studentCtrl.removeSubject);

module.exports = router;