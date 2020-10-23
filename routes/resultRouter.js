const express = require('express');
const router = express.Router();

const resultCtrl = require('../controllers/resultCtrl');
const verifyUser = require('../middlewares/verifyMW').user;

router.post('/create',verifyUser,resultCtrl.createResult);
router.get('/get/subject',verifyUser,resultCtrl.getResultOfSubject);

module.exports = router;