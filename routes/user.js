const express = require('express');
const {signup,login} = require('../controller/user');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);

module.exports = router;