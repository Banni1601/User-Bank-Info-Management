const express = require('express');
const { registerUser, loginUser, allusersdata, working } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/allusersdata', allusersdata)
router.get('/', working)
module.exports = router;
