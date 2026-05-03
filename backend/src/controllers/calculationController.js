// src/controllers/calculationController.js
import { validationResult } from 'express-validator';
import Calculation from '../models/Calculation.js';

/**
 * POST /api/calculations
 * Protected — Save a profit calculation
 */
export const saveCalculation = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const {
      crop, land_area, investment, yield_amount,
      price_per_unit, season, notes,
    } = req.body;

    // Compute derived values server-side for integrity
    const total_revenue = yield_amount * price_per_unit;
    const net_profit = total_revenue - investment;
    const profit_margin = investment > 0 ? Number(((net_profit / investment) * 100).toFixed(2)) : 0;

    const calculation = await Calculation.create({
      user_id: req.user._id,
      crop,
      land_area: parseFloat(land_area),
      investment: parseFloat(investment),
      yield_amount: parseFloat(yield_amount),
      price_per_unit: parseFloat(price_per_unit),
      total_revenue,
      net_profit,
      profit_margin,
      season: season || null,
      notes: notes?.trim() || null,
      year: new Date().getFullYear(),
    });

    res.status(201).json({
      success: true,
      message: 'Calculation saved to your history',
      calculation,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/calculations
 * Protected — Get calculation history with pagination
 */
export const getCalculations = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;
    const { crop, year } = req.query;

    // Build filter
    const filter = { user_id: req.user._id };
    if (crop && ['sugarcane', 'grapes'].includes(crop)) filter.crop = crop;
    if (year && !isNaN(year)) filter.year = parseInt(year);

    const [calculations, total] = await Promise.all([
      Calculation.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Calculation.countDocuments(filter),
    ]);

    // Aggregate summary
    const allForUser = await Calculation.find({ user_id: req.user._id });
    const summary = {
      total_calculations: total,
      avg_profit_margin: allForUser.length
        ? Number((allForUser.reduce((s, c) => s + c.profit_margin, 0) / allForUser.length).toFixed(2))
        : 0,
      best_profit: allForUser.length
        ? Math.max(...allForUser.map((c) => c.net_profit))
        : 0,
      sugarcane_count: allForUser.filter((c) => c.crop === 'sugarcane').length,
      grapes_count: allForUser.filter((c) => c.crop === 'grapes').length,
    };

    res.status(200).json({
      success: true,
      summary,
      calculations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/calculations/:id
 * Protected — Get a single calculation
 */
export const getCalculation = async (req, res, next) => {
  try {
    const calculation = await Calculation.findOne({
      _id: req.params.id,
      user_id: req.user._id,
    });

    if (!calculation) {
      return res.status(404).json({ success: false, message: 'Calculation not found' });
    }

    res.status(200).json({ success: true, calculation });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/calculations/:id
 * Protected — Delete a calculation
 */
export const deleteCalculation = async (req, res, next) => {
  try {
    const calculation = await Calculation.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user._id,
    });

    if (!calculation) {
      return res.status(404).json({ success: false, message: 'Calculation not found' });
    }

    res.status(200).json({ success: true, message: 'Calculation deleted' });
  } catch (error) {
    next(error);
  }
};
