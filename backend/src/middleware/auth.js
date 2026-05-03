// src/middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * REQUIRED auth — blocks unauthenticated requests
 * Use on routes that need a logged-in user (profile, farms, calculations)
 */
export const requireAuth = async (req, res, next) => {
  try {
    const token = extractToken(req);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please log in.',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user || !user.is_active) {
      return res.status(401).json({
        success: false,
        message: 'User account not found or has been deactivated.',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Invalid token.' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Session expired. Please log in again.' });
    }
    next(error);
  }
};

/**
 * OPTIONAL auth — attaches user to req if token is valid, but doesn't block
 * Use on public routes where personalization is optional (e.g., home, guides)
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const token = extractToken(req);
    if (!token) return next(); // no token → continue as guest

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (user && user.is_active) {
      req.user = user; // attach user if valid
    }
    next();
  } catch {
    // Invalid/expired token → just continue as guest, don't error
    next();
  }
};

/**
 * ADMIN only — must be used AFTER requireAuth
 */
export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin role required.',
    });
  }
  next();
};

// Helper: extract Bearer token from Authorization header
const extractToken = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }
  return null;
};
