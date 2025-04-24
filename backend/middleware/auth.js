// middleware/auth.js
require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (User) => {
  return async (req, res, next) => {
    try {
      // Get token from header
      const token = req.header('Authorization').replace('Bearer ', '');
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_do_not_use_in_production');
      
      // Find user
      const user = await User.findByPk(decoded.userId);
      if (!user) {
        throw new Error();
      }
      
      // Add user to request
      req.user = user;
      req.token = token;
      
      next();
    } catch (error) {
      res.status(401).json({ message: 'Authentication required' });
    }
  };
};