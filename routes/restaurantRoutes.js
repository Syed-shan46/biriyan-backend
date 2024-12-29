const express = require('express');
const { getRestaurant, updateRestaurant } = require('../controllers/restaurantController');
const router = express.Router();

router.get('/api/status', getRestaurant);

router.patch('/api/status', updateRestaurant);

module.exports = router;