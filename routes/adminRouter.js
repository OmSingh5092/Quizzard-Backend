const express = require('express');
const router = express.Router();

const adminCtrl = require('../controllers/adminCtrl')
const verifyUser = require('../middlewares/verifyMW').user;

router.get('/get',verifyUser,adminCtrl.getProfile);
router.post('/update',verifyUser,adminCtrl.updateProfile);

module.exports = router;