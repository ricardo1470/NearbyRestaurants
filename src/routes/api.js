const express = require('express');
const router = express.Router();

const { getRestaurants, getLocation } = require('../controllers/restaurants'); // import getRestaurants from restaurants.js

router.get('/Restaurants', getRestaurants); // get all restaurants from API
router.get('/Restaurants/location', getLocation); // get restaurants by location from API

module.exports = router; // export router to be used in app.js
