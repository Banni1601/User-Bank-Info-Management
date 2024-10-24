const express = require('express');
const { getAllUsersBankInfo, searchBankAccounts } = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const router = express.Router();

router.get('/all', getAllUsersBankInfo); // Get all users' bank info
router.get('/search', authMiddleware, adminMiddleware, searchBankAccounts); // Search bank accounts

module.exports = router;

//authMiddleware, adminMiddleware,