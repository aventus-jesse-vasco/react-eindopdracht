import Database from 'better-sqlite3';
import bcrypt from 'bcrypt';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, '../../database.sqlite');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

export function initializeDatabase() {
  console.log('Initializing database...');

  // Create employees table
  db.exec(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create appointments table
  db.exec(`
    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT NOT NULL,
      email TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      service TEXT NOT NULL,
      remarks TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Check if default employee exists
  const existingEmployee = db.prepare('SELECT * FROM employees WHERE email = ?').get('employee@example.com');

  if (!existingEmployee) {
    // Create default employee account
    const passwordHash = bcrypt.hashSync('password123', 10);
    db.prepare(`
      INSERT INTO employees (name, email, password_hash)
      VALUES (?, ?, ?)
    `).run('Admin Employee', 'employee@example.com', passwordHash);
    
    console.log('Default employee account created:');
    console.log('  Email: employee@example.com');
    console.log('  Password: password123');
  }

  // Add some sample appointments for testing
  const appointmentCount = db.prepare('SELECT COUNT(*) as count FROM appointments').get().count;
  
  if (appointmentCount === 0) {
    const sampleAppointments = [
      {
        customer_name: 'Jan de Vries',
        email: 'jan@example.com',
        date: '2026-02-20',
        time: '10:00',
        service: 'Haircut',
        remarks: 'Prefer short on the sides'
      },
      {
        customer_name: 'Emma Jansen',
        email: 'emma@example.com',
        date: '2026-02-21',
        time: '14:30',
        service: 'Color',
        remarks: 'Looking for highlights'
      },
      {
        customer_name: 'Peter van Dam',
        email: 'peter@example.com',
        date: '2026-02-22',
        time: '11:00',
        service: 'Styling',
        remarks: null
      }
    ];

    const insertStmt = db.prepare(`
      INSERT INTO appointments (customer_name, email, date, time, service, remarks)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    for (const appointment of sampleAppointments) {
      insertStmt.run(
        appointment.customer_name,
        appointment.email,
        appointment.date,
        appointment.time,
        appointment.service,
        appointment.remarks
      );
    }

    console.log(`${sampleAppointments.length} sample appointments created`);
  }

  console.log('Database initialized successfully');
  return db;
}

export function getDatabase() {
  return new Database(dbPath);
}

export default db;
