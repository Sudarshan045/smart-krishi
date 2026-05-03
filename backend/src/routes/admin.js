// src/routes/admin.js
import { Router } from 'express';
import {
  getPlatformStats, getAllUsers, toggleUserStatus,
  updateUserRole, deleteUser,
} from '../controllers/adminController.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

// Double guard: must be logged in AND be an admin
router.use(requireAuth, requireAdmin);

router.get('/stats', getPlatformStats);
router.get('/users', getAllUsers);
router.patch('/users/:id/toggle-status', toggleUserStatus);
router.patch('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

export default router;
