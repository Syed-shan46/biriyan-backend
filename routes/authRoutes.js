const express = require('express');
const { createUser, editUser, checkUser } = require('../controllers/authController');
const router = express.Router();

// POST request to create a user
router.post('/createUser', createUser);

router.put('/editUser', editUser);

router.post('/checkUser', checkUser);

module.exports = router;
