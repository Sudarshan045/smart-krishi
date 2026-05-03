// src/controllers/userController.js
import { validationResult } from 'express-validator';
import User from '../models/User.js';
import Farm from '../models/Farm.js';
import Calculation from '../models/Calculation.js';

/**
 * GET /api/user/profile
 * Protected — Get user profile
 */
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Get farm count and calculation summary for dashboard
    const [farmCount, calculationCount] = await Promise.all([
      Farm.countDocuments({ user_id: req.user._id, is_active: true }),
      Calculation.countDocuments({ user_id: req.user._id }),
    ]);

    res.status(200).json({
      success: true,
      user: {
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
        last_login: user.last_login,
        createdAt: user.createdAt,
        stats: {
          farms: farmCount,
          calculations: calculationCount,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/user/profile
 * Protected — Update user profile
 */
export const updateProfile = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    // Fields that users are allowed to update
    const allowedFields = [
      'name', 'mobile', 'location', 'district',
      'farm_size', 'soil_type', 'irrigation_type',
      'preferred_language', 'avatar_color',
    ];

    const updateData = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        location: user.location,
        district: user.district,
        farm_size: user.farm_size,
        soil_type: user.soil_type,
        irrigation_type: user.irrigation_type,
        preferred_language: user.preferred_language,
        avatar_color: user.avatar_color,
      },
    });
  } catch (error) {
    next(error);
  }
};

// =================== FARMS ===================

/**
 * GET /api/user/farms
 * Protected — Get all active farms for the user
 */
export const getFarms = async (req, res, next) => {
  try {
    const farms = await Farm.find({ user_id: req.user._id, is_active: true })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: farms.length,
      farms,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/user/farms
 * Protected — Add a new farm
 */
export const addFarm = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { name, area, crop, location, district, soil_type, irrigation_type, notes } = req.body;

    const farm = await Farm.create({
      user_id: req.user._id,
      name: name.trim(),
      area: parseFloat(area),
      crop,
      location: location?.trim() || null,
      district: district?.trim() || null,
      soil_type: soil_type || null,
      irrigation_type: irrigation_type || null,
      notes: notes?.trim() || null,
    });

    res.status(201).json({
      success: true,
      message: 'Farm added successfully',
      farm,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/user/farms/:id
 * Protected — Update a farm
 */
export const updateFarm = async (req, res, next) => {
  try {
    const farm = await Farm.findOne({ _id: req.params.id, user_id: req.user._id });

    if (!farm) {
      return res.status(404).json({ success: false, message: 'Farm not found' });
    }

    const allowedFields = ['name', 'area', 'crop', 'location', 'district', 'soil_type', 'irrigation_type', 'notes'];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) farm[field] = req.body[field];
    });

    await farm.save();

    res.status(200).json({
      success: true,
      message: 'Farm updated successfully',
      farm,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/user/farms/:id
 * Protected — Soft delete a farm
 */
export const deleteFarm = async (req, res, next) => {
  try {
    const farm = await Farm.findOne({ _id: req.params.id, user_id: req.user._id });

    if (!farm) {
      return res.status(404).json({ success: false, message: 'Farm not found' });
    }

    // Soft delete — keeps data for analytics / history
    farm.is_active = false;
    await farm.save();

    res.status(200).json({
      success: true,
      message: 'Farm removed successfully',
    });
  } catch (error) {
    next(error);
  }
};
