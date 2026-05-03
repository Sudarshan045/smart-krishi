// src/models/Calculation.js
import mongoose from 'mongoose';

const calculationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    crop: {
      type: String,
      required: [true, 'Crop is required'],
      enum: ['sugarcane', 'grapes'],
    },
    land_area: {
      type: Number,
      required: [true, 'Land area is required'],
      min: [0.01, 'Land area must be positive'],
    },
    investment: {
      type: Number,
      required: [true, 'Investment amount is required'],
      min: [0, 'Investment cannot be negative'],
    },
    yield_amount: {
      type: Number,
      required: [true, 'Yield amount is required'],
      min: [0, 'Yield cannot be negative'],
    },
    price_per_unit: {
      type: Number,
      required: [true, 'Price per unit is required'],
      min: [0, 'Price cannot be negative'],
    },
    total_revenue: {
      type: Number,
      required: true,
    },
    net_profit: {
      type: Number,
      required: true,
    },
    profit_margin: {
      type: Number,
      required: true,
    },
    // Season / year tagging for trend analysis
    season: {
      type: String,
      enum: ['kharif', 'rabi', 'zaid', null],
      default: null,
    },
    year: {
      type: Number,
      default: () => new Date().getFullYear(),
    },
    notes: {
      type: String,
      maxlength: [300, 'Notes cannot exceed 300 characters'],
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

calculationSchema.index({ user_id: 1, createdAt: -1 });
calculationSchema.index({ user_id: 1, crop: 1 });
calculationSchema.index({ year: 1 });

const Calculation = mongoose.model('Calculation', calculationSchema);
export default Calculation;
