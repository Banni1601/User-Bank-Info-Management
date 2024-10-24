const BankAccount = require('../models/BankAccount');

exports.addBankAccount = async (req, res) => {
  const { ifscCode, branchName, bankName, accountNumber, accountHolderName } = req.body;

  const bankAccount = new BankAccount({
    user: req.params.id,
    ifscCode,
    branchName,
    bankName,
    accountNumber,
    accountHolderName,
  });

  await bankAccount.save();
  res.status(201).json(bankAccount);
};

exports.getUserBankAccounts = async (req, res) => {
  try {
    const bankAccounts = await BankAccount.find({ user: req.params.id });
    if (!bankAccounts.length) {
      return res.status(404).json({ msg: 'No bank accounts found' });
    }
    res.status(200).json(bankAccounts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.editBankAccount = async (req, res) => {
  const { ifscCode, branchName, bankName, accountNumber, accountHolderName } = req.body;

  try {
    console.log(req.params.id);
    const bankAccount = await BankAccount.findById(req.params.id);

    if (!bankAccount) {
      return res.status(404).json({ msg: 'Bank account not found' });
    }

    //if (bankAccount.user.toString() !== req.user.id) {
      //return res.status(401).json({ msg: 'Not authorized' });
    //}

    bankAccount.ifscCode = ifscCode;
    bankAccount.branchName = branchName;
    bankAccount.bankName = bankName;
    bankAccount.accountNumber = accountNumber;
    bankAccount.accountHolderName = accountHolderName;

    await bankAccount.save();
    res.json(bankAccount);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteBankAccount = async (req, res) => {
  try {
    // Find the bank account by its ID
    const bankAccount = await BankAccount.findById(req.params.id);

    // Check if the bank account exists
    if (!bankAccount) {
      return res.status(404).json({ msg: 'Bank account not found' });
    }

    // Check if the user is authorized to delete this bank account
    //if (bankAccount.user.toString() !== req.user.id) {
      //return res.status(401).json({ msg: 'Not authorized' });
   // }

    // Use findByIdAndDelete to delete the bank account after authorization
    await BankAccount.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Bank account removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
