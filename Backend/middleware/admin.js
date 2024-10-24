const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
      console.log(req.user.role);
      return res.status(403).json({ msg: 'Access denied' });
    }
    next();
  };
  
  module.exports = adminMiddleware;
  