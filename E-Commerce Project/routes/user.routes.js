const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/signup', userController.signup);
router.get('/signin', userController.signin);
router.get('/logout', userController.logout); 
router.get('/profile', authMiddleware.isAuthenicated ,userController.getProfile);

module.exports = router;