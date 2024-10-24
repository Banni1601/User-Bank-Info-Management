const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const JWT_SECRET="150fa542596e34cee77531a144c2ddb4119129b9b0d2d7d161b6a24bceaec3bd88c090088135a98182312de023433080fa79f972c168242af961a2532bdcb3bb150fa542596e34cee77531a144c2ddb4119129b9b0d2d7d161b6a24bceaec3bd88c090088135a98182312de023433080fa79f972c168242af961a2532bdcb3bb"

exports.registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user = new User({
    username,
    email,
    password: hashedPassword,
    role: role || 'user',
  });

  await user.save();

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
  res.status(201).json({ token, user });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, user });
};



exports.allusersdata = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};



exports.working = async (req, res) => {
  try {
   
    res.json({ message: "your Backend is working" });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
