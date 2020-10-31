const express = require('express');
const router = express.Router();

const chatCtrl = require('../controllers/chatCtrl')
const verifyUser = require('../middlewares/verifyMW').user;

router.get('/get/all',verifyUser,chatCtrl.getAllChats);

module.exports = router;