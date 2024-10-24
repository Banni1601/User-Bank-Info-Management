const BankAccount = require('../models/BankAccount');
const User = require('../models/User');

exports.getAllUsersBankInfo = async (req, res) => {
  try {
    const users = await User.find();
    const bankAccounts = await BankAccount.find().populate('user', 'username email');

    res.json({ users, bankAccounts });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.searchBankAccounts = async (req, res) => {
  const { name, bankName } = req.query;

  try {
    const query = {};
    if (name) {
      const user = await User.findOne({ username: name });
      if (user) {
        query.user = user._id;
      }
    }
    if (bankName) {
      query.bankName = bankName;
    }

    const bankAccounts = await BankAccount.find(query).populate('user', 'username email');
    res.json(bankAccounts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
