import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Employee from '../models/Employee.js';

dotenv.config();

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find employee by email
    const employee = Employee.findByEmail(email);

    if (!employee) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, employee.password_hash);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: employee.id, 
        email: employee.email,
        name: employee.name 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      employee: {
        id: employee.id,
        name: employee.name,
        email: employee.email
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};
