const express = require('express');

const placesControllers = require('../controllers/places-controller');

const router = express.Router();

router.get('/:pid', placesControllers.getPlaceById);

router.get('/users/:uid', placesControllers.getPlaceByUserId);

module.exports = router;
