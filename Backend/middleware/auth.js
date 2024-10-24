const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET="150fa542596e34cee77531a144c2ddb4119129b9b0d2d7d161b6a24bceaec3bd88c090088135a98182312de023433080fa79f972c168242af961a2532bdcb3bb150fa542596e34cee77531a144c2ddb4119129b9b0d2d7d161b6a24bceaec3bd88c090088135a98182312de023433080fa79f972c168242af961a2532bdcb3bb"


const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.userId).select('-password'); // Exclude password
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
