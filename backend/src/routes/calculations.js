// src/routes/calculations.js
import { Router } from 'express';
import { body } from 'express-validator';
import {
  saveCalculation, getCalculations,
  getCalculation, deleteCalculation,
} from '../controllers/calculationController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// All calculation routes require authentication
router.use(requireAuth);

const calcValidation = [
  body('crop').isIn(['sugarcane', 'grapes']).withMessage('Crop must be sugarcane or grapes'),
  body('land_area').isFloat({ min: 0.01 }).withMessage('Land area must be at least 0.01 ha'),
  body('investment').isFloat({ min: 0 }).withMessage('Investment must be a positive number'),
  body('yield_amount').isFloat({ min: 0 }).withMessage('Yield must be a positive number'),
  body('price_per_unit').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('season').optional().isIn(['kharif', 'rabi', 'zaid']),
  body('notes').optional().trim().isLength({ max: 300 }),
];

router.post('/', ...calcValidation, saveCalculation);

router.get('/', getCalculations);
router.get('/:id', getCalculation);
router.delete('/:id', deleteCalculation);

export default router;
