// src/models/Farm.js
import mongoose from 'mongoose';

const farmSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Farm name is required'],
      trim: true,
      maxlength: [100, 'Farm name cannot exceed 100 characters'],
    },
    area: {
      type: Number,
      required: [true, 'Farm area is required'],
      min: [0.01, 'Farm area must be at least 0.01 hectares'],
      max: [10000, 'Farm area cannot exceed 10,000 hectares'],
    },
    crop: {
      type: String,
      required: [true, 'Crop type is required'],
      enum: {
        values: ['Sugarcane', 'Grapes', 'Wheat', 'Rice', 'Cotton', 'Soybean', 'Onion', 'Tomato', 'Other'],
        message: '{VALUE} is not a supported crop',
      },
    },
    location: {
      type: String,
      trim: true,
      default: null,
    },
    district: {
      type: String,
      trim: true,
      default: null,
    },
    soil_type: {
      type: String,
      enum: ['loamy', 'clay', 'sandy', 'black', 'red', 'laterite', null],
      default: null,
    },
    irrigation_type: {
      type: String,
      enum: ['drip', 'sprinkler', 'flood', 'rainfed', null],
      default: null,
    },
    notes: {
      type: String,
      maxlength: [500, 'Notes cannot exceed 500 characters'],
      default: null,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

farmSchema.index({ user_id: 1, createdAt: -1 });

const Farm = mongoose.model('Farm', farmSchema);
export default Farm;
