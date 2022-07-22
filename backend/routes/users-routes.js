const express = require('express');
const router = express.Router();

const usersControllers = require('../controllers/users-controllers');

router.get('/', usersControllers.getUsers);

router.post('/signup', usersControllers.signup);

router.post('/login', usersControllers.login);

module.exports = router;
