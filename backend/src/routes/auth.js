import express from 'express';
import { login } from '../controllers/authController.js';
import { loginValidation, validate } from '../middleware/validation.js';

const router = express.Router();

router.post('/login', loginValidation, validate, login);

export default router;
