import Appointment from '../models/Appointment.js';

export const getAllAppointments = (req, res) => {
  try {
    const filters = {
      name: req.query.name,
      date: req.query.date,
      service: req.query.service
    };

    const appointments = Appointment.getAll(filters);
    res.json(appointments);
  } catch (error) {
    console.error('Error getting appointments:', error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
};

export const getAppointmentById = (req, res) => {
  try {
    const appointment = Appointment.getById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (error) {
    console.error('Error getting appointment:', error);
    res.status(500).json({ error: 'Failed to fetch appointment' });
  }
};

export const createAppointment = (req, res) => {
  try {
    const appointmentData = {
      customer_name: req.body.customer_name,
      email: req.body.email,
      date: req.body.date,
      time: req.body.time,
      service: req.body.service,
      remarks: req.body.remarks
    };

    const appointment = Appointment.create(appointmentData);
    res.status(201).json({
      message: 'Appointment created successfully',
      appointment
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
};

export const updateAppointment = (req, res) => {
  try {
    const appointment = Appointment.getById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    // Verify that the email matches (customer authorization)
    if (appointment.email !== req.body.email) {
      return res.status(403).json({ error: 'You can only modify your own appointments' });
    }

    const updatedData = {
      customer_name: req.body.customer_name,
      email: req.body.email,
      date: req.body.date,
      time: req.body.time,
      service: req.body.service,
      remarks: req.body.remarks
    };

    const updatedAppointment = Appointment.update(req.params.id, updatedData);
    res.json({
      message: 'Appointment updated successfully',
      appointment: updatedAppointment
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ error: 'Failed to update appointment' });
  }
};

export const deleteAppointment = (req, res) => {
  try {
    const appointment = Appointment.getById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    // Verify that the email matches (customer authorization)
    if (appointment.email !== req.body.email) {
      return res.status(403).json({ error: 'You can only delete your own appointments' });
    }

    const success = Appointment.delete(req.params.id);
    
    if (success) {
      res.json({ message: 'Appointment deleted successfully' });
    } else {
      res.status(500).json({ error: 'Failed to delete appointment' });
    }
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
};

// Employee-only functions (no email verification required)
export const employeeUpdateAppointment = (req, res) => {
  try {
    const appointment = Appointment.getById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    const updatedData = {
      customer_name: req.body.customer_name,
      email: req.body.email,
      date: req.body.date,
      time: req.body.time,
      service: req.body.service,
      remarks: req.body.remarks
    };

    const updatedAppointment = Appointment.update(req.params.id, updatedData);
    res.json({
      message: 'Appointment updated successfully',
      appointment: updatedAppointment
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ error: 'Failed to update appointment' });
  }
};

export const employeeDeleteAppointment = (req, res) => {
  try {
    const appointment = Appointment.getById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    const success = Appointment.delete(req.params.id);
    
    if (success) {
      res.json({ message: 'Appointment deleted successfully' });
    } else {
      res.status(500).json({ error: 'Failed to delete appointment' });
    }
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
};
