const express = require('express');
const router = express.Router();

const signInCtrl = require('../controllers/signInCtrl');

router.post('/faculty',signInCtrl.facultyGoogleSignIn);
router.post('/student',signInCtrl.studentGoogleSignIn);
router.post('/admin',signInCtrl.adminGoogleSignIn);


module.exports = router;