// src/routes/user.js
import { Router } from 'express';
import { body } from 'express-validator';
import {
  getProfile, updateProfile,
  getFarms, addFarm, updateFarm, deleteFarm,
} from '../controllers/userController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// All user routes require authentication
router.use(requireAuth);

// Profile
router.get('/profile', getProfile);
const updateProfileValidation = [
  body('name').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  body('mobile').optional({ nullable: true }).matches(/^[6-9]\d{9}$/).withMessage('Enter a valid 10-digit mobile number'),
  body('farm_size').optional({ nullable: true }).isFloat({ min: 0 }).withMessage('Farm size must be a positive number'),
  body('soil_type').optional({ nullable: true }).isIn(['Black Cotton', 'Red Loamy', 'Alluvial', 'Laterite', 'loamy', 'clay', 'sandy', 'black', 'red', '']),
  body('irrigation_type').optional({ nullable: true }).isIn(['Drip', 'Sprinkler', 'Flood', 'Rainfed', 'drip', 'sprinkler', 'flood', 'rainfed', '']),
  body('preferred_language').optional().isIn(['en', 'mr']),
];

router.put('/profile', ...updateProfileValidation, updateProfile);

// Farms
router.get('/farms', getFarms);

const addFarmValidation = [
  body('name').trim().notEmpty().withMessage('Farm name is required').isLength({ max: 100 }),
  body('area').isFloat({ min: 0.01 }).withMessage('Area must be at least 0.01 hectares'),
  body('crop').notEmpty().withMessage('Crop is required').isIn([
    'Sugarcane', 'Grapes', 'Wheat', 'Rice', 'Cotton', 'Soybean', 'Onion', 'Tomato', 'Other'
  ]).withMessage('Invalid crop type'),
  body('location').optional().trim(),
];

router.post('/farms', ...addFarmValidation, addFarm);
router.put('/farms/:id', updateFarm);
router.delete('/farms/:id', deleteFarm);

export default router;
