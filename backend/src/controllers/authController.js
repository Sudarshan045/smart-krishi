// src/controllers/authController.js
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User.js';

// Helper: generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

// Helper: build safe user response object
const buildUserResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  mobile: user.mobile,
  role: user.role,
  location: user.location,
  district: user.district,
  farm_size: user.farm_size,
  soil_type: user.soil_type,
  irrigation_type: user.irrigation_type,
  preferred_language: user.preferred_language,
  avatar_color: user.avatar_color,
  createdAt: user.createdAt,
});

/**
 * POST /api/auth/register
 * Public — Register new user
 */
export const register = async (req, res, next) => {
  try {
    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { name, email, password, mobile, preferred_language } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists',
      });
    }

    // Create user (password hashed by pre-save hook)
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      mobile: mobile || null,
      preferred_language: preferred_language || 'en',
    });

    // Update last login
    user.last_login = new Date();
    await user.save({ validateBeforeSave: false });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account created successfully! Welcome to Smart Krishi.',
      token,
      user: buildUserResponse(user),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/login
 * Public — Login with email/password
 */
export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    // Find user and explicitly include password for comparison
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated. Contact support.',
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Update last login timestamp
    user.last_login = new Date();
    await user.save({ validateBeforeSave: false });

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: `Welcome back, ${user.name}!`,
      token,
      user: buildUserResponse(user),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/auth/me
 * Protected — Get currently authenticated user
 */
export const getMe = async (req, res, next) => {
  try {
    // req.user is already populated by requireAuth middleware
    res.status(200).json({
      success: true,
      user: buildUserResponse(req.user),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/logout
 * Protected — Client-side logout (JWT is stateless, we just confirm)
 */
export const logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

/**
 * PUT /api/auth/change-password
 * Protected — Change password
 */
export const changePassword = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const user = await User.findById(req.user._id).select('+password');
    const isValid = await user.comparePassword(currentPassword);

    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    user.password = newPassword;
    await user.save();

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
      token, // issue new token
    });
  } catch (error) {
    next(error);
  }
};
