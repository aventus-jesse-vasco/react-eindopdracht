import { getDatabase } from '../db/init.js';

class Appointment {
  static getAll(filters = {}) {
    const db = getDatabase();
    let query = 'SELECT * FROM appointments WHERE 1=1';
    const params = [];

    if (filters.name) {
      query += ' AND customer_name LIKE ?';
      params.push(`%${filters.name}%`);
    }

    if (filters.date) {
      query += ' AND date = ?';
      params.push(filters.date);
    }

    if (filters.service) {
      query += ' AND service = ?';
      params.push(filters.service);
    }

    query += ' ORDER BY date ASC, time ASC';

    const appointments = db.prepare(query).all(...params);
    db.close();
    return appointments;
  }

  static getById(id) {
    const db = getDatabase();
    const appointment = db.prepare('SELECT * FROM appointments WHERE id = ?').get(id);
    db.close();
    return appointment;
  }

  static create(data) {
    const db = getDatabase();
    const stmt = db.prepare(`
      INSERT INTO appointments (customer_name, email, date, time, service, remarks)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      data.customer_name,
      data.email,
      data.date,
      data.time,
      data.service,
      data.remarks || null
    );
    
    const appointment = db.prepare('SELECT * FROM appointments WHERE id = ?').get(result.lastInsertRowid);
    db.close();
    return appointment;
  }

  static update(id, data) {
    const db = getDatabase();
    const stmt = db.prepare(`
      UPDATE appointments
      SET customer_name = ?, email = ?, date = ?, time = ?, service = ?, remarks = ?
      WHERE id = ?
    `);
    
    stmt.run(
      data.customer_name,
      data.email,
      data.date,
      data.time,
      data.service,
      data.remarks || null,
      id
    );
    
    const appointment = db.prepare('SELECT * FROM appointments WHERE id = ?').get(id);
    db.close();
    return appointment;
  }

  static delete(id) {
    const db = getDatabase();
    const stmt = db.prepare('DELETE FROM appointments WHERE id = ?');
    const result = stmt.run(id);
    db.close();
    return result.changes > 0;
  }
}

export default Appointment;
