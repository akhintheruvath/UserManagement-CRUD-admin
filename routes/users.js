const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');

router.get('/',controller.signinGet);
router.post('/',controller.signinPost);

router.get('/signup',controller.signupGet);
router.post('/signup',controller.signupPost);

router.get('/logout',controller.userLogout);

module.exports = router;