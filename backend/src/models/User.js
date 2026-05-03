// src/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    googleId: {
      type: String,
      sparse: true,
      unique: true
    },
    avatar: {
      type: String,
      default: null,
    },
    mobile: {
      type: String,
      trim: true,
      match: [/^[6-9]\d{9}$/, 'Please enter a valid Indian mobile number'],
      default: null,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    // Farm profile details
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
    farm_size: {
      type: Number,
      min: [0, 'Farm size cannot be negative'],
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
    preferred_language: {
      type: String,
      enum: ['en', 'mr'],
      default: 'en',
    },
    avatar_color: {
      type: String,
      default: '#16a34a', // green-600
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    last_login: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,  // adds createdAt and updatedAt automatically
    toJSON: {
      transform(doc, ret) {
        delete ret.password;  // never expose password even if select is bypassed
        return ret;
      },
    },
  }
);

// Index for fast role-based queries
userSchema.index({ role: 1 });
userSchema.index({ createdAt: -1 });

// Pre-save hook: hash password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

// Instance method: compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Static method: find active users
userSchema.statics.findActive = function () {
  return this.find({ is_active: true });
};

const User = mongoose.model('User', userSchema);
export default User;
