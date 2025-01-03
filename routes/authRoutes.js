const express = require('express');
const { createUser, editUser, checkUser, addUsername, updateUsername, getUserByPhone, getUserById, checkUserName } = require('../controllers/authController');
const router = express.Router();

// POST request to create a user
router.post('/createUser', createUser);

router.put('/editUser', editUser);

router.post('/checkUser', checkUser);

router.patch('/updateUsername', updateUsername);

router.get("/user/:userId", getUserById);

router.get('/check-username', checkUserName);

module.exports = router;
