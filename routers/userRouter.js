const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/users', UserController.createUser);
router.get('/users/:userId', UserController.getUserDetails);
router.get('/users', UserController.getAllUsers);
router.put('/users/:userId', UserController.updateUserDetails);
router.delete('/users/:userId', UserController.deleteUser);

module.exports = router;