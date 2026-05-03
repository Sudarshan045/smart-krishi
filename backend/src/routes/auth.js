// src/routes/auth.js
import { Router } from 'express';
import { body } from 'express-validator';
import rateLimit from 'express-rate-limit';
import {
  register, login, getMe, logout, changePassword,
} from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

const router = Router();

// Strict rate limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,                   // 10 attempts per window
  message: { success: false, message: 'Too many attempts. Please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Validation rules
const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('mobile').optional().matches(/^[6-9]\d{9}$/).withMessage('Enter a valid 10-digit Indian mobile number'),
  body('preferred_language').optional().isIn(['en', 'mr']).withMessage('Language must be en or mr'),
];

const loginValidation = [
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

const changePasswordValidation = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
];

// Routes
router.post('/register', ...registerValidation, register);
router.post('/login', ...loginValidation, login);
router.post('/logout', requireAuth, logout);
router.get('/me', requireAuth, getMe);
router.put('/change-password', requireAuth, changePasswordValidation, changePassword);

// Google OAuth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    // Generate token
    const token = generateToken(req.user._id);
    
    // Redirect to frontend with token in URL (temporary)
    // In production, use a more secure way or a dedicated callback page
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:3001';
    res.redirect(`${clientUrl}/auth-success?token=${token}`);
  }
);

export default router;
