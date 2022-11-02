const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminController');
// const { route } = require('./users');

router.get('/',controller.loginGet);

router.post('/adminlogin',controller.loginPost);

router.get('/adminlogin/addUser',controller.addUserPage);
router.post('/adminlogin/addUser',controller.addUserPost);

router.get('/userEdit/:id',controller.updateUser);
router.post('/adminlogin/updateUser/:id',controller.updateUserPost);
router.post('/userDelete/:id',controller.deleteUserPost);

router.post('/userSearch',controller.search);

router.post('/adminLogout',controller.adminLogout);

module.exports = router;