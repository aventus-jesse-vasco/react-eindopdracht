import { getDatabase } from '../db/init.js';

class Employee {
  static findByEmail(email) {
    const db = getDatabase();
    const employee = db.prepare('SELECT * FROM employees WHERE email = ?').get(email);
    db.close();
    return employee;
  }

  static findById(id) {
    const db = getDatabase();
    const employee = db.prepare('SELECT * FROM employees WHERE id = ?').get(id);
    db.close();
    return employee;
  }
}

export default Employee;
