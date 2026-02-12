import { body, param, query, validationResult } from 'express-validator';

export function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

export const appointmentValidation = [
  body('customer_name')
    .trim()
    .notEmpty()
    .withMessage('Customer name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  body('date')
    .notEmpty()
    .withMessage('Date is required')
    .isISO8601()
    .withMessage('Invalid date format')
    .custom((value) => {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        throw new Error('Date cannot be in the past');
      }
      return true;
    }),
  body('time')
    .notEmpty()
    .withMessage('Time is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('Invalid time format (use HH:MM)'),
  body('service')
    .trim()
    .notEmpty()
    .withMessage('Service is required')
    .isIn(['Haircut', 'Color', 'Styling', 'Consultation'])
    .withMessage('Invalid service selected'),
  body('remarks')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Remarks cannot exceed 500 characters')
];

export const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

export const idValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Invalid appointment ID')
];

export const customerAuthValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail()
];

export const filterValidation = [
  query('name').optional().trim(),
  query('date').optional().isISO8601().withMessage('Invalid date format'),
  query('service').optional().trim()
];
