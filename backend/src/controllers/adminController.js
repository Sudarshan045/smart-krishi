// src/controllers/adminController.js
import User from '../models/User.js';
import Farm from '../models/Farm.js';
import Calculation from '../models/Calculation.js';
import ChatMessage from '../models/ChatMessage.js';

/**
 * GET /api/admin/stats
 * Admin only — Platform-wide statistics
 */
export const getPlatformStats = async (req, res, next) => {
  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

    const [
      totalUsers,
      newUsersThisMonth,
      totalFarms,
      totalCalculations,
      totalChatMessages,
      usersByRole,
      calcByCrop,
      recentUsers,
    ] = await Promise.all([
      User.countDocuments({ is_active: true }),
      User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      Farm.countDocuments({ is_active: true }),
      Calculation.countDocuments(),
      ChatMessage.countDocuments(),
      User.aggregate([{ $group: { _id: '$role', count: { $sum: 1 } } }]),
      Calculation.aggregate([{ $group: { _id: '$crop', count: { $sum: 1 }, avg_profit: { $avg: '$net_profit' } } }]),
      User.find({ is_active: true })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('name email role createdAt'),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        users: {
          total: totalUsers,
          new_this_month: newUsersThisMonth,
          by_role: usersByRole,
        },
        farms: { total: totalFarms },
        calculations: {
          total: totalCalculations,
          by_crop: calcByCrop,
        },
        chat: { total_messages: totalChatMessages },
        recent_users: recentUsers,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/admin/users
 * Admin only — List all users (paginated)
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 20);
    const skip = (page - 1) * limit;
    const { role, search } = req.query;

    const filter = {};
    if (role && ['user', 'admin'].includes(role)) filter.role = role;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const [users, total] = await Promise.all([
      User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      users,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/admin/users/:id/toggle-status
 * Admin only — Activate/deactivate a user
 */
export const toggleUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    // Admin cannot deactivate themselves
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: 'Cannot modify your own account status' });
    }

    user.is_active = !user.is_active;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: `User ${user.is_active ? 'activated' : 'deactivated'} successfully`,
      is_active: user.is_active,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/admin/users/:id/role
 * Admin only — Change user role
 */
export const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Role must be user or admin' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );

    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.status(200).json({
      success: true,
      message: `User role updated to ${role}`,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/admin/users/:id
 * Admin only — Hard delete a user and all their data
 */
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: 'Cannot delete your own account' });
    }

    // Delete all user data in parallel
    await Promise.all([
      User.findByIdAndDelete(req.params.id),
      Farm.deleteMany({ user_id: req.params.id }),
      Calculation.deleteMany({ user_id: req.params.id }),
      ChatMessage.deleteMany({ user_id: req.params.id }),
    ]);

    res.status(200).json({ success: true, message: 'User and all associated data deleted' });
  } catch (error) {
    next(error);
  }
};
