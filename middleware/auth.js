const User = require('../models/User');
const { verifyToken } = require('../utils/jwt');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'Access token required. Please provide a valid Bearer token.' 
      });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Access token required' 
      });
    }

    // Verify the token
    const decoded = verifyToken(token);
    
    // Find the user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ 
        error: 'Invalid token - user not found' 
      });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    if (error.message === 'Invalid token' || error.name === 'JsonWebTokenError') {
      return res.status(403).json({ 
        error: 'Invalid or expired token' 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ 
        error: 'Token expired. Please login again.' 
      });
    }

    return res.status(500).json({ 
      error: 'Authentication error' 
    });
  }
};

module.exports = authenticateToken;
