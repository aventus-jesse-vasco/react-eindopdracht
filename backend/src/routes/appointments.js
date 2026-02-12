import express from 'express';
import {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  employeeUpdateAppointment,
  employeeDeleteAppointment
} from '../controllers/appointmentController.js';
import { authenticateToken } from '../middleware/auth.js';
import {
  appointmentValidation,
  customerAuthValidation,
  idValidation,
  filterValidation,
  validate
} from '../middleware/validation.js';

const router = express.Router();

// Employee-only routes (require authentication) - Must be before :id routes
router.get('/afspraken', authenticateToken, filterValidation, validate, getAllAppointments);
router.put('/employee/afspraken/:id', authenticateToken, idValidation, appointmentValidation, validate, employeeUpdateAppointment);
router.delete('/employee/afspraken/:id', authenticateToken, idValidation, validate, employeeDeleteAppointment);

// Public routes
router.post('/afspraken', appointmentValidation, validate, createAppointment);
router.get('/afspraken/:id', idValidation, validate, getAppointmentById);
router.put('/afspraken/:id', idValidation, appointmentValidation, validate, updateAppointment);
router.delete('/afspraken/:id', idValidation, customerAuthValidation, validate, deleteAppointment);

export default router;
