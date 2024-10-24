const express = require('express');
const {
  addBankAccount,
  getUserBankAccounts,
  editBankAccount,
  deleteBankAccount,
} = require('../controllers/bankAccountController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/addBankAccount/:id', addBankAccount); // Add a bank account
router.get('/specificUserBankAccounts/:id', getUserBankAccounts); // Get user's bank accounts
router.put('/:id', editBankAccount); // Edit a bank account
router.delete('/:id', deleteBankAccount); // Delete a bank account

module.exports = router;
//authMiddleware