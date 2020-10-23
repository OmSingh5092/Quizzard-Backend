const express = require('express');
const router = express.Router();

const resultCtrl = require('../controllers/resultCtrl');
const verifyUser = require('../middlewares/verifyMW').user;

router.post('/create',verifyUser,resultCtrl.createResult);

module.exports = router;